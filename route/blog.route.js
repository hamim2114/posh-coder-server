import express from 'express';
import {
  createBlog,
  deleteBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
} from '../controller/blog.controller.js';
import { verifyToken } from '../middlewere/verify.token.js';

export const blogRoute = express.Router();

blogRoute.post('/', verifyToken, createBlog);

blogRoute.get('/', getBlog);

blogRoute.put('/:blogId',verifyToken, updateBlog);

blogRoute.get('/:blogId', getSingleBlog);

blogRoute.delete('/:blogId',verifyToken, deleteBlog);