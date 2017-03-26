<template>
  <!-- ALERT -->
  <alert :show.sync="alert.enabled" :type.sync="alert.style" placement="top-right" duration="2000" width="300px" dismissable>
    <!-- CONFLICT -->
    <template v-if="alert.type === 0">
      <strong>{{ $t('signup.conflict.header') }}</strong>
      <p>{{ $t('signup.conflict.body') }}</p>
    </template>
    <!-- ERROR -->
    <template v-if="alert.type === 1">
      <strong>{{ $t('signup.error.header') }}</strong>
      <p>{{ $t('signup.error.body') }}</p>
    </template>
  </alert>
  <!-- CONTAINER -->
  <div class="container-fluid">
    <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="panel panel-default">
        <form-group :valid.sync="valid.all">
          <!-- HEADER -->
          <div class="panel-heading">
            <h3 class="panel-title">{{ $t('signup.title') }}</h3>
          </div>
          <!-- BODY -->
          <div class="panel-body">
            <!-- FIRST NAME -->
            <form-group :valid.sync="valid.firstName">
              <input-box :value.sync="firstName" :label="$t('signup.firstName')" type="text" required :placeholder="$t('signup.firstName')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-user" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- LAST NAME -->
            <form-group :valid.sync="valid.lastName">
              <input-box :value.sync="lastName" :label="$t('signup.lastName')" type="text" required :placeholder="$t('signup.lastName')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-user" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- EMAIL -->
            <form-group :valid.sync="valid.email">
              <input-box :value.sync="email" :label="$t('signup.email')" type="email" required :placeholder="$t('signup.email')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-envelope" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- PASSWORD -->
            <form-group :valid.sync="valid.password">
              <input-box :value.sync="password" :label="$t('signup.password')" type="password" required :placeholder="$t('signup.password')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-key" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- PASSWORD AGAIN -->
            <form-group :valid.sync="valid.passwordAgain">
              <input-box :value.sync="passwordAgain" :label="$t('signup.passwordAgain')" type="password" required :placeholder="$t('signup.passwordAgain')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-key" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- BIRTH DATE -->
            <div class="form-group">
              <form-group :valid.sync="valid.birthDate">
                <label class="control-label">{{ $t('signup.birthDate') }}</label>
                <date-picker :clear-button="true" :value.sync="birthDate" format="yyyy/MM/dd" :placeholder="$t('signup.birthDate')">
                </date-picker>
              </form-group>
            </div>
            <div class="form-group" role="group" aria-label="...">
              <button-group :value.sync="gender" type="primary" :valid.sync="valid.gender">
                <radio value="male">Férfi</radio>
                <radio value="female">Nő</radio>
              </button-group>
            </div>
          </div>
          <!-- FOOTER -->
          <div class="panel-footer">
            <div class="btn-group pull-left" role="group" aria-label="...">
              <button :disabled="!valid.all" type="button" class="btn btn-default pull-right" @click="signup">{{ $t('signup.button') }}</button>
            </div>
            <div class="form-group pull-right" role="group" aria-label="...">
              <form-group :valid.sync="valid.policy">
                <check-box :checked.sync="policy" type="info">{{ $t('signup.policy') }}</check-box>
              </form-group>
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
  radio,
  buttonGroup,
  datepicker as datePicker,
  alert,
  formGroup,
  checkbox as checkBox,
  input as inputBox,
} from 'vue-strap';
import UsersService from '../../services/users.js';

export default {
  name: 'Signup',
  data() {
    return {
      // data bind
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordAgain: '',
      birthDate: '',
      gender: '',
      policy: '',

      // alert
      alert: {
        enabled: false,
        style: '',
        type: '',
      },

      // validation
      valid: {
        all: false,
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        passwordAgain: false,
        birthDate: false,
      },
    };
  },
  components: {
    datePicker, alert, formGroup, inputBox, checkBox, radio, buttonGroup,
  },
  watch: {
    birthDate(value) {
      // check for validation
      if (value === '') {
        this.valid.birthDate = false;
      } else {
        this.valid.birthDate = true;
      }
      console.log(value);
    },
  },
  methods: {
    signup() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
        birthDate: this.birthDate,
        gender: this.gender,
      };

      UsersService
        .create(this, data)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
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

div.datepicker {
  display:block;
  width: 100%;
}

.button 
svg {
  width: 13px; /* width bug if svg inline icons are next to each other */
}

h1 {
  color: #42b983;
}
</style>
