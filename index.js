import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Multer from 'multer';
import { adminRoute } from './route/admin.route.js';
import { webpackageRoute } from './route/webpackage.route.js';
import { webtemplateRoute } from './route/webtemplate.route.js';
import { handleDelete, handleUpload } from './utils/fileUploadHandler.js';
import { apppackageRoute } from './route/apppackage.route.js';
import { appTemplateRoute } from './route/apptemplate.route.js';
import { graphicPackageRoute } from './route/graphicpackage.route.js';
import { graphicTemplateRoute } from './route/graphictemplate.route.js';
import { teamRoute } from './route/team.route.js';
import { blogRoute } from './route/blog.route.js';
import { trustbyRoute } from './route/trustby.route.js';
import { authRoute } from './route/auth.route.js';
import { orderRoute } from './route/order.route.js';

const app = express();

dotenv.config();

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};

mongoose.connection.on('connected', () => {
  console.log('mongodb connected');
});
mongoose.connection.on('disconnected', () => {
  console.log('mongodb disconnected');
});

app.get('/', (req, res) => {
  res.json('server running');
});
app.listen(5000, () => {
  console.log('server running on port 5000');
});
connect();

app.use(cors({
  origin: [
    'http://localhost:4000',
    'http://localhost:3002',
    'https://admin.poshcoder.com',
    'https://www.poshcoder.com'
  ], credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

//for file upload
const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

// Routes
app.use('/api/admin', adminRoute);
app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);
app.use('/api/webpackage', webpackageRoute);
app.use('/api/apppackage', apppackageRoute);
app.use('/api/webtemplate', webtemplateRoute);
app.use('/api/apptemplate', appTemplateRoute);
app.use('/api/graphicpackage', graphicPackageRoute);
app.use('/api/graphictemplate', graphicTemplateRoute);
app.use('/api/team', teamRoute);
app.use('/api/blog', blogRoute);
app.use('/api/trustby', trustbyRoute)
app.post("/api/file/upload", upload.single("my_file"), handleUpload);
app.post('/api/file/delete', handleDelete);

// Error Catch Route
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went Wrong!';
  res.status(status).send(message);
});
