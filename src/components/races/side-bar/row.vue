<template>
  <a class="sidebar-row list-group-item" @click="select(race)" href="#">
    <div class="row">
      <div class="leftside col-xs-4 col-sm-4 col-md-4">
        <i class="icon fa fa-map-marker fa-3x" aria-hidden="true"></i>
      </div>
      <div class="rightside col-xs-8 col-sm-8 col-md-8">
        <h6 class="title">{{ race.title }}</h6>
        <span class="info">{{ race.distance }} {{ $t('races.sidebar.info.unit') }} {{ latestRun | moment "YYYY/M/D" }}</span>
      </div>
    </div>
  </a>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'Row',
  data() {
    return {
    };
  },
  props: {
    race: {
      type: Object,
      required: true,
    },
  },
  methods: {
    select(race) {
      this.$emit('select', race);
    },
  },
  computed: {
    latestRun() {
      const runsOfRace = this.race.runs;
      // check if run available
      if (_.isEmpty(runsOfRace)) {
        return 'there is no event yet';
      }
      // get latest run date
      const latestRunDate = _.sortBy(runsOfRace, 'date')[0].date;

      return latestRunDate;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sidebar-row {
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 0;
}

.leftside {
  padding-left: 10px;
  padding-right: 0;
  width: 20%;

  .icon {
    color: red;
  }
}

.rightside {
  padding: 0;

  .title {
    font-weight: normal;
    display: inline-block;
    margin: 0px 0px 5px 0px;
  }

  .info {
    display: inline-block;
    font-size: 10px;
    color: gray;
  }
}
</style>
