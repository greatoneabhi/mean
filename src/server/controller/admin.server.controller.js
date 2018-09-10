(function() {
  'use strict';

  var mongoose = require('mongoose');
  var jwt = require('jsonwebtoken');
  var bcrypt = require('bcrypt');
  var admin = mongoose.model('admin');

  exports.register = function(req, res, next) {
    var adminUser = new admin(req.body);
    adminUser.password = bcrypt.hashSync(req.body.password, 10);
    admin.create(adminUser)
      .then(function(user) {
        user.password = undefined;
        res.send(user);
      }).catch(function(err) {
        if (err.code == 11000) {
          err.status = 409;
          err.message = "User with the given Id already Exist.";
        }
        next(err);
      });
  };
  
  exports.signIn = function(req, res, next) {
        admin.findOne({
            signum: req.body.signum
        }, function(err, user) {
            console.log("Sign in");
            if (err) next(err);
            console.log("check users");
            if (!user || !user.comparePassword(req.body.password)) {
                return res.status(401).json({
                    message: 'Authentication failed. Invalid user or password.'
                });
            }
            const payload = {
                id: user._id,
                isAdmin: user.isAdmin
            };

            var token = jwt.sign(payload, 'thisisasecretkey', {
                expiresIn: '6h',
            });

            if(req.body.rememberMe) {
                token = jwt.sign(payload, 'thisisasecretkey');
            }

            return res.json({
                success: true,
                message: 'auth token',
                token: token
            });
        });
    };
})();