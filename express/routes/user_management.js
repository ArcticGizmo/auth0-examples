const express = require('express');
const checkJwt = require('../code/auth.js');
const { requiredScopes } = require('express-oauth2-jwt-bearer');

const router = express.Router();

function get(endpoint, scopes, callback) {
  if (!callback) {
    callback = scopes;
    scopes = [];
  }
  router.get(endpoint, checkJwt, requiredScopes(scopes), callback);
}

get('/users', 'read:users', function (req, res, next) {
  res.send('you can read users');
});

get('/update', 'manage:users', function (req, res, next) {
  res.send('you can manage users');
});

module.exports = router;
