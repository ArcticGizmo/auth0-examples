import axios from 'axios';
import AuthClient from './auth_client';

const PORT = 4000;
const BASE = `http://localhost:${PORT}`;

class UserMangement {
  constructor(api) {
    this._api = api;
  }

  getUsers() {
    return this._api.authedGet('user-management/users');
  }

  getUser(userId) {
    return this._api.authedGet(`user-management/user/${userId}`);
  }

  getRoles() {
    return this._api.authedGet('user-management/roles');
  }

  getPermissions() {
    return this._api.authedGet('user-management/permissions');
  }
}

class API {
  constructor() {
    this._userMangement = new UserMangement(this);
  }

  async get(endpoint) {
    const url = `${BASE}/${endpoint}`;
    const resp = await axios.get(url);
    return resp.data;
  }

  async authedGet(endpoint) {
    const token = await AuthClient.getAccessTokenSilently();
    const url = `${BASE}/${endpoint}`;
    const resp = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return resp.data;
  }

  getPublic() {
    return this.get('public');
  }

  getPrivate() {
    return this.authedGet('private');
  }

  getPrivateScoped() {
    return this.authedGet('private-scoped');
  }

  getPrivatePermissioned() {
    return this.authedGet('private-permissioned');
  }

  get userManagement() {
    return this._userMangement;
  }
}

export default new API();
