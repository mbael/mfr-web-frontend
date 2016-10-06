<template>
<!-- Alert messages -->
<alert :show.sync="alertState.success" placement="top-right" duration="2000" type="success" width="300px" dismissable>
  <span class="icon-ok-circled alert-icon-float-left"></span>
  <strong>{{ $t('login.success.header') }}</strong>
  <p>{{ $t('login.success.body') }}</p>
</alert>
<alert :show.sync="alertState.error" placement="top-right" duration="2000" type="danger" width="300px" dismissable>
  <span class="icon-ok-circled alert-icon-float-left"></span>
  <strong>{{ $t('login.error.header') }}</strong>
  <p>{{ $t('login.error.body') }}</p>
</alert>
<!-- -->
<div class="container-fluid">
  <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
    <div class="panel panel-default">
      <!-- header -->
      <div class="panel-heading">
        <h3 class="panel-title">{{ $t('login.title') }}</h3>
      </div>
      <div class="panel-body">
        <!-- email -->
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </span>
          <input v-model="email" type="text" class="form-control" placeholder="{{ $t('login.email') }}" aria-describedby="basic-addon1">
        </div>
        <!-- password -->
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">
            <i class="fa fa-key" aria-hidden="true"></i>
          </span>
          <input v-model="password" type="password" class="form-control" placeholder="{{ $t('login.password') }}" aria-describedby="basic-addon1">
        </div>
      </div>
      <div class="panel-footer">
        <!-- login button -->
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default pull-right" @click="login">{{ $t('login.button') }}</button>
        </div>
        <!-- reset password -->
        <p v-link="'reset_password'" class="pull-right text-info text-right">{{ $t('login.forgot_password') }}</p>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  alert,
} from 'vue-strap';
import auth from '../../services/authentication.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      alertState: {
        error: false,
        success: false,
      },
    };
  },
  components: {
    alert, auth,
  },
  methods: {
    login: function login() {
      const router = this.$router;
      /* store form data */
      const userForm = {
        email: this.email,
        password: this.password,
      };

      auth
        .login(this.$http, userForm)
        .then(() => {
          // redirect to runs component
          setTimeout(() => {
            router.go({
              name: 'Runs',
            });
          }, 20);
        })
        .catch((error) => { this.error = error; });
    },
  },
};
</script>

<style scoped>
.input-group, .btn-group, p {
  margin: 8px;
}
h1 {
  color: #42b983;
}
</style>
