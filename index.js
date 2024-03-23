import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Multer from 'multer';
import { adminRoute } from './route/admin.route.js';
import { webpackageRoute } from './route/webpackage.route.js';
import { webtamplateRoute } from './route/webtamplate.route.js';
import { handleDelete, handleUpload } from './utils/fileUploadHandler.js';

const app = express();

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    throw error;
  }
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

app.use(cors({origin: ['http://localhost:4000'], credentials: true}));
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


app.post("/api/file/upload", upload.single("my_file"), handleUpload);
app.post('/api/file/delete', handleDelete);
app.use('/api/admin', adminRoute);
app.use('/api/webpackage', webpackageRoute)
app.use('/api/webtamplate', webtamplateRoute)

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went Wrong!';
  res.status(status).send(message);
});
