import jwt from "jsonwebtoken";
import { createError } from "../utils/error.handler.js";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    console.log('user',user)
    if (err) {
      return next(createError(403, 'Token is invalid!'));
    }
    req.user = user;
    next();
  });
};
