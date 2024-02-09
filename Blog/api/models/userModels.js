const mongoose = require('mongoose');
// const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide your username'],
    min: 4,
    // unique: true,
  },
  // email: {
  //     type: String,
  //     required: [true, 'Please provide your email'],
  //     unique: true,
  //     lowercase: true,
  //     validate: [validator.isEmail, 'Please provide your email']
  // },
  password: {
    type: String,
    // required: true,
    minlength: [4, 'Please enter a password of at lease 4 characters'],
    // select: false,
  },
  // passwordConfirm: {
  //     type: String,
  //     required: true,
  //     validate: {
  //         validator: function (value) {
  //             // This only works on CREATE AND SAVE!!
  //             // if updating password this validator wont work.
  //             return value === this.password // returns true or false
  //         },
  //         message: "Password do not match"
  //     }
  // }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
