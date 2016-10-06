<template>
<header>
  <nav class="navbar navbar-default navbar-static-top">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" v-link="'/'">
          <img class="img-responsive" alt="Brand" src="../../assets/logo.png">
        </a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <form class="navbar-form navbar-left">
          <div class="form-group">
            <typeahead :data="runs" :on-hit="runSelect">
            </typeahead>
          </div>
          <button type="submit" class="btn btn-default">
          <icon name="search"></icon></button>
        </form>
        <!-- Login / Signup -->
        <form v-if="!user.authenticated" class="navbar-form navbar-right">
          <button v-link="{ name: 'Login' }" type="submit" class="btn btn-primary">
          {{ $t('header.login') }}
          </button>
          <button v-link="{ name: 'Signup' }" type="submit" class="btn btn-primary">
          {{ $t('header.signup') }}
          </button>
        </form>
        <!-- Profile -->
        <ul v-if="user.authenticated" class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{ logged_user.first_name }} <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a v-link="{ name: 'Profile', params: { userId: logged_user.user_id } }">{{ $t('header.user.profile') }}</a></li>
            <li><a v-link="{ name: 'Settings' }">{{ $t('header.user.settings') }}</a></li>
            <li role="separator" class="divider"></li>
            <li><a @click="logout">{{ $t('header.user.logout') }}</a></li>
          </ul>
        </li>
      </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</header>
</template>

<script>
import Icon from 'vue-awesome';
import {
  typeahead,
} from 'vue-strap';
import auth from '../../services/authentication.js';
// import user from '../../services/user.js';

export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      runs: ['Mór Fit Run', 'Sziget Fit Run'],
      user: auth.user,
      logged_user: '',
    };
  },
  components: {
    Icon, typeahead, auth,
  },
  methods: {
    runSelect: () => {
      // alert('OK');
    },
    logout: () => {
      auth.logout();
    },
  },
  /*activate: function act(done) {
    user
      .getProfile(this.$http)
      .then((account) => {
        this.logged_user = account;
        done();
      })
      .catch(() => {
        done();
      });
  },*/
};
</script>

<style lang="scss">
.navbar-brand {
  img {
    width: 140px;
    height: 100%;
  }
}

h1 {
  color: #42b983;
}
</style>
