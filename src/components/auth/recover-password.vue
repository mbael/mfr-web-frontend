<template>
  <!-- ALERT -->
  <alert :show.sync="alert.enabled" :type.sync="alert.style" placement="top-right" duration="2000" width="300px" dismissable>
    <!-- NOT FOUND -->
    <template v-if="alert.type === 0">
      <strong>{{ $t('recoverPassword.notFound.header') }}</strong>
      <p>{{ $t('recoverPassword.notFound.body') }}</p>
    </template>
    <!-- ERROR -->
    <template v-if="alert.type === 1">
      <strong>{{ $t('recoverPassword.error.header') }}</strong>
      <p>{{ $t('recoverPassword.error.body') }}</p>
    </template>
    <!-- NOTMATCH -->
    <template v-if="alert.type === 2">
      <strong>{{ $t('recoverPassword.notMatch.header') }}</strong>
      <p>{{ $t('recoverPassword.notMatch.body') }}</p>
    </template>
    <!-- SUCCESS -->
    <template v-if="alert.type === 3">
      <strong>{{ $t('recoverPassword.success.header') }}</strong>
      <p>{{ $t('recoverPassword.success.body') }}</p>
    </template>
  </alert>
  <!-- CONTAINER -->
  <div class="container-fluid">
    <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
      <div class="panel panel-default">
        <!-- HEADER -->
        <div class="panel-heading">
          <h3 class="panel-title">{{ $t('recoverPassword.title') }}</h3>
        </div>
        <!-- BODY -->
        <div class="panel-body">
          <form-group :valid.sync="valid.all">
            <!-- PASSWORD -->
            <form-group :valid.sync="valid.password">
              <input-box :value.sync="password" type="password" :label="$t('recoverPassword.password')" :placeholder="$t('recoverPassword.password')" required>
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-key" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- PASSWORD AGAIN -->
            <form-group :valid.sync="valid.passwordAgain">
              <input-box :value.sync="passwordAgain" type="password" :label="$t('recoverPassword.passwordAgain')" :placeholder="$t('recoverPassword.passwordAgain')" required>
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-key" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
          </div>
          <!-- FOOTER -->
          <div class="panel-footer">
            <div class="btn-group pull-left" role="group" aria-label="...">
              <button :disabled="!valid.all" type="button" class="btn btn-default" @click="recoverPassword">{{ $t('recoverPassword.button') }}</button>
            </div>
            <div class="clearfix"></div>
          </div>
        </form-group>
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

import UserService from '../../services/user.js';

export default {
  name: 'RecoverPassword',
  components: {
    alert, formGroup, inputBox,
  },
  data() {
    return {
      // data bind
      password: '',
      passwordAgain: '',

      // validation
      valid: {
        all: false,
        password: false,
        passwordAgain: false,
      },

      // alert
      alert: {
        enabled: false,
        type: '',
        style: '',
      },
    };
  },
  methods: {
    recoverPassword() {
      // get passwordtoken from params
      const {
        passwordToken,
      } = this.$route.params;

      // get from from data
      const {
        password,
        passwordAgain,
      } = this;

      const userData = {
        password,
        passwordToken,
      };

      // check if two password equals
      if (password !== passwordAgain) {
        this.setAlert(2, 'warning');
        return false;
      }

      UserService
        .recoverPassword(this, userData)
        .then(() => {
          this.setAlert(3, 'success');
          // route him after 2.1 sec (alert stays until then)
          setTimeout(() => {
            this.$router.go('Feed');
          }, 2100);
        })
        .catch((error) => {
          switch (error.status) {
            case 404:
              this.setAlert(0, 'warning');
              break;
            default:
              this.setAlert(1, 'danger');
          }
        });
      return true;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.form-group {
  margin: 8px;
}

.input-group, .btn-group, p {
  margin: 8px;
}
</style>
