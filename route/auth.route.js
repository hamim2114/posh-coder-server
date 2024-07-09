import express from 'express';
import { getUserInfo, handleLogin, handleLogout, handleReg, verifyEmail } from '../controller/auth.controller.js';
import { verifyToken } from '../middlewere/verify.token.js';

export const authRoute = express.Router();

authRoute.post('/register', handleReg);

authRoute.post('/login', handleLogin);

authRoute.post('/verify-email', verifyEmail);

authRoute.get('/me', verifyToken, getUserInfo);

authRoute.post('/logout', handleLogout);
