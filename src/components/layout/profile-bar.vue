<template>
  <ul v-if="auth.authenticated" class="nav navbar-nav navbar-right">
    <li class="dropdown">
      <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ auth.data.firstName }}
        <span class="caret"></span>
      </a>
      <ul class="dropdown-menu">
        <li><a v-link="{ name: 'Profile', params: { userId: auth.data._id } }">{{ $t('header.user.profile') }}</a></li>
        <li><a v-link="{ name: 'Settings' }">{{ $t('header.user.settings') }}</a></li>
        <li role="separator" class="divider"></li>
        <li><a @click="logout">{{ $t('header.user.logout') }}</a></li>
      </ul>
    </li>
  </ul>
  <!-- Login / Signup -->
  <form v-else class="navbar-form navbar-right">
    <button v-link="{ name: 'Login' }" type="submit" class="btn btn-primary">
    {{ $t('header.login') }}
    </button>
    <button v-link="{ name: 'Signup' }" type="submit" class="btn btn-primary">
    {{ $t('header.signup') }}
    </button>
  </form>
</template>

<script>
import AuthService from '../../services/authentication.js';

export default {
  data() {
    return {
      auth: AuthService,
    };
  },
  methods: {
    logout: () => {
      AuthService.logout();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  color: #42b983;
}
</style>
