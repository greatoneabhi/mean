var express = require('express');
var user = require('../controller/user.server.controller');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
  res.send('Server is running');
});

router.post('/authenticate', user.signIn);
router.post('/users', user.register);

router.get('/user', user.getUser);

module.exports = router;