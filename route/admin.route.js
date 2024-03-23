import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { handleAdminLogin, handleAdminLogout, handleAdminReg, handleAdminVerify } from '../controller/admin.controller.js';

export const adminRoute = express.Router();

adminRoute.post('/login', handleAdminLogin);

adminRoute.get('/verify', verifyToken, handleAdminVerify)

adminRoute.post('/logout', handleAdminLogout);

adminRoute.post('/register', handleAdminReg);