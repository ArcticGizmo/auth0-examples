const express = require('express');
const checkJwt = require('../code/auth.js');
const { requiredScopes } = require('express-oauth2-jwt-bearer');
const { requiredPermissions } = require('../code/permissions.js');

const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/public', function (req, res, next) {
  res.send('anyone can see this route');
});

router.get('/private', checkJwt, function (req, res, next) {
  res.send('you must be authorized');
});

router.get('/private-scoped', checkJwt, requiredScopes('email'), function (req, res, next) {
  res.send('you must have the email scope');
});

router.get(
  '/private-permissioned',
  checkJwt,
  requiredPermissions('read:users'),
  function (req, res, next) {
    res.send('You must have permissions');
  },
);

module.exports = router;
