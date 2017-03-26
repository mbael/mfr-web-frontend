<template>
  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-12">
    <div class="panel panel-default">
      <div class="panel-heading text-center">
        {{ $t('races.list.dateOfRun.title') }}
      </div>
      <div class="panel-body text-center">
        <div class="calendar-stack fa-5x">
          <i class="fa fa-calendar-o"></i>
          <span class="calendar-day">{{ nextRun.date | moment 'D' }}</span>
        </div>
      </div>
  </div>
</template>

<script>

export default {
  name: 'DaysToJoin',
  data() {
    return {
      nextRun: {},
    };
  },
  props: {
    race: {
      type: Object,
      required: true,
    },
  },
  computed: {
    /*nextRun() {
      return this.race.nextRun;
    },*/
  },
  watch: {
    'race.nextRun'(val) {
      this.nextRun = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-body {
  padding: 0 0 20px 0;
}
.calendar-stack {
    position: relative;
    display: inline-block;
    width: (13em / 14);
    height: 1em;

    .icon-calendar-empty,
    .calendar-day {
        position: absolute;
    }

    .calendar-day {
        top: (7em / 8);
        left: (1em / 8);
        width: (11em / 8);
        height: (6em / 8);
        font-family: sans-serif;
        font-size: (8em / 14);
        font-weight: 700;
        line-height: (18em / 14);
        text-align: center;
    }
}
</style>
