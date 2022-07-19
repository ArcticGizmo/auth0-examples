import axios from 'axios';
const PORT = 4000;
const BASE = `http://localhost:${PORT}`;

class UserMangement {
  constructor(api) {
    this._api = api;
  }

  getUsers(token) {
    return this._api.authedGet('user-management/users', token);
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

  async authedGet(endpoint, token) {
    const url = `${BASE}/${endpoint}`;
    const resp = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
    return resp.data;
  }

  getPublic() {
    return this.get('public');
  }

  getPrivate(token) {
    return this.authedGet('private', token);
  }

  getPrivateScoped(token) {
    return this.authedGet('private-scoped', token);
  }

  getPrivatePermissioned(token) {
    return this.authedGet('private-permissioned', token);
  }

  get userManagement() {
    return this._userMangement;
  }
}

export default new API();
