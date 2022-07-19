const { auth } = require('express-oauth2-jwt-bearer');

const env = process.env;
const domain = env['AUTH0_DOMAIN'];
const audience = env['AUTH0_AUDIENCE'];

let AUTH = null;

if (AUTH == null) {
  AUTH = auth({
    audience,
    issuerBaseURL: `https://${domain}/`,
  });
}

module.exports = AUTH;
