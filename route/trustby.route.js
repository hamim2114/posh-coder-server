import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { createImg, deleteImg, getImgs } from '../controller/trustby.controller.js';

export const trustbyRoute = express.Router();

trustbyRoute.post('/create', verifyToken, createImg);

trustbyRoute.get('/getAll', getImgs);

trustbyRoute.delete('/delete/:id',verifyToken, deleteImg);