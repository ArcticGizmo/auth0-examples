const express = require('express');
const checkJwt = require('../code/auth.js');
const { requiredPermissions } = require('../code/permissions.js');
const UserMangement = require('../code/user_management.js');

const router = express.Router();

const PERMISSIONS = ['manage:user', 'read:user'];

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

get('/user/:userId', 'read:users', async function (req, res, next) {
  const userId = req.params.userId;

  const [user, permissions] = await Promise.all([
    UserMangement.getUser(userId),
    UserMangement.getUserPermissions(userId),
  ]);

  user.permissions = permissions.map(p => p.permission_name);
  res.send(user);
});

get('/roles', 'read:users', async function (req, res, next) {
  const roles = await UserMangement.getRoles();
  res.send(roles);
});

get('/permissions', async function (req, res, next) {
  res.send(PERMISSIONS);
});

get('/update', 'manage:users', function (req, res, next) {
  res.send('you can manage users');
});

module.exports = router;
