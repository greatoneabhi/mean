var express = require('express');
var user = require('../controller/user.server.controller');
var admin = require('../controller/admin.server.controller');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
  res.send('Server is running');
});

router.post('/admins', admin.register);
router.post('/authenticate', admin.signIn);

router.post('/users', isAuthenticatedUser, user.create);
router.get('/users', isAuthenticatedUser, user.getAllUsers);

router.put('/user', isAuthenticatedUser, user.update);
router.get('/user/:id', isAuthenticatedUser, user.getUser);

function isAuthenticatedUser(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, 'thisisasecretkey', function(err, decoded) {
        if (err) {
          console.log(err);
          return res.status(401).send({
            message: 'unauthorized !'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        message: 'Invalid token or No token'
      });
    }
  }

module.exports = router;