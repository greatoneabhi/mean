var express = require('express');
var user = require('../controller/user.server.controller');
var product = require('../controller/product.server.controller');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
  res.send('Server is running');
});

router.post('/users', user.create);

router.get('/user', user.getUser);
router.get('/users', user.getAllUsers);

router.get('/products', product.getAll);

module.exports = router;