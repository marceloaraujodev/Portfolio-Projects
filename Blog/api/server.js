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

// If I want to add multiple photos at once look at multer docs for .array instead of .single('file') and change the PostPage.js to support an array of photos instead of one object

// multer, config limits for the post size!
const uploadMiddleware = multer({ 
  dest: 'uploads/',
  limits: {
    fieldSize: 1024 * 1024 * 10 // 10MB limit for field size
  }
 });

const app = express();

app.use(morgan('dev')); // logger

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // cookie parser
app.use('/uploads', express.static(__dirname + '/uploads')); // serving all files from one folder

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

// Gets all posts
app.get('/', (req, res) => {
  res.status('200').json({
    status: 'success',
    message: 'ok',
  });
});

// Register user
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

// user log in
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
      console.log('Logged IN');
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
  if (!token) {
    res.json('Please log in');
  }
  jwt.verify(token, process.env.SECRET, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json('ok');
  console.log('logged out');
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
  res.json(
    await PostModel.find()
      .populate('author', ['username'])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

app.get('/post/:id', async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id).populate('author', ['username']);
  res.json(post);
});

app.put('/post/', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const nameParts = originalname.split('.');
    const ext = nameParts[nameParts.length - 1];
    newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, async (err, info) => {
    if (err) throw err;
    const { title, summary, content, id } = req.body;
    const dbPost = await PostModel.findById(id);
    const author = JSON.stringify(dbPost.author) === JSON.stringify(info.id);
    if (!author) {
      return res.status(400).json('You are not the author');
    }
    const updatedPost = await PostModel.findByIdAndUpdate(id, {
      title, 
      summary, 
      content, 
      cover: newPath ? newPath : dbPost.cover
    }, 
    {
      new: true
    });
    res.json(updatedPost);
  });
});



server.on('close', () => {
  console.log('Server shutting down');
});
