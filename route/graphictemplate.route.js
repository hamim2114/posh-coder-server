import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { createGraphicTemplate, deleteGraphicTemplate, getGraphicTemplate, updateGraphictamplate } from '../controller/graphictemplate.controller.js';

export const graphicTemplateRoute = express.Router();

graphicTemplateRoute.post('/create', verifyToken, createGraphicTemplate);

graphicTemplateRoute.get('/getall', getGraphicTemplate);

graphicTemplateRoute.put('/edit/:id',verifyToken, updateGraphictamplate);

graphicTemplateRoute.delete('/delete/:id',verifyToken, deleteGraphicTemplate);