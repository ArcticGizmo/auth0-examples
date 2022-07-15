import { createApp } from 'vue';
import App from './App.vue';
import router from './code/router';

import { createAuth0 } from '@auth0/auth0-vue';

import Icon from './components/Icon.vue';

const app = createApp(App);

app.use(router);

app.use(
  createAuth0({
    domain: import.meta.env['VITE_AUTH0_DOMAIN'],
    client_id: import.meta.env['VITE_AUTH0_CLIENT_ID'],
    redirect_uri: window.location.origin,
    audience: import.meta.env['VITE_AUTH0_AUDIENCE'],
  }),
);

app.component('Icon', Icon);

app.mount('#app');
