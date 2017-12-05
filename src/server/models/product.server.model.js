'use strict';

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  title : {
    type: String
  }
});

module.exports = mongoose.model('product', productSchema);