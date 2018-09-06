'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    serial_number: {
      type: String,
      trim: true
    },
    signum: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    name: {
      type: String,
      trim: true
    },
    gender: {
      type: String,
      trim: true
    },
    t_shirt_size: {
      type: String,
      trim: true
    },
    manager_name: {
      type: String,
      trim: true
    },
    categary: {
      type: String,
      trim: true
    },
    categary_one: {
      type: String,
      trim: true
    },
    tshirt: {
      type: Boolean,
      default: true
    },
    snacks: {
      type: Boolean,
      default: true
    },
    dinner: {
      type: Boolean,
      default: true
    }
});

module.exports = mongoose.model('user', userSchema);