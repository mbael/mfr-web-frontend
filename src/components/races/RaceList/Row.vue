<template>
  <div class="row">
    <!-- LOGO -->
    <logo :race.sync="race"></logo>
    <!-- MAP -->
    <map :map-image="race.mapLogo"></map>
    <!-- JOIN // PROGRESS -->
    <days-to-run v-if="joinedRaces.includes(race._id)" :race.sync="race"></days-to-run>
    <date-of-run v-else :race.sync="race"></date-of-run>
    <!-- BIB -->
    <div class="col-xs-12 col-sm-12 col-md-3 col-lg-12">
      <div class="panel panel-default">
        <div class="panel-body text-center">
          <!-- TITLE IF NOT JOINED -->
          <span v-if="!joinedRaces.includes(race._id)">
            {{ $t('races.list.joinTitle') }}
          </span>
          <!-- BIB IF JOINED -->
          <bib v-if="joinedRaces.includes(race._id)" :race.sync="race" :joined-races.sync="joinedRaces" :next-runs.sync="nextRuns"></bib>
        </div>
        <div class="panel-footer text-center">
          <!-- JOIN BTN -->
           <button v-show="joinedRaces.includes(race._id)" type="button" @click="leave(race)" class="btn btn-default">
              {{ $t('races.list.leave')}}
            </button>
            <!-- LEAVE BTN -->
           <button v-show="!joinedRaces.includes(race._id)" type="button" @click="join(race)" class="btn btn-default">
              {{ $t('races.list.join')}}
           </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DaysToRun from '../RaceList/DaysToRun.vue';
import DateOfRun from '../RaceList/DaysToJoin.vue';
import Bib from '../RaceList/Bib.vue';
import Logo from '../RaceList/Logo.vue';
import Map from '../RaceList/Map.vue';

export default {
  name: 'Row',
  components: {
    DaysToRun, DateOfRun, Bib, Logo, Map,
  },
  data() {
    return {
    };
  },
  props: {
    race: {
      type: Object,
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
      console.log('yo');
      this.$emit('join', race);
    },
    leave(race) {
      console.log('yo');
      this.$emit('leave', race);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
