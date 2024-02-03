const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const UserModel = require('./models/userModels');
const PostModel = require('./models/postModels');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');


dotenv.config({ path: './config.env' });

// multer
const uploadMiddleware = multer({ dest: 'uploads/' });

const app = express();

app.use(morgan('dev')); // logger

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // cookie parser
app.use('/uploads', express.static(__dirname + '/uploads'))// serving all files from one folder

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// DB connection
mongoose.connect(DB).then(() => console.log('Connected to Database'));

// start server
const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get('/', (req, res) => {
  res.status('200').json({
    status: 'success',
    message: 'ok',
  });
});
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const encryptPass = await bcrypt.hash(password, 10);

  try {
    const userDoc = await UserModel.create({
      username: username,
      password: encryptPass,
    });
    res.status(200).json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error,
    });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      return res.status(400).json('User not found');
    }
    const match = bcrypt.compare(password, user.password);
    if (match) {
      jwt.sign({ username, id: user.id }, process.env.SECRET, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id: user.id,
          username,
        });
      });
    } else {
      res.status(400).json('access denied');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  // if(!token){
  //     res.json('Please log in')
  // }
  jwt.verify(token, process.env.SECRET, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
});

app.post('/createPost', uploadMiddleware.single('file'), async (req, res) => {
  const { originalname, path } = req.file;
  const nameParts = originalname.split('.');
  const ext = nameParts[nameParts.length - 1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const newPost = await PostModel.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(newPost);
  });
});

app.get('/post', async (req, res) => {
    res.json(await PostModel.find()
    .populate('author', ['username'])
    .sort({createdAt: -1})
    .limit(20)
    ); //.populate('author')
});

app.get('/post/:id', async (req, res) => {
    const {id} = req.params
    const post = await PostModel.findById(id).populate('author', ['username']);
    console.log(post)
    res.json(post)
})


server.on('close', () => {
  console.log('Server shutting down');
});
