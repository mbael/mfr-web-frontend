import Login from './components/auth/login.vue';
import Signup from './components/auth/signup.vue';
import ResetPassword from './components/auth/reset-password.vue';
import RecoverPassword from './components/auth/recover-password.vue';
import Races from './components/races/index.vue';
import Run from './components/run/index.vue';
import Feed from './components/feed/index.vue';
import Profile from './components/profile/index.vue';
import Settings from './components/user/settings.vue';
import FacebookOauth from './components/auth/facebook-oauth.vue';

import About from './components/about/index.vue';
import Who from './components/about/who-are-we.vue';
import How from './components/about/how-it-works.vue';
import App from './components/about/application.vue';

import AuthService from './services/authentication.js';
import UserService from './services/user.js';

export default function ConfigRouter(routr) {
  const router = routr;

  router.map({
    '/reset_password': {
      name: 'Reset password',
      component: ResetPassword,
    },
    '/reset_password/:passwordToken': {
      name: 'Recover password',
      component: RecoverPassword,
    },
    '/facebook': {
      name: 'Facebook Oauth',
      component: FacebookOauth,
    },
    '/login': {
      name: 'Login',
      component: Login,
    },
    '/signup': {
      name: 'Signup',
      component: Signup,
    },
    '/profile/:userId': {
      name: 'Profile',
      component: Profile,
    },
    '/settings': {
      name: 'Settings',
      component: Settings,
    },
    '/about': {
      name: 'About',
      component: About,
      subRoutes: {
        '/whoarewe': {
          name: 'Who',
          component: Who,
        },
        '/howitworks': {
          name: 'How',
          component: How,
        },
        '/app': {
          name: 'Application',
          component: App,
        },
      },
    },
    '/feed': {
      name: 'Feed',
      component: Feed,
    },
    '/runs': {
      name: 'Runs',
      component: Races,
    },
    '/runs/:runId': {
      name: 'Run',
      component: Run,
    },
    '*': {
      component: Races,
    },
  });

  router.beforeEach(({ next }) => {
    if (AuthService.isAuthenticated()) {
      UserService
        .get(router.app)
        .then((response) => {
          // store logged user data
          AuthService.data = response.data;
          AuthService.authenticated = true;
        })
        .catch(() => {
          // delete tokens and set unauthenticated
          AuthService.authenticated = false;
          localStorage.removeItem('accessToken');
        });
    }
    return next();
  });
}
