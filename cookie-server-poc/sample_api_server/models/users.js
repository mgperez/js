'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User models stored in DB
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default:Date.now
  }
});

module.exports = mongoose.model('users', UserSchema);
