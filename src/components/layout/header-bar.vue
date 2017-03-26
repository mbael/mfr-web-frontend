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
              <typeahead :placeholder="$t('header.search')" :data.sync="searchData" :template-name.sync="templateName" :template.sync="customTemplate" :on-hit="runSelect" match-start="false">
              </typeahead>
            </div>
          </form>
          <profile-bar></profile-bar>
        </div><!-- /.navbar-collapse -->
      </div><!-- /.container-fluid -->
    </nav>
  </header>
</template>

<script>
import Promise from 'bluebird';
import _ from 'lodash';
import Icon from 'vue-awesome';
import ProfileBar from '../layout/profile-bar.vue';
import {
  typeahead,
} from 'vue-strap';

import AuthService from '../../services/authentication.js';
import UsersService from '../../services/users.js';
import RacesService from '../../services/races.js';

export default {
  data() {
    return {
      searchData: [],
      auth: AuthService,
      users: [],
      races: [],
      templateName: 'custom',
      customTemplate: '<i class="fa fa-user" aria-hidden="true"></i><span style="margin-left: 5px;" v-html="item | highlight query"></span>',
    };
  },
  activate(done) {
    const self = this;
    done();

    return Promise.all([UsersService.get(this), RacesService.get(this)])
      .then(([users, races]) => {
        this.users = users.data;
        this.races = races.data;

        _.each(users.data, (user) => {
          self.searchData.push(`${user.firstName} ${user.lastName}`);
        });

        _.each(races.data, (race) => {
          self.searchData.push(`${race.title}`);
        });

        done();
      });
  },
  components: {
    Icon, typeahead, AuthService, ProfileBar,
  },
  methods: {
    runSelect(selected) {
      if (selected === 'Mór Fit Run') {
        this.$router.go({
          name: 'Run',
          params: {
            runId: '581732ad85e86a297fe65205',
          },
        });
      }
      if (selected === 'Balázs Mócsai') {
        this.$router.go({
          name: 'Profile',
          params: {
            userId: '581b89938d42173e4d24a9e9',
          },
        });
      }
    },
    logout: () => {
      AuthService.logout();
    },
  },
};
</script>

<style lang="scss" scoped>

.navbar-brand {
  img {
    width: 140px;
    height: 100%;
  }
}

/*
.avatar {
  display: inline-block;
  width: 40px;
  height: 40px;
}

<img class="avatar img-responsive img-circle" alt="Brand" src="/static/2016_09_27_bcd9ccf409332dad35b4517ef9904e63db2188b9_black_white_striped.png">

.dropdown {
  a {
    display: inline-block;
    // padding: 5px;
  }
}

*/

h1 {
  color: #42b983;
}
</style>
