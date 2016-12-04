<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <h2 class="text-center">{{ $t('races.subtitle') }}</h2>
    <div class="row" v-for="race in races">
      <!-- LOGO -->
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-12">
        <div class="panel panel-default">
          <div class="panel-body">
            <img class="img-responsive" v-bind:src="'/uploads/' + race.logo">
          </div>
          <div class="panel-footer text-center">
            <h5>{{ race.title }}</h5>
          </div>
        </div>
      </div>
      <!-- MAP -->
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-12">
        <div class="panel panel-default">
          <div class="panel-body">
            {{ race.title }}
          </div>
        </div>
      </div>
      <!-- DAYS TO RUN / JOIN
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-12">
        <div class="panel panel-default">
          <div class="panel-heading">
            asd
          </div>
          <div class="panel-body">
            <div v-if="joinedRaces.includes(race._id)">
              Days to run
              <counter :race.sync="race"></counter>
            </div>
            <div v-else>
              Days to join
              <counter :race.sync="race"></counter>
            </div>
          </div>
        </div>
      </div>
      <!-- JOIN-->
      <days-to-run v-if="joinedRaces.includes(race._id)" :race.sync="race"></days-to-run>
      <date-of-run v-else :race.sync="race"></date-of-run>
      <!-- BIB -->
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-12">
        <div class="panel panel-default">
          <div class="panel-body text-center">
            <template v-if="!joinedRaces.includes(race._id)">{{ $t('races.list.joinTitle') }}</template>
            <bib v-if="joinedRaces.includes(race._id)" :race.sync="race" :joined-races.sync="joinedRaces" :next-runs.sync="nextRuns"></bib>
          </div>
          <div class="panel-footer text-center">
             <button v-show="joinedRaces.includes(race._id)" type="button" @click="leave(race)" class="btn btn-default">{{ $t('races.list.leave')}}</button>
             <button v-show="!joinedRaces.includes(race._id)" type="button" @click="join(race)" class="btn btn-default">{{ $t('races.list.join')}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DaysToRun from '../races/race-list/days-to-run.vue';
import DateOfRun from '../races/race-list/date-of-run.vue';
import Bib from '../races/race-list/bib.vue';

export default {
  name: 'RaceList',
  components: {
    DaysToRun, DateOfRun, Bib,
  },
  data() {
    return {
    };
  },
  props: {
    races: {
      type: Array,
      required: true,
    },
    joinedRaces: {
      type: Array,
      required: true,
    },
    nextRuns: {
      type: Object,
      required: true,
    },
  },
  methods: {
    join(race) {
      // pass to parent
      this.$emit('join', race);
    },
    leave(race) {
      this.$emit('leave', race);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
