'use strict';

var mongoose = require('mongoose');
var user = mongoose.model('user');

exports.create = function(req, res, next) {

  user.create(req.body).then(function(user) {
    res.send(user);
  }).catch(function(err) {
    if (err.code == 11000) {
      err.status = 409;
      err.message = "User already Exist.";
    }
    next(err);
  });
};

exports.update = function(req, res, next) {
  user.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(req.body._id)
  }, req.body, function(err, user) {
    if (err) next(err);
    return res.send("updated user successfully");
  });
};

exports.getAllUsers = function(req, res, next) {
  user.find({}, function(err, users) {
    if (err) throw err;
    return res.send(users);
  });
}

exports.getUser = function(req, res, next) {
  user.findOne({
    _id: mongoose.Types.ObjectId(req.params.id)
  }, function(err, user) {
    if (err) throw err;
    return res.send(user);
  });
}