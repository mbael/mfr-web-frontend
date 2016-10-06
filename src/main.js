import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueStrap from 'vue-strap';
import VueResource from 'vue-resource';
import VueI18n from 'vue-i18n';
import VueHead from 'vue-head';
import VueValidator from 'vue-validator';
import configRouter from './router.js';
import locales from './locales.js';

Vue.use(VueI18n);
Vue.use(VueValidator);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueHead);

// check auth
Vue.http.headers.common.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
// set default endpoint
// Vue.http.options.root = '/api/';

// set lang
Vue.config.lang = 'hu';
Vue.config.fallbackLang = 'en';

Vue.locale('hu', locales.hu);
Vue.locale('en', locales.en);

// set html5 router
const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
});

// register resources


// register global components
Vue.component('vuestrap', VueStrap);

// autoload all routes & components
configRouter(router);

// mount
router.start(App, 'body');
