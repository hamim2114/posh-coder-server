import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { createWebpackage, deleteWebpackage, getAllWebpackage, updateWebpackage } from '../controller/webpackage.controller.js';

export const webpackageRoute = express.Router();

webpackageRoute.post('/create', verifyToken, createWebpackage);

webpackageRoute.get('/getall', getAllWebpackage);

webpackageRoute.put('/update/:id',verifyToken, updateWebpackage);

webpackageRoute.delete('/delete/:id',verifyToken, deleteWebpackage);