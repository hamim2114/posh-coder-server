import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { createApppackage, deleteApppackage, getAllApppackage, updateApppackage } from '../controller/apppackage.controller.js';

export const apppackageRoute = express.Router();

apppackageRoute.post('/create', verifyToken, createApppackage);

apppackageRoute.get('/getall', getAllApppackage);

apppackageRoute.put('/update/:id',verifyToken, updateApppackage);

apppackageRoute.delete('/delete/:id',verifyToken, deleteApppackage);