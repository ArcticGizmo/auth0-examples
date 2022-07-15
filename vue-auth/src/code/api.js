import axios from 'axios';
const PORT = 4000;
const BASE = `http://localhost:${PORT}`;

class API {
  async get(endpoint) {
    const url = `${BASE}/${endpoint}`;
    const resp = await axios.get(url);
    return resp.data;
  }

  getPublic() {
    return this.get('public');
  }

  getPrivate() {
    return this.get('private');
  }

  getPrivateScoped() {
    return this.get('private-scoped');
  }
}

export default new API();
