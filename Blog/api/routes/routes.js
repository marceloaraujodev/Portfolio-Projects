const express = require('express');
const controller = require('../controller/controller');

const router = express.Router();

// indexPage
router.get('/post', controller.getPosts);

router.get('/checkout-session/:postId', controller.checkout);
router.get('/profile', controller.profile);
// gets a specific post
router.get('/post/:id', controller.postId);

// Register user
router.post('/register', controller.register);

router.post('/login', controller.login);
router.post('/logout', controller.logout);

// creates post
router.post('/post', controller.post);

// edit post
router.put('/post', controller.editPost);

// delete post
router.delete('/post/:id', controller.deletePost);



module.exports = router;