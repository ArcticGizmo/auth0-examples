const ManagementClient = require('auth0').ManagementClient;

// https://auth0.com/docs/api/management/v2#!/Users/get_users

const SCOPES = [
  'read:users',
  'update:users',
  'read:roles',
  'read:role_members',
  'create:role_members',
  'delete:role_members',
];

class UserMangement {
  constructor() {
    const env = process.env;

    this._client = new ManagementClient({
      domain: env['AUTH0_DOMAIN'],
      clientId: env['AUTH0_CLIENT_ID'],
      clientSecret: env['AUTH0_CLIENT_SECRET'],
      scope: SCOPES.join(' '),
    });
  }

  async getUsers(opts) {
    return await this._client.getUsers(opts);
  }

  async getUser(id) {
    return await this._client.getUser({ id });
  }

  async getRoles() {
    return await this._client.getRoles();
  }

  async getUserRoles(id) {
    return await this._client.getUserRoles({ id });
  }

  async updateUserRoles(userId) {
    // some combination of
    // this._client.removeRolesFromUser();
    // this._client.assignRolestoUser()
  }

  async getUserPermissions(id) {
    return await this._client.getUserPermissions({ id });
  }

  async updateUserPermissions(userId) {
    // some combination of
    // this._client.removePermissionsFromUser()
    // this._client.assignPermissionsToUser()
  }
}

module.exports = new UserMangement();
