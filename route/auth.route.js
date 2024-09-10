import express from 'express';
import { deleteUser, getUser, getUserInfo, getUsers, handleLogin, handleLogout, handleReg, updateUser, verifyEmail } from '../controller/auth.controller.js';
import { verifyToken } from '../middlewere/verify.token.js';

export const authRoute = express.Router();

authRoute.post('/register', handleReg);

authRoute.post('/login', handleLogin);

authRoute.post('/verify-email', verifyEmail);

authRoute.get('/me', verifyToken, getUserInfo);

authRoute.get('/users', verifyToken, getUsers);

authRoute.get('/user/:id', verifyToken, getUser);

authRoute.put('/users/edit/:id', verifyToken, updateUser);

authRoute.delete('/users/delete/:id', verifyToken, deleteUser);

authRoute.post('/logout', handleLogout);
