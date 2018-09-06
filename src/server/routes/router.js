var express = require('express');
var user = require('../controller/user.server.controller');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
  res.send('Server is running');
});

router.post('/users', user.create);
router.get('/users', user.getAllUsers);

router.put('/user', user.update);
router.get('/user', user.getUser);

module.exports = router;