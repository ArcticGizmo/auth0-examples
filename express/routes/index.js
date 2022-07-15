const express = require('express');
const checkJwt = require('../code/auth.js');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/public', function (req, res, next) {
  res.send('anyone can see this route');
});

router.get('/private', checkJwt, function (req, res, next) {
  res.send('you must be authenticated');
});

router.get('/private-scoped', checkJwt, requiredScopes('read:messages'), function (req, res, next) {
  res.send('you must be authenticated and have the read:messages scope');
});

module.exports = router;
