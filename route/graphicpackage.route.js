import express from 'express';
import { verifyToken } from '../middlewere/verify.token.js';
import { createGraphicpackage, deleteGraphicpackage, getAllGraphicpackage, updateGraphicpackage } from '../controller/graphicpackage.controller.js';

export const graphicPackageRoute = express.Router();

graphicPackageRoute.post('/create', verifyToken, createGraphicpackage);

graphicPackageRoute.get('/getall', getAllGraphicpackage);

graphicPackageRoute.put('/update/:id',verifyToken, updateGraphicpackage);

graphicPackageRoute.delete('/delete/:id',verifyToken, deleteGraphicpackage);