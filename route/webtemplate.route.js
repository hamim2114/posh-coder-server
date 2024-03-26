import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { createWebtamplate, deleteWebtamplate, getWebtamplate } from '../controller/webtemplate.controller.js';

export const webtemplateRoute = express.Router();

webtemplateRoute.post('/create', verifyToken, createWebtamplate);

webtemplateRoute.get('/getall', getWebtamplate);

// webtamplateRoute.put('/:blogId',verifyToken, updateBlog);

webtemplateRoute.delete('/delete/:id',verifyToken, deleteWebtamplate);