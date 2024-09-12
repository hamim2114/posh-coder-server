import jwt from 'jsonwebtoken';
import {createError} from '../utils/error.handler.js';
import adminModel from '../models/admin.model.js';

export const handleAdminReg = async (req, res, next) => {
  try {
    const exAdmin = await adminModel.find();
    if (exAdmin.length) {
      return next(createError(500, 'Not Complate!'));
    }
    const newAdmin = new adminModel(req.body);
    await newAdmin.save();
    res.status(201).send('Registration Complate!')
  } catch (error) {
    next(error);
  }
};

export const handleAdminLogin = async (req, res, next) => {

  try {
    const admin = await adminModel.findOne({email: req.body.email});
    if(!admin) return next(createError(404, 'Email Not Found!'));
    const pass = await adminModel.findOne({password: req.body.password});
    if(!pass) return next(createError(404, 'Password Incorrect!'))
    const token = jwt.sign({id: admin._id,name: admin.name, role: admin.role}, process.env.JWT_SECRET, {expiresIn: '7d'});
    const {password, ...others} = admin._doc;
    res
      // .cookie('poshcoder_admin', token, {
      //   httpOnly: true,
      //   sameSite: 'none',
      //   secure: true,
      // })
      .status(200)
      .send({
        jwt: token,
        message: 'Login success'
      });
  } catch (error) {
    next(error);
  }
};

export const handleAdminVerify = (req,res,next) => {
  try {
    res.status(201).send('Authenticated!')
  } catch (error) {
    next(error)
  }
}

export const handleAdminLogout = (req,res,next) => {
  res
    .clearCookie('poshcoder_admin', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .send('logout success!');
}
