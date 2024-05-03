const PostModel = require('../models/postModels');
const UserModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const {
  S3Client,
  ListBucketsCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');
const fs = require('fs');
const serviceAccount = JSON.parse(process.env.KEYFIREBASE); // production
// const serviceAccount = require('../keyfirebase.json'); // development
const stripe = require('stripe')(process.env.STIPE_SECRET_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://blogport-740b8.appspot.com',
});

// // multer, config limits for the post size!
const storage = multer.memoryStorage();

const uploadMiddleware = multer({
  storage: storage,
  destination: path.join(__dirname, '../uploads'),
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10MB limit for field size
  },
});

// s3 bucket
const bucketName = 'myecommercebucket-555';



// uploads image to firebase bucket
async function bucketUpload(req) {
  console.log('enter bucketUpload');

  const uniqueId = uuidv4();
  const ext = req.file.originalname.split('.').pop();
  const newName = uniqueId + '.' + ext;

  console.log(newName); // 3273c527-1443-4680-916e-1cb85be6b3a2.jpg

  if (!req.file) {
    return res.status(400).json({
      status: 'fail',
      message: 'No file uploaded',
    });
  }

  const awsClient = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  // console.log('this is req.file:', req.file);
  console.log('this is awsClient', awsClient);

  await awsClient
    .send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: newName,
        Body: req.file.buffer,
        ACL: 'public-read',
        ContentType: req.file.mimetype,
      })
    )
    const imageUrl = `https://${bucketName}.s3.us-east-2.amazonaws.com/${newName}`

    console.log('this is imageUrl', imageUrl)
    return imageUrl

}

// gets index pages
exports.getPosts = async (req, res) => {
  try {

    const posts = await PostModel.find()
      .populate('author', ['username'])
      // .sort({ createdAt: -1 })
      // .limit(5);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.register = async (req, res) => {
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
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json('User not found');
    }

    // creates a token based on username secret and sets expiration
    const token = jwt.sign({ username, id: user.id }, process.env.SECRET, {
      expiresIn: '1d',
    });

    // compares users password with db password of the user and if so sets cookie token
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        console.log('Logged IN');
        res
          .status(200)
          .cookie('token', token, {
            sameSite: 'None',
            secure: true,
            httpOnly: true,
          })
          .json({
            message: 'Login successfully',
            id: user.id,
            username,
          });
      } else {
        res.status(400).json('access denied');
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
};

exports.checkout = async (req, res) => {
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
};

// displays if user is logged in shows +CreatePost if not shows Log in in the header
exports.profile = (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    res.json('Please log in');
  } else {
    jwt.verify(token, process.env.SECRET, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '').json('logged out');
};

exports.post = async (req, res) => {
  try {
    uploadMiddleware.single('file')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res
          .status(400)
          .json({ message: 'Multer error: ' + err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(500).json({ error: 'Unknown error: ' + err.message });
      }

      if (!req.cookies.token) {
        return res.status(404).json({ message: 'No token found' });
      }

      jwt.verify(req.cookies.token, process.env.SECRET, async (err, info) => {
        if (err) {
          console.log('JWT verification failed:', err);
          return res
            .status(401)
            .json({ message: 'Unauthorized: Invalid token' });
        }
        const { title, summary, content, price } = req.body;
        try {
          const imageUrl = await bucketUpload(req);
          console.log('this is imageUrl from post function', imageUrl)
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
            message: 'Token verified and post created successfully',
            url: imageUrl,
          });
        } catch (error) {
          console.error('Error uploading image:', error);
          res.status(500).json({ error: 'Unable to upload image.' });
        }
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// edit post
exports.editPost = async (req, res) => {
  try {
    uploadMiddleware.single('file')(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
        return res
          .status(400)
          .json({ message: 'Multer error: ' + err.message });
      } else if (err) {
        // An unknown error occurred when uploading.
        return res.status(500).json({ error: 'Unknown error: ' + err.message });
      }

      let newPath = null;

      //// Add file check
      // if (req.file) {
      //   newPath = await bucketUpload(req);
      // }

      const { token } = req.cookies;
      jwt.verify(token, process.env.SECRET, async (err, info) => {
        if (err) {
          console.error('JWT verification failed:', err);
          return res
            .status(401)
            .json({ message: ' Unauthorized: Invalid token' });
        }

        const { title, summary, content, id, price } = req.body;
        const dbPost = await PostModel.findById(id);
        const author =
          JSON.stringify(dbPost.author) === JSON.stringify(info.id);
        if (!author) {
          return res.status(400).json('You are not the author');
        }

        if (req.file) {
          const newPath = await bucketUpload(req);
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
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.postId = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id).populate('author', ['username']);
  res.json(post);
};

exports.deletePost = async (req, res) => {
  try {
    // const { cover: coverUrl } = await PostModel.findByIdAndDelete(req.params.id);
    await PostModel.findByIdAndDelete(req.params.id);

    /* delete cover photo in google bucket
      get the cover which has the url const { cover: coverUrl } = await PostModel
     
      const url = 'https://firebasestorage.googleapis.com/v0/b/blogport-740b8.appspot.com/o/cdac842b-c053-4745-8089-d3c9941d2788.jpg?alt=media';

      // Split the URL by '/'
      const parts = url.split('/');

      // Get the last part which contains the filename
      const filenameWithParams = parts[parts.length - 1];

      // Remove the query parameters if present
      const filename = filenameWithParams.split('?')[0];

      console.log(filename); Output: cdac842b-c053-4745-8089-d3c9941d2788.jpg

      await bucket.delete(filename);

      file object from the bucket
         File {
          _events: [Object: null prototype] {},
          _eventsCount: 0,
          _maxListeners: undefined,
          metadata: [Object],
          baseUrl: '/o',
          parent: [Bucket],
          id: 'cdac842b-c053-4745-8089-d3c9941d2788.jpg',
          createMethod: undefined,
          methods: [Object],
          interceptors: [],
          projectId: undefined,
          create: undefined,
          bucket: [Bucket],
          storage: [Storage],
          kmsKeyName: undefined,
          userProject: undefined,
          name: 'cdac842b-c053-4745-8089-d3c9941d2788.jpg',
          acl: [Acl],
          crc32cGenerator: [Function: CRC32C_DEFAULT_VALIDATOR_GENERATOR],
          instanceRetryValue: true,
          instancePreconditionOpts: undefined,
          [Symbol(shapeMode)]: false,
          [Symbol(kCapture)]: false
        }
      
      */

    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully',
    });
  } catch (error) {
    console.log(error);
  }
};
