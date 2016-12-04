<template>
  <!-- ALERT -->
  <alert :show.sync="alert.enabled" :type.sync="alert.style" placement="top-right" duration="2000" width="300px" dismissable>
    <!-- BAD DATA -->
    <template v-show="alert.type === 0">
      <strong>{{ $t('login.badData.header') }}</strong>
      <p>{{ $t('login.badData.body') }}</p>
    </template>
    <!-- NOT FOUND -->
    <template v-show="alert.type === 1">
      <strong>{{ $t('login.notFound.header') }}</strong>
      <p>{{ $t('login.notFound.body') }}</p>
    </template>
    <!-- ERROR -->
    <template v-show="alert.type === 2">
      <strong>{{ $t('login.error.header') }}</strong>
      <p>{{ $t('login.error.body') }}</p>
    </template>
  </alert>
  <!-- CONTAINER -->
  <div class="container-fluid">
    <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="panel panel-default">
        <!-- HEADER -->
        <div class="panel-heading">
          <h3 class="panel-title">{{ $t('login.title') }}</h3>
        </div>
        <!-- BODY -->
        <div class="panel-body">
          <form-group :valid.sync="valid.all" :enter-submit="true">
            <!-- EMAIL -->
            <form-group :valid.sync="valid.email">
              <input-box :value.sync="email" :enter-submit="true" :label="$t('login.email')" type="email" required :placeholder="$t('login.email')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-envelope-o" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- PASSWORD -->
            <form-group :valid.sync="valid.password">
              <input-box :value.sync="password" :enter-submit="true" :label="$t('login.password')" type="password" required :placeholder="$t('login.password')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-key" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
          </form-group>
        </div>
        <!-- FOOTER -->
        <div class="panel-footer">

          <!-- LOGIN -->
          <div class="btn-group" role="group" aria-label="...">
            <button type="button" :disabled="!valid.all" class="btn btn-md btn-default pull-right" @click="login">{{ $t('login.button') }}</button>
          </div>
          <!-- FACEBOOK LOGIN -->
          <div @click="loginWithFacebook" class="btn-group" role="group" aria-label="...">
            <a class="btn btn-block btn-social btn-sm btn-facebook">
              <span class="fa fa-facebook"></span>{{ $t('login.fbButton') }}
            </a>
          </div>
          <!-- RESET PASSWORD -->
          <div class="btn-group pull-right" role="group" aria-label="...">
            <button type="button" class="btn btn-default btn-md" @click="forgotPassword">
              {{ $t('login.forgotPassword') }}
            </button>
          </div>
          <!-- CLEARFIX -->
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  alert,
  formGroup,
  input as inputBox,
} from 'vue-strap';
import AuthService from '../../services/authentication.js';
// import Facebook from 'facebook';

export default {
  name: 'Login',
  data() {
    return {
      // data bind
      email: '',
      password: '',

      // validation props
      valid: {
        all: false,
        email: false,
        password: false,
      },

      // state info
      alert: {
        enabled: false,
        type: '',
        style: '',
      },
    };
  },
  components: {
    alert, formGroup, inputBox,
  },
  methods: {
    forgotPassword() {
      this.$router.go({
        name: 'Reset password',
      });
    },
    loginWithFacebook() {
      // https://graph.facebook.com/oauth/authorize?client_id=1012799602130499&redirect_uri=http://localhost:8080
      // route to oauth
      window.location = 'https://www.facebook.com/v2.8/dialog/oauth?client_id=1012799602130499&scope=email,user_birthday&redirect_uri=http://mfr.bael.me/facebook';
    },
    login() {
      const router = this.$router;
      /* store form data */
      const userData = {
        email: this.email,
        password: this.password,
      };

      AuthService
        .login(this, userData)
        .then(() => {
          // redirect to runs component
          router.go({
            name: 'Feed',
          });
        })
        // check error type
        .catch((error) => {
          switch (error.status) {
            // bad data
            case 401:
              this.setAlert(0, 'warning');
              break;
            // not found
            case 404:
              this.setAlert(1, 'warning');
              break;
            // error
            default:
              this.setAlert(2, 'danger');
          }
        });
    },
    setAlert(type, style) {
      // param check
      if (type === '' || !style) return false;
      // set up props
      this.alert.enabled = true;
      this.alert.type = type;
      this.alert.style = style;

      return true;
    },
  },
};
</script>

<style lang="scss" scoped>

.form-group, .btn-group {
  margin: 8px;
}

h1 {
  color: #42b983;
}
</style>
