<template>
<!-- Alert messages -->
<alert :show.sync="alertState.success" placement="top-right" duration="2000" type="success" width="300px" dismissable>
  <span class="icon-ok-circled alert-icon-float-left"></span>
  <strong>{{ $t('signup.success.header') }}</strong>
  <p>{{ $t('signup.success.body') }}</p>
</alert>
<alert :show.sync="alertState.error" placement="top-right" duration="2000" type="danger" width="300px" dismissable>
  <span class="icon-ok-circled alert-icon-float-left"></span>
  <strong>{{ $t('signup.error.header') }}</strong>
  <p>{{ $t('signup.error.body') }}</p>
</alert>
<!-- -->
<div class="container-fluid">
  <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
    <validator name="validation">
    <form>
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">{{ $t('signup.title') }}</h3>
        </div>
        <div class="panel-body">
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-user" aria-hidden="true"></i>
            </span>
            <input id="firstname" v-model="form.first_name"
              type="text" class="form-control" placeholder="{{ $t('signup.first_name') }}" aria-describedby="basic-addon1" required>
          </div>
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-user" aria-hidden="true"></i>
            </span>
            <input v-model="form.last_name" type="text" class="form-control" placeholder="{{ $t('signup.last_name') }}" aria-describedby="basic-addon1" required>
          </div>
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
            </span>
            <input v-model="form.email" type="text" class="form-control" placeholder="{{ $t('signup.email') }}" aria-describedby="basic-addon1" required>
          </div>
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-key" aria-hidden="true"></i>
            </span>
            <input v-model="form.password" type="password" class="form-control" placeholder="{{ $t('signup.password') }}" aria-describedby="basic-addon1" required>
          </div>
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">
                <i class="fa fa-key" aria-hidden="true"></i>
            </span>
            <input v-model="form.password_again" type="password" class="form-control" placeholder="{{ $t('signup.password_again') }}" aria-describedby="basic-addon1"required>
          </div>
          <div class="input-group">
            <span class="input-group-addon">
              <i class="fa fa-calendar" aria-hidden="true"></i>
            </span>
            <datepicker :value.sync="form.birth_date" format="MM/dd/yyyy" :placeholder="{{ $t('signup.birth_date') }}">
            </datepicker>
          </div>
          <div class="input-group">
            <label class="radio-inline"><input value='Female' v-model="form.gender" type="radio" name="optradio">{{ $t('signup.female') }}</label>
            <label class="radio-inline"><input value='Male' v-model="form.gender" type="radio" name="optradio">{{ $t('signup.male') }}</label>
          </div>
        </div>
        <div class="panel-footer">
          <div class="form-group">
            <div class="btn-group" role="group" aria-label="...">
              <button type="button" class="btn btn-default pull-right" @click="sendForm">{{ $t('signup.button') }}</button>
            </div>
              <div class="checkbox">
              <label class="pull-right">
                <input v-model="form.policy" type="checkbox" required> {{ $t('signup.policy') }}
              </label>
            </div>
            <div class="clearfix"></div>
        </div>
      </div>
    </form>
    </validator>
  </div>
</div>
</template>
<script>
import {
  datepicker,
  alert,
  popover,
} from 'vue-strap';

export default {
  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_again: '',
        birth_date: '',
        gender: '',
        policy: '',
      },

      alertState: {
        success: false,
        error: false,
        warning: false,
      },
      alert: {
        type: 'success',
      },
    };
  },
  components: {
    datepicker,
    alert,
    popover,
  },
  methods: {
    sendForm: function sendSignupForm() {
      const newUser = this.form;

      delete newUser.password_again;
      delete newUser.policy;

      const self = this;

      this.$http
        .post('http://mfr.bael.me:80/v1/users', newUser)
        .then((response) => {
          console.log(response);
          this.alertState.success = true;

          setTimeout(() => {
            self.$router.go('/login');
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
          this.alertState.error = true;
        });
    },
  },
};
</script>
<style scoped>

div.datepicker {
  display:block;
  width: 100%;
}

div.datepicker > input.form-control {
    width:100% !important;
}

.button 
svg {
  width: 13px; /* width bug if svg inline icons are next to each other */
}
.input-group, .btn-group, p {
  margin: 8px;
}
h1 {
  color: #42b983;
}
</style>
