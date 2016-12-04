<template>
  <!-- ALERT -->
  <alert :show.sync="alert.enabled" :type.sync="alert.style" placement="top-right" duration="2000" width="300px" dismissable>
    <!-- NOTFOUND -->
    <template v-if="alert.type === 0">
      <strong>{{ $t('resetPassword.notFound.header') }}</strong>
      <p>{{ $t('resetPassword.notFound.body') }}</p>
    </template>
    <!-- ERROR -->
    <template v-if="alert.type === 1">
      <strong>{{ $t('resetPassword.error.header') }}</strong>
      <p>{{ $t('resetPassword.error.body') }}</p>
    </template>
    <!-- SUCCESS -->
    <template v-if="alert.type === 2">
      <strong>{{ $t('resetPassword.success.header') }}</strong>
      <p>{{ $t('resetPassword.success.body') }}</p>
    </template>
  </alert>
  <!-- CONTAINER -->
  <div class="container-fluid">
    <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
      <div class="panel panel-default">
        <!-- HEADER -->
        <div class="panel-heading">
          <h3 class="panel-title">{{ $t('resetPassword.title') }}</h3>
        </div>
        <!-- BODY -->
        <div class="panel-body">
          <form-group :valid.sync="valid.email" :enterSubmit="true">
          <!-- EMAIL -->
            <input-box :value.sync="email" :placeholder="$t('resetPassword.email')" :label="$t('resetPassword.email')" type="email" required>
              <span slot="before" class="input-group-addon" id="basic-addon1">
                <i class="fa fa-envelope-o" aria-hidden="true"></i>
              </span>
            </input-box>
          </form-group>
        </div>
        <!-- FOOTER -->
        <div class="panel-footer">
          <!-- RESET PASSWORD -->
          <div class="btn-group pull-left" role="group" aria-label="...">
            <button :disabled="!valid.email" type="button" class="btn btn-default" @click="resetPassword">{{ $t('resetPassword.button') }}</button>
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

import UserService from '../../services/user.js';

export default {
  name: 'ResetPassword',
  data() {
    return {
      // bind
      email: '',

      // validation
      valid: {
        email: false,
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
    resetPassword() {
      // formdata
      const userData = {
        email: this.email,
      };

      UserService
        .resetPassword(this, userData)
        .then(() => {
          this.setAlert(2, 'success');
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

h1 {
  color: #42b983;
}
</style>
