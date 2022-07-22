const ManagementClient = require('auth0').ManagementClient;

const addMissingEndpoints = require('./user_management_polyfil');

// https://auth0.com/docs/api/management/v2#!/Users/get_users

const SCOPES = [
  // users
  'read:users',
  'update:users',
  'read:roles',
  'read:role_members',
  'create:role_members',
  'delete:role_members',
  // orgs
  'read:organizations',
  'read:organizations_summary',
];

function separatePermissions(newPermissions, oldPermissions) {
  if (newPermissions.length === 0) {
    return { toRemove: oldPermissions, toAdd: [] };
  }

  if (oldPermissions.length === 0) {
    return { toRemove: [], toAdd: newPermissions };
  }

  const toAdd = newPermissions.filter(p => !oldPermissions.includes(p));
  const toRemove = oldPermissions.filter(p => !newPermissions.includes(p));

  return { toRemove, toAdd };
}

function toSendablePermissions(permissions, audience) {
  return permissions.map(p => ({ permission_name: p, resource_server_identifier: audience }));
}

class UserMangement {
  constructor() {
    const env = process.env;

    const domain = env['AUTH0_DOMAIN'];

    this._client = new ManagementClient({
      domain,
      clientId: env['AUTH0_CLIENT_ID'],
      clientSecret: env['AUTH0_CLIENT_SECRET'],
      scope: SCOPES.join(' '),
    });
    addMissingEndpoints(this._client, domain);

    this._audience = env['AUTH0_AUDIENCE'];
  }

  async getUsers(opts) {
    return this._client.getUsers(opts);
  }

  async getUser(id) {
    return this._client.getUser({ id });
  }

  async getRoles() {
    return this._client.getRoles();
  }

  async getUserRoles(id) {
    return this._client.getUserRoles({ id });
  }

  async setUserRoles(userId, roles) {
    // some combination of
    // this._client.removeRolesFromUser();
    // this._client.assignRolestoUser()
  }

  async getUserPermissions(id) {
    return this._client.getUserPermissions({ id });
  }

  async setUserPermissions(userId, permissions) {
    const oldPermissions = (await this.getUserPermissions(userId)).map(p => p.permission_name);

    const { toRemove, toAdd } = separatePermissions(permissions, oldPermissions);

    if (toRemove.length === 0 && toAdd.length === 0) {
      return;
    }

    return Promise.all([
      this.addUserPermissions(userId, toAdd),
      this.removeUserPermissions(userId, toRemove),
    ]);
  }

  async removeUserPermissions(userId, permissions) {
    if (permissions.length === 0) {
      return;
    }

    return this._client.removePermissionsFromUser(
      { id: userId },
      { permissions: toSendablePermissions(permissions, this._audience) },
    );
  }

  async addUserPermissions(userId, permissions) {
    if (permissions.length === 0) {
      return;
    }

    return this._client.assignPermissionsToUser(
      { id: userId },
      { permissions: toSendablePermissions(permissions, this._audience) },
    );
  }

  async getOrganizations() {
    return this._client.getOrganizations();
  }

  async getUserOrganizations(id) {
    return this._client.getUserOrganizations(id);
  }
}

module.exports = new UserMangement();
