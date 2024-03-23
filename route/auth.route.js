import express from 'express';
import { handleLogin, handleLogout, handleReg, handleVerify } from '../controller/auth.controller.js';
import { verifyToken } from '../middlewere/verify.token.js';

export const authRoute = express.Router();

authRoute.post('/login', handleLogin);

authRoute.get('/verify', verifyToken, handleVerify)

authRoute.post('/logout', handleLogout);

authRoute.post('/register', handleReg);