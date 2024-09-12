import jwt from "jsonwebtoken";
import { createError } from "../utils/error.handler.js";

export const verifyToken = (req, res, next) => {
  // const token = req.cookies.poshcoder
  const token = req.headers.authorization
console.log(token)
  if (!token) {
    return next(createError(401, 'You are not authenticated!'));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(createError(403, 'Token is invalid!'));
    }
    req.user = user;
    next();
  });
};
