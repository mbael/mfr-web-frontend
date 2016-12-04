<template>
  <div class="container-fluid">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <div class="runs-map"></div>
    </div>
    <race-list @join="joinRace" @leave="leaveRace" :races.sync="races" :joined-races.sync="joinedRaces" :next-runs.sync="raceIdsWithNextRun" :user.sync="user"></race-list>
    <side-bar class="runs-sidebar" v-show="map.loaded" @select="selectRace" :nextRuns.sync="raceIdsWithNextRun" :races.sync="races"></side-bar>
    <info-window class="runs-infowindow" v-show="infoWindow.active" @join="joinRace" @leave="leaveRace" @follow="followRace" @unfollow="unfollowRace" @favourite="favouriteRace" @unfavourite="unfavouriteRace" :next-run.sync="raceIdsWithNextRun[selectedRace._id]" :selected-race.sync="selectedRace" :joined-races="joinedRaces">
    </info-window>
  </div>
</template>

<script>
import SideBar from '../races/side-bar/index.vue';
import InfoWindow from '../races/info-window.vue';
import RaceList from '../races/race-list.vue';
import RacesService from '../../services/races.js';
import UserService from '../../services/user.js';

import {
  tabset,
  tabGroup,
  tab,
} from 'vue-strap';

import google from 'google';
import _ from 'lodash';

export default {
  name: 'Races',
  data() {
    return {
      test: 'pelda',
      user: {},
      races: [],
      runs: [],
      raceIdsWithNextRun: {},
      joinedRaces: [],
      runsGroupedByRaceId: {},
      map: {
        center: {
          lat: 47.555708,
          lng: 18.638306,
        },
        zoom: 9,
        // store gmap object
        instance: {},
        // to know when to show sidebar (map fully loaded)
        loaded: false,
      },
      // store all infowindow
      infoWindows: [],
      // store all markers
      markers: [],
      infoWindow: {
        active: false,
      },
      selectedRace: {},
    };
  },
  route: {
    data() {
      /*
        Get user data
      */
      const getUserData = () =>
        UserService
          .get(this)
          .then(({ data }) => {
            // set logged user data in vm
            this.user = data;
          })
          // resolve when error too
          .catch(() => Promise.resolve());

      /*
        Get all races
      */
      const getAllRaces = () =>
        RacesService
          .get(this)
          .then(({ data }) => {
            // set all races data in vm
            this.races = data;
          });

      /*
        Get runs based on raceid
      */
      const getRunsByRaceId = (raceId) =>
        RacesService
          .getRuns(this, raceId)
          .then(({ data }) => {
            // store all runs referenced by raceId
            this.runsGroupedByRaceId[raceId] = data;
          });

      /*
        Get all runs from all races
       */
      const getAllRuns = () => {
        const allRuns = [];

        // get all available races ids & get runs based on them
        _.forEach(this.races, ({ _id: raceId }) => {
          allRuns.push(getRunsByRaceId(raceId));
        });

        return Promise.all(allRuns);
      };

      /*
        Filter // sort runs to get the closest actual one
       */
      const getLatestRun = () => {
        _.forEach(this.runsGroupedByRaceId, (runs, raceId) => {
          // get all dates
          const runDates = [];
          const now = new Date();

          _.forEach(runs, ({ date: runDate }) => {
            // filter older dates yet let actual day
            if (new Date(runDate) >= now || new Date(runDate).getDay() === now.getDay()) {
              runDates.push(runDate);
            }
          });

          // we got all run dates, sort it
          const sortedAr = _.sortBy(runDates, (rundate) => rundate);
          // find whichever run it's connected to
          const goodRun = _.find(runs, ({ date }) => date === sortedAr[0]);
          // set
          this.raceIdsWithNextRun[raceId] = goodRun;
        });
      };

      /*
        Set joined races from user
       */
      const getJoinedRaces = () => {
        const userJoinedRuns = this.user.joined;

        // make sure we check with latest run
        // we do not care older runs
        // we have new cycle everytime a run has been made
        _.forEach(this.raceIdsWithNextRun, ({ _id: runId }, raceId) => {
          // search 'latest' runid in userjoinedruns
          const match = _.includes(userJoinedRuns, runId);

          // store race state
          if (match) {
            this.joinedRaces.push(raceId);
          }
        });
      };

      return Promise
        // get logged user & available races
        .all([getUserData(), getAllRaces()])
        // get all runs from races
        .then(getAllRuns)
        // connect latest run to raceid
        .then(getLatestRun)
        // set joined
        .then(getJoinedRaces)
        // drawmap
        .then(() => {
          return new Promise((resolve) => {
            // register map
            this.map.instance =
            new google.maps.Map(document.getElementsByClassName('runs-map')[0], {
              zoom: this.map.zoom,
              center: this.map.center,
              disableDefaultUI: true,
              scrollwheel: false,
            });

            // register for resize // set center
            google.maps.event.addDomListener(window, 'resize', () => {
              this.map.instance.setCenter(this.map.center);
            });

            google.maps.event.addListenerOnce(this.map.instance, 'idle', () => {
              this.map.loaded = true;
            });

            // register sidebar control
            const sidebarDiv = document.getElementsByClassName('runs-sidebar')[0];
            this.map.instance.controls[google.maps.ControlPosition.LEFT_TOP].push(sidebarDiv);

            // register infowindows & markers
            _.forEach(this.races, (race) => {
              // registering markers
              const marker = new google.maps.Marker({
                position: race.map.coordinates,
                map: this.map.instance,
                raceTitle: race.title,
              });

              // registering infowindow
              const infoWindow = new google.maps.InfoWindow({
                content: document.getElementsByClassName('runs-infowindow')[0],
                raceTitle: race.title,
              });

              // store them in vm
              this.infoWindows.push(infoWindow);
              this.markers.push(marker);
            });
            resolve();
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  methods: {
    selectRace(selected) {
      // todo move this to infowindow logics
      // infowindow component should tell & handle own dependencies
      // find the good infowindows & markers
      const infoWindow = _.find(this.infoWindows, (iw) => iw.raceTitle === selected.title);
      const marker = _.find(this.markers, (m) => m.raceTitle === selected.title);

      this.selectedRace = selected;

      if (infoWindow && marker) {
        // clean
        _.forEach(this.infoWindows, (iw) => {
          // close if last one is already selected
          iw.close();
        });

        this.infoWindow.active = true;
        infoWindow.open(this.map.instance, marker);
      }

      /*
      if (infoWindow && marker) {
        _.forEach(this.infoWindows, (iw) => {
          // close if another is already selected
          iw.close();
        });
        infoWindow.open(this.map.instance, marker);
      }*/
    },
    joinRace({ _id: raceId }) {
      const runId = this.raceIdsWithNextRun[raceId]._id;
      this.joinedRaces.push(raceId);
      /*
      return RunService
        .addRunner(this, runId)
        .then(({ data }) => {

        });*/
    },
    leaveRace({ _id: raceId }) {
      const runId = this.raceIdsWithNextRun[raceId]._id;
      this.joinedRaces.$remove(raceId);
    },
    followRace() {
       alert(this.selectedRace.title);
    },
    favouriteRace() {
       alert(this.selectedRace.title);
    },
  },
  components: {
    Map, SideBar, InfoWindow, RaceList,
    tabset, tabGroup, tab,
  },
};
</script>

<style lang="scss" scoped>
.runs-map {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  min-height: 400px;

  border: 1px solid #7f8c8d;
}

.runs-sidebar {

}

.infowindow-title {
  display: inline-block;
  font-weight: bold;
  margin: 5px;
}

.infowindow-join {
  display: inline-block;
  margin: 5px;
}

h1 {
  color: #42b983;
}

</style>
