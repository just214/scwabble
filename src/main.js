// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';

import App from './App';
import router from './router';
import store from './store';

Vue.use(Vuetify, {
  theme: {
    primary: 'teal',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
  },
});
Vue.config.productionTip = false;
Vue.config.performance = true;

Vue.component('v-main-title', {
  template:
    '<div class="display-3 text-xs-center main-title purple--text mb-3">{{text}}</div>',
  props: ['text'],
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
