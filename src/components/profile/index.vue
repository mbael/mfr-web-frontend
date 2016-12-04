<template>
  <div class="container-fluid">
    <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">{{ $t('profile.overall.header') }}</h3>
        </div>
        <div class="panel-body">
          <div class="col-xs-5 col-sm-5 col-md-5 col-lg-6">
            <img class="img-responsive img-circle" :src="user.avatar">
          </div>
          <div class="col-xs-5 col-sm-7 col-md-7 col-lg-6">
            <select @change="changeGraph" v-model="selectedRun" class="selectpicker">
              <option v-for="run in userRuns" v-bind:value="run.title">{{run.title}}</option>
            </select>
            <canvas id="graph" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{ $t('profile.achievements.header') }}</h3>
      </div>
      <div class="panel-body">
        
      </div>
    </div>
  </div>
</template>

<script>
import UsersService from '../../services/users.js';
import RunService from '../../services/runs.js';
import RacesService from '../../services/races.js';
import Chart from 'chart.js';
import _ from 'lodash';

export default {
  name: 'Profile',
  methods: {
    changeGraph() {
      if (this.selectedRun === 'Sziget Fit Run') {
        this.$set('line.data', {
          datasets: [{
            label: 'Sziget Fit Run',
            data: [{
              x: -10,
              y: 0
            }, {
              x: 0,
              y: 10,
            }, {
              x: 10,
              y: 5,
            }, {
              x: 50,
              y: 10,
            }],
          }],
        });
      } else {
        this.$set('line.data', {
          datasets: [{
            label: 'Mór Fit Run',
            data: [{
              x: -10,
              y: 0
            }, {
              x: 0,
              y: 10
            }, {
              x: 10,
              y: 5
            }],
          }],
        });
      }
      this.chart.update();
    },
  },
  data() {
    return {
      selectedRun: '',
      userRuns: [{
        title: 'Mór Fit Run',
      }, {
        title: 'Sziget Fit Run',
      }],
      user: {},
      chart: {},
      line: {
        type: 'line',
        data: {
          datasets: [{
            label: 'Mór Fit Run',
            data: [{
              x: -10,
              y: 0
            }, {
              x: 0,
              y: 10
            }, {
              x: 10,
              y: 5
            }],
        }],
    },
    options: {
      scales: {
        xAxes: [{
            type: 'linear',
            position: 'bottom'
        }],
      },
    },
      },
    };
  },
  route: {
    data({ to: { params: { userId } } }) {
      const getUserData = () => UsersService
        .getById(this, userId)
        .then((response) => {
          this.user = response.data;
          const avatar = this.user.avatar;

          if (avatar === '' || !avatar) {
            this.user.avatar = '/uploads/default.jpg';
          }

          if (avatar.indexOf('scontent') === -1 && avatar !== '') {
            // uploaded by us
            // check if it's not from facebook
            this.user.avatar = `/uploads/${avatar}`;
          }
        });

      getUserData()
        .then(() => RunService.get(this).then((response) => response.data))
        // sort out user
        .then((runs) => {
          _.forEach(runs, (run) => {
            // we are in a run
            // find user
            const runOfUser = _.find(run.results, (runners) => runners.userId === this.user._id);
            runOfUser.raceId = run.raceId;
          });
        });
    },
  },
  ready() {
    const ctx = document.getElementById('graph');
    const chart = new Chart(ctx, this.line);

    this.chart = chart;
  },
};
</script>

<style lang="scss" scoped>
.input-group, .btn-group, p {
  margin: 8px;
}
</style>
