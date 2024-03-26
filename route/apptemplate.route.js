import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { createApptamplate, deleteApptamplate, getApptamplate } from '../controller/apptemplate.controller.js';

export const appTemplateRoute = express.Router();

appTemplateRoute.post('/create', verifyToken, createApptamplate);

appTemplateRoute.get('/getall', getApptamplate);

// webtamplateRoute.put('/:blogId',verifyToken, updateBlog);

appTemplateRoute.delete('/delete/:id',verifyToken, deleteApptamplate);