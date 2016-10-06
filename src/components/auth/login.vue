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
      <div class="panel-heading">
        <h3 class="panel-title">{{ $t('login.title') }}</h3>
      </div>
      <div class="panel-body">
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
          </span>
          <input v-model="form.email" type="text" class="form-control" placeholder="{{ $t('login.email') }}" aria-describedby="basic-addon1">
        </div>
        <div class="input-group">
          <span class="input-group-addon" id="basic-addon1">
            <i class="fa fa-key" aria-hidden="true"></i>
          </span>
          <input v-model="form.password" type="password" class="form-control" placeholder="{{ $t('login.password') }}" aria-describedby="basic-addon1">
        </div>
      </div>
      <div class="panel-footer">
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default pull-right" @click="sendForm">{{ $t('login.button') }}</button>
        </div>
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
      form: {
        email: '',
        password: '',
      },
      alertState: {
        success: false,
        error: false,
      },
    };
  },
  components: {
    alert, auth,
  },
  methods: {
    sendForm: function sendLoginForm() {
      const self = this;

      auth.login(this.$http, this.form)
        .then(() => {
          self.$router.go({
            name: 'Runs',
          });
        })
        .catch((error) => {
          console.log(error);
        });
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
