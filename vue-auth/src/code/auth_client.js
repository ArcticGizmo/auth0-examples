import { createAuth0 } from '@auth0/auth0-vue';

export default createAuth0({
  domain: import.meta.env['VITE_AUTH0_DOMAIN'],
  client_id: import.meta.env['VITE_AUTH0_CLIENT_ID'],
  redirect_uri: window.location.origin,
  // if you do not specify an audience and get an access token,
  // it will be an opaque token, used by the auth0 api only
  audience: import.meta.env['VITE_AUTH0_AUDIENCE'],
});
