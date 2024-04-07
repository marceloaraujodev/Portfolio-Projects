const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require('./routes/routes'); // Importing the router from routes.js
dotenv.config({ path: './config.env' });

const corsOptions = {
  origin: [
    'https://summer-lab-1399.on.fleek.co',
    'http://localhost:3000',
    'http://localhost:4000',
    'https://itblog.onrender.com',
    'https://itblog.onrender.com/login',
    'https://itblog.onrender.com/post',
  ],
  methods: 'GET,POST,HEAD,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Headers',
  ],
  credentials: true,
};

const app = express();

//pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev')); // logger
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // cookie parser
app.use('/uploads', express.static(__dirname + '/uploads')); // serving all files from one
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes); // connects to the routes

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('Connected to Database'));
// start server
const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

server.on('close', () => {
  console.log('Server shutting down');
});
