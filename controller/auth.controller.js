import jwt from 'jsonwebtoken';
import {createError} from '../utils/error.handler.js';
import authModel from '../models/auth.model.js';

export const handleReg = async (req, res, next) => {
  try {
    const exAdmin = await authModel.find();
    if (exAdmin.length) {
      return next(createError(500, 'Not Complate!'));
    }
    const newAdmin = new authModel(req.body);
    await newAdmin.save();
    res.status(201).send('Registration Complate!')
  } catch (error) {
    next(error);
  }
};

export const handleLogin = async (req, res, next) => {

  try {
    const admin = await authModel.findOne({email: req.body.email});
    if(!admin) return next(createError('404', 'Email Not Found!'));
    const pass = await authModel.findOne({password: req.body.password});
    if(!pass) return next(createError(404, 'Password Incorrect!'))
    const token = jwt.sign({id: admin._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
    const {password, ...others} = admin._doc;
    res
      .cookie('ahmed', token, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .status(200)
      .send(others);
  } catch (error) {
    next(error);
  }
};

export const handleVerify = (req,res,next) => {
  try {
    res.status(201).send('Authenticated!')
  } catch (error) {
    next(error)
  }
}

export const handleLogout = (req,res,next) => {
  res
    .clearCookie('ahmed', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('logout success!');
}
