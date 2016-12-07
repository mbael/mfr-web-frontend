<template>
  <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <h2 class="text-center">{{ $t('races.subtitle') }}</h2>
    <row v-for="race in races"  @join="join" @leave="leave" :joined-races.sync="joinedRaces" :next-runs.sync="nextRuns" :race.sync="race"></row>
  </div>
</template>

<script>
import Row from '../RaceList/Row.vue';
import _ from 'lodash';

export default {
  name: 'RaceList',
  components: {
    Row,
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
