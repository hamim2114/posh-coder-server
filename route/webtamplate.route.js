import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { createWebtamplate, deleteWebtamplate, getWebtamplate } from '../controller/webtamplate.controller.js';

export const webtamplateRoute = express.Router();

webtamplateRoute.post('/create', verifyToken, createWebtamplate);

webtamplateRoute.get('/getall', getWebtamplate);

// webtamplateRoute.put('/:blogId',verifyToken, updateBlog);

webtamplateRoute.delete('/delete/:id',verifyToken, deleteWebtamplate);