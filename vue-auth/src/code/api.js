import axios from 'axios';
const PORT = 4000;
const BASE = `http://localhost:${PORT}`;

class API {
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
}

export default new API();
