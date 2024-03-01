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
const admin = require('firebase-admin');
const { Storage } = require('@google-cloud/storage');
dotenv.config({ path: './config.env' });
const stripe = require('stripe')(process.env.STIPE_SECRET_KEY);


const corsOptions = {
  origin: [
    'https://summer-lab-1399.on.fleek.co', 'http://localhost:3000'
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: [
  'Content-Type', 
  'Authorization',
  ],
  credentials: true,
};


// multer, config limits for the post size!
const uploadMiddleware = multer({
  dest: 'uploads/',
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



// WILL HAVE TO TURN ON DURING LOCAL TESTING
// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// DB connection process.env.DATABASE
mongoose.connect(process.env.DATABASE).then(() => console.log('Connected to Database'));

// start server
const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// Gets all posts
// Turn on in production / its not need it locally
// app.get('/', async (req, res) => {
//   try {
//     const [files] = await bucket.getFiles();

//     const fileData = files.map((file) => {
//       return {
//         name: file.name,
//         url: `https://storage.googleapis.com/${bucket.name}/${file.name}`,
//       };
//     });
//     res.status('200').json({
//       status: 'success',
//       message: 'ok',
//       files: fileData,
//     });
//   } catch (error) {
//     console.error('Error retrieving photos:', error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal server error',
//     });
//   }
// });

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
        jwt.sign({ username, id: user.id }, process.env.SECRET, (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json({
            status: 'success',
            id: user.id,
            username,
          });
        });
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

// create post
app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  // production 👇 
  res.json({
    data: {
      data: JSON.stringify(req.body), 
      cookies: req.cookies.token
    }
  })
  

});


// Edit Post
app.put('/post', uploadMiddleware.single('file'), async (req, res) => {
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
    res.json(updatedPost);
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

server.on('close', () => {
  console.log('Server shutting down');
});



    // const { originalname, path } = req.file;
    // const nameParts = originalname.split('.');
    // const ext = nameParts[nameParts.length - 1];
    // let newPath = null;
    // newPath = path + '.' + ext;
    // // fs.renameSync(path, newPath);
    // console.log('ORIGINAL NAME AND PATH:', originalname, path)


    // try {

    //   jwt.verify(token, process.env.SECRET, async (err, info) => {
  
    //     if (err) {
    //       console.log('JWT verification failed:', err)
    //       return res.status(401).json({message: 'Unautohrized: Invalid token'})
    //     }else{
    //       console.log('Token verified')
    //       console.log('3')
    //       const { title, summary, content, price } = req.body;
      
    //       const newPost = await PostModel.create({
    //         title,
    //         summary,
    //         content,
    //         cover: req.file.path,
    //         price,
    //         author: info.id
    //       });
    //       console.log('4')
    //       const fileUploadOptions = {
    //         destination: `covers/${originalname}`,
    //         metadata: {
    //           contentType: 'image/jpeg',
    //         }
    //       }
    //       console.log('-----------got here------')
    //       const projectId = process.env.PROJECTID;
    //       const keyFilename = process.env.KEYFILENAME;
      
    //       const storage = new Storage({ projectId, keyFilename });
      
    //       const bucket = storage.bucket('blog-storage-fb319.appspot.com');
    //       console.log('5')
    //       await bucket.upload(req.file.path, fileUploadOptions);
    //       console.log('6')
    //       res.status(200).json({
    //         status: 'success',
    //         newPost,
    //       });
  
    //     }
  
    //   });
  
    // } catch (error) {
    //   // error
    //   console.error('Error uploading file:', error);
    //   res.status(500).json('Internal server error');
    // }

      // // // development 👇
  //     const { originalname, path } = req.file;
  //     const nameParts = originalname.split('.');
  //     const ext = nameParts[nameParts.length - 1];
  //     const newPath = path + '.' + ext;
  //     fs.renameSync(path, newPath);

  //     const { token } = req.cookies;
  //     jwt.verify(token, process.env.SECRET, async (err, info) => {
  //       if (err) throw err;
  //       const { title, summary, content, price } = req.body;
  //       const newPost = await PostModel.create({
  //         title,
  //         summary,
  //         content,
  //         cover: newPath,
  //         price,
  //         author: info.id,
  //       });
  //       res.status(200).json({
  //         status: 'success',
  //         newPost
  //       });
  // });
