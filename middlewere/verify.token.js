import jwt from "jsonwebtoken";
import { createError } from "../utils/error.handler.js";

export const verifyToken = (req,res,next) => {
  const token = req.cookies.poshcoder;
  if(!token) return next(createError(401, 'You are Not Authenticated!'))
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) return next(createError(403, 'token invalid!'));
    req.user = user;
    next();
  })
}