import express from 'express';

import { verifyToken } from '../middlewere/verify.token.js';
import { createOrder, deleteOrder, getOrders, getSingleOrder, getUserOrder, updateOrder } from '../controller/order.controller.js';

export const orderRoute = express.Router();

orderRoute.post('/create', verifyToken, createOrder );

orderRoute.get('/orders',verifyToken,getOrders );

orderRoute.put('/edit/:id',verifyToken,updateOrder );

orderRoute.get('/order/:id',verifyToken, getSingleOrder );

orderRoute.get('/userOrder/:userId',verifyToken, getUserOrder );

orderRoute.delete('/delete/:id',verifyToken,deleteOrder );