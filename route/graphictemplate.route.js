import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { createGraphicTemplate, deleteGraphicTemplate, getGraphicTemplate } from '../controller/graphictemplate.controller.js';

export const graphicTemplateRoute = express.Router();

graphicTemplateRoute.post('/create', verifyToken, createGraphicTemplate);

graphicTemplateRoute.get('/getall', getGraphicTemplate);

// webtamplateRoute.put('/:blogId',verifyToken, updateBlog);

graphicTemplateRoute.delete('/delete/:id',verifyToken, deleteGraphicTemplate);