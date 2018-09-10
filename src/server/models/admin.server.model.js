'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var adminSchema = new mongoose.Schema({
  signum: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  }
});

adminSchema.methods.comparePassword = function(password) {
  console.log("Comparing password........");
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('admin', adminSchema);