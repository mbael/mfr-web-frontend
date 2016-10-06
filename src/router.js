import Login from './components/auth/login.vue';
import Signup from './components/auth/signup.vue';
import ResetPassword from './components/auth/reset-password.vue';
import RecoverPassword from './components/auth/recover-password.vue';
import Runs from './components/runs/index.vue';
import Details from './components/runs/details.vue';
import Profile from './components/user/profile.vue';
import Settings from './components/user/settings.vue';
import Auth from './services/authentication.js';
import User from './services/user.js';

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
    '/runs': {
      name: 'Runs',
      component: Runs,
      subRoutes: {
        '/:runsId/details': {
          component: Details,
        },
        '/:runsId/runners': {
          component: Details,
        },
        '/:runsId/results': {
          component: Details,
        },
        '/:runsId/contacts': {
          component: Details,
        },
        '/': {
          component: Runs,
        },
      },
    },
    '*': {
      component: Runs,
    },
  });

  router.beforeEach(({ next }) => {
    if (Auth.checkState()) {
      User
        .getData(router.app.$http)
        .then((response) => new Promise((resolve) => {
          Auth.data = response.body;
          resolve();
        }));
    }
    return next();
  });
}
