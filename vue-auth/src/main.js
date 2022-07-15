import { createApp } from 'vue';
import App from './App.vue';
import router from './code/router';
import auth from './code/auth_client';

import Icon from './components/Icon.vue';

const app = createApp(App).use(router).use(auth);

app.component('Icon', Icon);

app.mount('#app');
