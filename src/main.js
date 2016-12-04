import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import VueStrap from 'vue-strap';
import VueResource from 'vue-resource';
import VueI18n from 'vue-i18n';
import VueHead from 'vue-head';
import VueValidator from 'vue-validator';
import VueTables from 'vue-tables';
import VueMoment from 'vue-moment';
// import _ from 'lodash';

import configRouter from './router.js';
import locales from './locales.js';

window.Vue = Vue;

Vue.use(VueI18n);
Vue.use(VueValidator);
Vue.use(VueResource);
Vue.use(VueMoment);
Vue.use(VueRouter);
Vue.use(VueHead);
Vue.use(VueTables.client, {
  filterByColumn: true,
  datepickerOptions: {
    showDropdowns: true,
  },
});

// register custom filters

Vue.filter('daysToRun', (value) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const now = new Date();
  const runDay = new Date(value);

  const diffDays = Math.round(Math.abs((runDay.getTime() - now.getTime()) / (oneDay)));

  return diffDays;
});

// set token header for every request
Vue.http.interceptors.push((request, next) => {
  const token = localStorage.getItem('accessToken');
  const req = request;

  // debug
  console.log(request);

  if (token) {
    req.headers.set('Authorization', `Bearer ${token}`);
  }

  return next((response) => {
    console.log(response);
  });
});

// set lang
Vue.config.lang = 'hu';
Vue.config.fallbackLang = 'en';

Vue.locale('hu', locales.hu);
Vue.locale('en', locales.en);

// set up change language
Vue.prototype.$locale = {
  change(lang) {
    Vue.config.lang = lang;
  },
  current() {
    return Vue.config.lang;
  },
};

// set html5 router
const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
});

// register global components
Vue.component('vuestrap', VueStrap);

// autoload all routes & components
configRouter(router);

// mount
router.start(App, 'body');
