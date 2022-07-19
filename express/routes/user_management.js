const express = require('express');
const checkJwt = require('../code/auth.js');
const { requiredPermissions } = require('../code/permissions.js');
const UserMangement = require('../code/user_management.js');

const router = express.Router();

function get(endpoint, permissions, callback) {
  if (!callback) {
    callback = permissions;
    permissions = [];
  }
  router.get(endpoint, checkJwt, requiredPermissions(permissions), callback);
}

get('/users', 'read:users', async function (req, res, next) {
  const users = await UserMangement.getUsers();
  res.send(users);
});

get('/update', 'manage:users', function (req, res, next) {
  res.send('you can manage users');
});

module.exports = router;
