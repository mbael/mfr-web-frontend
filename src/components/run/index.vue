<template>
  <div class="header text-center col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
    <h1>{{ race.title }}</h1>
  </div>
  <!-- Map -->
  <map class="map col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1" :center.sync="map.center" :zoom.sync="map.zoom">
    <marker :position.sync="race.map.markers.start"></marker>
    <marker :position.sync="race.map.markers.end"></marker>
    <polyline :path.sync="race.map.polyline"></polyline>
  </map>
  <div class="clearfix"></div>
  <!-- Tabpanel -->
  <div class="tabs col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
    <tabset :nav-style.sync="tabs.class" :active.sync="tabs.active">
      <!-- Details -->
      <tab :header="$t('run.tabs.details')">
        <p class="text-justify">{{ race.description }}</p>
      </tab>
      <!-- Contact -->
      <tab :header="$t('run.tabs.owner')">
        <div class="col-xs-4 col-sm-4 col-md-2 col-lg-1">
          <img v-if="owner.avatar" class="avatar img-circle img-responsive center-block" :src="'/uploads/' + owner.avatar">
          <i v-else class="fa fa-user fa-4x" aria-hidden="true"></i>
          <div class="owner">
            <a v-link="{ name: 'Profile', params: { userId: owner._id}}" title=""><p class="text-center">{{ owner.firstName }} {{ owner.lastName }}</p></a>
          </div>
        </div>
      </tab>
      <!-- Results -->
      <tab :header="$t('run.tabs.results')">
        <div id="people">
          <v-client-table :data="tableData" :columns="columns"></v-client-table>
        </div>
      </tab>
      <!-- Runners -->
      <tab :header="$t('run.tabs.runners')">
        <div class="runner text-center col-xs-2 col-sm-2 col-md-2 col-lg-1" v-for="runner in runners">
          <img v-if="runner.avatar" class="avatar img-responsive img-circle center-block" :src="runner.avatar">
          <i v-else class="text-center fa fa-user fa-4x" aria-hidden="true"></i>
          <p v-link="{ name: 'Profile', params: { userId: runner._id } }" class="runner-name text-center">{{ runner.firstName }} {{ runner.last_name }}</p>
        </div>
      </tab>
  </tabset>
  </div>
</template>

<script>
import {
  Map,
  Marker,
  Polyline,
} from 'vue-google-maps';

import {
  tabset,
  tabGroup,
  tab,
} from 'vue-strap';

import RunService from '../../services/runs.js';
import RacesService from '../../services/races.js';
import UsersService from '../../services/users.js';
import _ from 'lodash';

export default {
  data() {
    return {
      columns: ['position', 'name', 'gender', 'time'],
      tableData: [
        { position: 1, name: 'John', time: '15:20', gender: 'Male' },
        { position: 2, name: 'Jane', time: '16:40', gender: 'Female' },
        { position: 3, name: 'Susan', time: '20:26', gender: 'Female' },
        { position: 4, name: 'Chris', time: '21:20', gender: 'Male' },
        { position: 5, name: 'Dan', time: '23:48', gender: 'Male' },
      ],
      owner: {},
      run: {},
      race: {
        map: {
          polyline: [],
          markers: {
            start: { lat: 0, lng: 0 },
            end: { lat: 0, lng: 0 },
          },
        },
      },
      runners: [],
      tabs: {
        class: 'tabs nav-justified',
        active: 0,
      },
      map: {
        center: {
          lat: 10,
          lng: 10,
        },
        zoom: 16,
      },
    };
  },
  route: {
    activate(transition) {
      const selectedTab = transition.to.params.selectedTab;
      // check route and set tab
      switch (selectedTab) {
        case 'contact':
          this.tabs.active = 1;
          break;
        case 'results':
          this.tabs.active = 2;
          break;
        case 'runners':
          this.tabs.active = 3;
          break;
        default:
          this.tabs.active = 0;
      }
      transition.next();
    },
    data({ to: { params: { runId } } }) {
      return RunService
        .getById(this, runId)
        .then((response) => {
          // save requested run
          this.run = response.data;
          return this.run.raceId;
        })
        // get race
        .then((raceId) => RacesService.getById(this, raceId))
        .then((response) => {
          // save race connected to run
          this.race = response.data;
          this.map.center = this.race.map.coordinates;
        })
        // get runners
        .then(() => _.each(this.run.runners, (runner) => UsersService
          .getById(this, runner.userId)
          .then((response) => {
            this.runners.push(response.data);
          })
        ))
        // get owner
        .then(() => UsersService
          .getById(this, this.race.createdBy))
        .then((response) => {
          this.owner = response.data;
        })
        .catch((error) => console.log(error));
    },
  },
  components: {
    Map, Marker, Polyline,
    tabset, tabGroup, tab,
  },
};
</script>

<style scoped>

.runner-name {
  padding: 10px;
}

.runner {
  margin: 5px;
}

.avatar {
  max-width: 64px;
  min-width: 64px;
}

.tabs {
  padding: 0;
}

.header {
  padding: 0;
}

.map {
  height: 500px; 
  min-height: 500px;
  padding: 0;
}

h1 {
  color: #42b983;
}
</style>
