/* eslint-disable no-undef */
import jwt from 'jsonwebtoken';
import { createError } from '../utils/error.handler.js';
import authModel from '../models/auth.model.js';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mongoose from 'mongoose';
import { sendVerificationEmail } from '../utils/emailSend.js';
import orderModel from '../models/order.model.js';

export const handleReg = async (req, res, next) => {
  const { username, email,phone, password } = req.body;

  if (!username || !email || !password || !phone) {
    return next(createError(400, 'All fields are required!'));
  }

  try {
    let user = await authModel.findOne({ username });
    if (user) {
      return next(createError(400, 'Username already exists!'));
    }

    user = await authModel.findOne({ email });
    if (user) {
      return next(createError(400, 'Email already exists!'));
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpiry = Date.now() + 3600000; // 1 hour

    const newUser = new authModel({
      username,
      email,
      phone,
      password,
      verificationToken,
      verificationTokenExpiry
    });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();

    // Send verification email
    await sendVerificationEmail(newUser.email, verificationToken);

    res.status(201).send('Registration complete! Please check your email to verify your account.');
  } catch (error) {
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { token } = req.query;

  if (!token) {
    return next(createError(400, 'Invalid token'));
  }

  try {
    const user = await authModel.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return next(createError(400, 'Invalid or expired token'));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;

    await user.save();
    res.status(200).send('Email verified successfully!');
  } catch (error) {
    next(error);
  }
};


export const handleLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await authModel.findOne({ email });
    if (!user) return next(createError(404, 'Email Not Found!'));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(createError(400, 'Password Incorrect!'));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const { password:_, ...others } = user._doc;

    res
      // .cookie('poshcoder', token, {
      //   httpOnly: true,
      //   sameSite: 'none',
      //   secure: true,
      // })
      .status(200)
      .send({
        jwt: token,
        message: 'Login Success'
      }); // Sending user details without password
  } catch (error) {
    next(error);
  }
};

// get all users
export const getUsers = async (req, res, next) => {
  const { status, search } = req.query;

  try {
    // Building filter based on status and search query
    const filter = status && status !== 'all' ? { status } : {};

    if (search) {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex
      filter.$or = [
        { username: { $regex: searchRegex } },
        { email: { $regex: searchRegex } }
      ];
    }

    // Fetch users based on the filter
    const users = await authModel.find(filter).sort({ createdAt: -1 });

    // Fetch orders for each user
    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const userOrders = await orderModel.find({ "user._id": user._id });
        return {
          ...user.toObject(), // Convert Mongoose document to plain JS object
          orders: userOrders
        };
      })
    );

    // Return the user data along with their orders
    res.status(200).json(usersWithOrders);
  } catch (error) {
    next(error);
  }
};


export const getUser = async (req,res,next) => {
  try {
    const user = await authModel.findById(req.params.id);
    const userOrders = await orderModel.find({userId: req.params.id})
    res.status(201).send({
      ...user.toObject(),
      userOrders
    });
  } catch (error) {
    next(error)
  }
};

export const updateUser = async (req, res,next) => {
  const { id } = req.params;
  const { verified } = req.body;

  try {
    const updatedUser = await authModel.findByIdAndUpdate(
      id,
      { isVerified: verified },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: 'User updated successfully',
    });
  } catch (error) {
    next(error)
  }
};

export const deleteUser = async (req, res,next) => {
  const { id } = req.params;

  try {
    const deleteUser = await authModel.findByIdAndDelete(id);

    if (!deleteUser) {
      return next(createError(404, 'User not found!'))
    }

    return res.status(200).json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error)
  }
};


export const getUserInfo = async (req, res, next) => {
  try {
    const user = await authModel.findById(req.user.id, '-password');
    if (!user) {
      return next(createError(404, 'User not found.'));
    }
    const userOrders = await orderModel.find({ userId: user._id });
    const userWithOrders = user.toObject();

    userWithOrders.orders = userOrders;

    res.status(200).json(userWithOrders);
  } catch (error) {
    next(error);
  }
};



export const handleLogout = (req, res, next) => {
  res
    .clearCookie('poshcoder', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('logout success!');
}
