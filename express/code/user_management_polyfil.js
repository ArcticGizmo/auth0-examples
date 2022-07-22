const util = require('util');
const Auth0RestClient = require('auth0/src/Auth0RestClient');
const RetryRestClient = require('auth0/src/RetryRestClient');

const BASE_URL_FORMAT = 'https://%s/api/v2';

function addMissingEndpoints(client, domain) {
  addGetOrganizations(client);
  addGetUserOrganizations(client, domain);
}

function addGetOrganizations(client) {
  client.getOrganizations = client.organizations.getAll;
}

function addGetUserOrganizations(client, domain) {
  const headers = {
    'User-Agent': `node.js/${process.version.replace('v', '')}`,
    'Content-Type': 'application/json',
  };

  const clientOptions = {
    errorFormatter: { message: 'message', name: 'error' },
    headers,
    query: { repeatParams: false },
  };

  const baseUrl = util.format(BASE_URL_FORMAT, domain);

  const usersAuthRestClient = new Auth0RestClient(
    `${baseUrl}/users/:id/organizations`,
    clientOptions,
    client.tokenProvider,
  );

  const users = new RetryRestClient(usersAuthRestClient);

  client.getUserOrganizations = async id => {
    return users.get({ id });
  };
}

module.exports = addMissingEndpoints;
