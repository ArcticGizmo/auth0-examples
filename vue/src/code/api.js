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

  setUserPermissions(userId, permissions) {
    return this._api.authedPost(`user-management/user/${userId}`, { permissions });
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
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const resp = await axios.get(url, config);
    return resp.data;
  }

  async authedPost(endpoint, params) {
    const token = await AuthClient.getAccessTokenSilently();
    const url = `${BASE}/${endpoint}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const resp = await axios.post(url, params, config);
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
