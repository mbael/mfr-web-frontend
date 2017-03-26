<template>
  <!-- ALERT -->
  <alert :show.sync="alert.enabled" :type.sync="alert.style" placement="top-right" duration="2000" width="300px" dismissable>
    <!-- BAD DATA -->
    <template v-if="alert.type === 0">
      <strong>{{ $t('settings.success.header') }}</strong>
      <p>{{ $t('settings.success.body') }}</p>
    </template>
    <!-- SUCCESS -->
    <template v-if="alert.type === 1">
      <strong>{{ $t('settings.badData.header') }}</strong>
      <p>{{ $t('settings.badData.body') }}</p>
    </template>
  </alert>
  <!-- CONTAINER -->
  <div class="container-fluid">
    <!-- PROFILE -->
    <div class="col-xs-10 col-xs-offset-1 col-sm-5 col-md-6 col-lg-4 col-lg-offset-2">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Adatok módosítása</h3>
        </div>
        <div class="panel-body">
          <form-group :valid.sync="valid.all.profile">
            <!-- EMAIL -->
            <form-group :valid.sync="valid.email">
              <input-box :value.sync="email" :label="$t('settings.email')" type="email" required :placeholder="$t('settings.email')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-envelope-o" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- FIRSTNAME -->
            <form-group :valid.sync="valid.firstName">
              <input-box :value.sync="firstName" :label="$t('settings.firstName')" type="text" required :placeholder="$t('settings.firstName')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-user" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- LASTNAME -->
            <form-group :valid.sync="valid.lastName">
              <input-box :value.sync="lastName" :label="$t('settings.lastName')" type="text" required :placeholder="$t('settings.lastName')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-user" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <div class="form-group">
              <div class="container-fluid">
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <img class="avatar img-responsive img-circle" :src="avatar">
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label class="avatar-upload btn btn-default btn-file">
                    <span class="">{{ $t('settings.avatarBtn') }}</span>
                    <input @change="uploadAvatar" type="file" style="display: none;">
                  </label>
                </div>
              </div>
            </div>
          </form-group>
        </div>
        <div class="panel-footer">
          <div class="btn-group" role="group" aria-label="...">
            <button :disabled="!valid.all.profile" type="button" class="btn btn-default pull-right" @click="saveProfile">{{ $t('settings.button') }}</button>
          </div>
        </div>
      </div>
    </div>
     <!-- PASSWORD -->
    <div class="col-xs-10 col-xs-offset-1 col-sm-5 col-md-6 col-lg-4">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">Jelszó módosítása</h3>
        </div>
        <div class="panel-body">
          <form-group :valid.sync="valid.all.password">
            <!-- NEW PASSWORD -->
            <form-group :valid.sync="valid.password">
              <input-box :value.sync="password" :label="$t('settings.password')" type="password" required :placeholder="$t('settings.password')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-key" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
            <!-- NEW PASSWORD AGAIN -->
            <form-group :valid.sync="valid.passwordAgain">
              <input-box :value.sync="passwordAgain" :label="$t('settings.passwordAgain')" type="password" required :placeholder="$t('settings.passwordAgain')">
                <span slot="before" class="input-group-addon" id="basic-addon1">
                  <i class="fa fa-key" aria-hidden="true"></i>
                </span>
              </input-box>
            </form-group>
          </form-group>
        </div>
        <div class="panel-footer">
          <div class="btn-group" role="group" aria-label="...">
            <button :disabled="!valid.all.password" type="button" class="btn btn-default pull-right" @click="savePassword">{{ $t('settings.button') }}</button>
          </div>
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
  name: 'Settings',
  data() {
    return {
      // data bind
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      birthDate: '',
      avatar: '',
      password: '',
      passwordAgain: '',

      // alert
      alert: {
        enabled: false,
        style: '',
        type: '',
      },

      // validation
      valid: {
        all: {
          profile: false,
          password: false,
        },
        password: false,
        passwordAgain: false,
      },
    };
  },
  components: {
    alert, formGroup, inputBox,
  },
  route: {
    data() {
      return UserService
        .get(this)
        .then((response) => {
          // get values
          const {
            firstName,
            lastName,
            email,
            gender,
            birthDate,
            avatar,
          } = response.data;

          // set up values
          this.firstName = firstName;
          this.lastName = lastName;
          this.email = email;
          this.gender = gender;
          this.birthDate = birthDate;
          this.avatar = avatar;
          // set default
          if (avatar === '' || !avatar) {
            this.avatar = '/uploads/default.jpg';
          }

          if (avatar.indexOf('scontent') === -1 && avatar !== '') {
            // uploaded by us
            // check if it's not from facebook
            this.avatar = `/uploads/${avatar}`;
          }
        });
    },
  },
  methods: {
    saveProfile() {
      // get data
      const data = {
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
      };

      UserService
        .edit(this, data)
        .then(() => {
          this.setAlert(0, 'success');

          setTimeout(() => {
            this.$router.go({
              name: 'Runs',
            });
          }, 2000);
        })
        .catch(() => {
          this.setAlert(1, 'danger');
        });
    },
    savePassword() {
      // check passwords
      const {
        password,
        passwordAgain,
      } = this;

      const data = {
        password,
      };

      if (password !== passwordAgain) {
        return this.setAlert(1, 'danger');
      }

      UserService
        .edit(this, data)
        .then(() => {
          this.setAlert(0, 'success');

          setTimeout(() => {
            this.$router.go({
              name: 'Runs',
            });
          }, 2000);
        })
        .catch(() => {
          this.setAlert(1, 'danger');
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
    uploadAvatar(event) {
      const formData = new FormData();

      formData.append('avatar', event.target.files[0]);

      UserService
        .uploadAvatar(this, formData)
        .then(() => {
          this.setAlert(0, 'success');

          setTimeout(() => {
            this.$router.go({
              name: 'Runs',
            });
          }, 2000);
        })
        .catch(() => {
          this.setAlert(1, 'danger');
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.avatar-upload {
  display: inline-table; /* fixing label block */
  margin-left: 15px;
}

.avatar {
  min-width: 96px;
  width: 128px;
}

.input-group, .btn-group, p {
  margin: 8px;
}
h1 {
  color: #42b983;
}
</style>
