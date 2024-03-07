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
const path = require('path');
const admin = require('firebase-admin');
// const { Storage } = require('@google-cloud/storage');
dotenv.config({ path: './config.env' });
const stripe = require('stripe')(process.env.STIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');
const serviceAccount = JSON.parse(process.env.KEYFIREBASE); // pro
// const serviceAccount = require('./keyfirebase.json'); // dev


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://blogport-740b8.appspot.com',
});

const corsOptions = {
  origin: [
    'https://summer-lab-1399.on.fleek.co',
    // 'http://localhost:3000',
    // 'http://localhost:4000',
    'https://itblog.onrender.com'
  ],
  methods: 'GET,POST,HEAD,PUT,PATCH,DELETE',
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Headers',
  ],
  credentials: true,
};

const bucket = admin.storage().bucket();

// // multer, config limits for the post size!
const storage = multer.memoryStorage();
const uploadMiddleware = multer({
  storage: storage,
  destination: path.join(__dirname, '../uploads'),
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10MB limit for field size
  },
});
const app = express();
app.use(morgan('dev')); // logger
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); // cookie parser
app.use('/uploads', express.static(__dirname + '/uploads')); // serving all files from one

//// WILL HAVE TO TURN ON DURING LOCAL TESTING
// const db = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );
// DB connection // process.env.DATABASE
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('Connected to Database'));
// start server
const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.get('*', (req, res) => {
  res.redirect('https://itblog.onrender.com/' + req.originalUrl)
});

app.get(`/checkout-session/:postId`, async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    // create stripe checkout session | Checkout -> The Session Object
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // all fields here come from stripe
          price_data: {
            currency: 'brl',
            unit_amount: post.price * 100,
            product_data: {
              name: post.title,
              description: post.title,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.protocol}://${req.get('host')}/?tour=${
        req.params.postId
      }&user=test&price=$500`, // not secure temproraly
      cancel_url: `${req.protocol}://${req.get('host')}/:postId`,
      customer_email: 'ppzmarcelo@gmail.com', //req.user.email,
      client_reference_id: req.params.postId,
    });
    // create session  as response?!
    res.status(200).json({
      status: 'success',
      session,
    });
  } catch (error) {
    console.log(error);
  }
});

// Register user
app.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const encryptPass = await bcrypt.hash(password, 10);
  try {
    const userDoc = await UserModel.create({
      username: username,
      email: email,
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
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        jwt.sign(
          { username, id: user.id },
          process.env.SECRET,
          (err, token) => {
            if (err) throw err;
            res
              .cookie('token', token, {
                sameSite: 'None',
                secure: true,
              })
              .json({
                status: 'success',
                id: user.id,
                username,
              });
          }
        );
        console.log('Logged IN');
      } else {
        res.status(400).json('access denied');
      }
    });
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
  res.cookie('token', '').json('logged out');
});

// uploads image to firebase bucket
async function bucketUpload(req) {
  const uniqueId = uuidv4();
  const ext = req.file.originalname.split('.').pop();
  const newName = uniqueId + '.' + ext;
  console.log(newName);
  console.log(req.file);

  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'No file uploaded',
    });
  }
  const metadata = {
    contentType: req.file.mimetype,
    cacheControl: 'public, max-age=31536000',
  };

  const blob = bucket.file(newName);
  const blobStream = blob.createWriteStream({
    metadata: metadata,
    gzip: true,
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      // return res.status(500).json({error: "Unable to upload image."});
      reject('Unable to upload image.');
    });

    blobStream.on('finish', () => {
      const imagePath = blob.name;
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_PROJECTID}.appspot.com/o/${imagePath}?alt=media`;
      // console.log('imgurl', imageUrl)
      resolve(imageUrl);
      // return res.status(201).json({ imageUrl});
    });

    blobStream.end(req.file.buffer);
  });
}

// create post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  console.log('this is req.file', req.file);
  if (!req.cookies.token) {
    return res.status(404).json({ message: 'No token found' });
  }
  jwt.verify(req.cookies.token, process.env.SECRET, async (err, info) => {
    if (err) {
      console.log('JWT verification failed:', err);
      return res.status(401).json({ message: 'Unautohrized: Invalid token' });
    }
    const { title, summary, content, price } = req.body;
    try {
      const imageUrl = await bucketUpload(req);
      // console.log('image url:', imageUrl)
      await PostModel.create({
        title,
        summary,
        content,
        cover: imageUrl,
        price,
        author: info.id,
      });

      res.status(200).json({
        status: 'success',
        message: 'token verified confirmed',
        url: imageUrl,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Unable to upload image.' });
    }
  });

});

// Edit Post
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
  let newPath = null;

  if (req.file) {
    newPath = await bucketUpload(req);
  }

    console.log('this is the new url:', newPath)
    const { token } = req.cookies;
    jwt.verify(token, process.env.SECRET, async (err, info) => {
      if (err) throw err;
      const { title, summary, content, id, price } = req.body;
      const dbPost = await PostModel.findById(id);
      const author = JSON.stringify(dbPost.author) === JSON.stringify(info.id);
      if (!author) {
        return res.status(400).json('You are not the author');
      }
      const updatedPost = await PostModel.findByIdAndUpdate(
        id,
        {
          title,
          summary,
          content,
          cover: newPath ? newPath : dbPost.cover,
          price,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedPost);
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

app.delete('/post/:id', async (req, res) => {
  try {
    await PostModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.log(error);
  }
});

app.post('/test', uploadMiddleware.single('file'), async (req, res) => {
  console.log('this is req.file:---------------', req.file);
  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'No file uploaded',
    });
  }
  const metadata = {
    contentType: req.file.mimetype,
    cacheControl: 'public, max-age=31536000',
  };

  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream({
    metadata: metadata,
    gzip: true,
  });

  blobStream.on('error', (err) => {
    return res.status(500).json({ error: 'Unable to upload image.' });
  });

  blobStream.on('finish', () => {
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    return res.status(201).json({ imageUrl });
  });

  blobStream.end(req.file.buffer);
});

server.on('close', () => {
  console.log('Server shutting down');
});
