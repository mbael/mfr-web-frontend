<template>
  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-12">
    <div class="panel panel-default">
      <div class="panel-heading text-center">
        {{ $t('races.list.daysToRun.title') }}
      </div>
      <div class="panel-body">
        <div class="counter-container container-fluid">
          <div class="countdown">
            <div class="container-fluid countdown-inner">
              <div class="row text-center">
                <h1 class="text text-number">
                  {{ daysToRun }}
                </h1>
              </div>
              <div class="row text-center">
                <h2 class="text text-unit">
                  {{ $t('races.list.daysToRun.countdownText') | uppercase }}
                </h2>
              </div>
            </div>       
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import ProgressBar from 'progressbar.js';

export default {
  name: 'DaysToRun',
  data() {
    return {
      daysToRun: '',
      countdown: {
        state: false,
        instance: false,
      },
    };
  },
  props: {
    race: {
      type: Object,
      required: true,
    },
  },
  watch: {
    'daysToRun'(days) {
      const {
        instance,
      } = this.countdown;

      if (this.countdown.state) {
        instance.text.innerHTML = days;
      }
    },
  },
  ready() {
    /*
      Calculate days until run
     */

    // get soonest run
    const runs = this.race.runs;
    const now = new Date();
    const runDates = [];

    _.forEach(runs, ({ date: runDate }) => {
      // filter older dates yet let actual day
      if (new Date(runDate) >= now || new Date(runDate).getDay() === now.getDay()) {
        runDates.push(runDate);
      }
    });

    // we got all run dates, sort it
    const sortedAr = _.sortBy(runDates, (rundate) => rundate);
    const soonestRun = sortedAr[0];

    // calculate diff
    const oneDay = 24 * 60 * 60 * 1000;
    const runDay = new Date(soonestRun);

    this.daysToRun = Math.round(Math.abs((runDay.getTime() - now.getTime()) / (oneDay)));

    /*
      Draw counter
     */

    let {
      instance: countdownInstance,
    } = this.countdown;

    const container = this.$el.querySelectorAll('div.countdown')[0];

    countdownInstance = new ProgressBar.Circle(container, {
      color: '#FFFFFF',
      text: {
        value: '',
      },
      strokeWidth: 4,
      trailWidth: 2,
      easing: 'easeInOut',
      duration: 1400,
      from: { color: '#FFFFFF', width: 2 },
      to: { color: '#FFFFFF', width: 4 },
      // Set default step function for all animate calls
      step(state, circle) {
        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);
      },
    });

    // bind countdown inner box
    const countdownInner = this.$el.querySelectorAll('div.countdown-inner')[0];

    // add custom dom element for text
    countdownInstance.text.appendChild(countdownInner);

    // tell vm when it can update days to run
    this.countdown.loaded = true;

    // calculate progress state // months
    const daysInMonth = (month, year) => new Date(year, month, 0).getDate();
    const run = _.find(this.race.runs, ({ date: runDate }) => runDate === soonestRun);

    const actualRunDate = new Date(run.date);

    const daysInThatMonth = daysInMonth(actualRunDate.getMonth(), actualRunDate.getYear());

    const percentage = this.daysToRun / daysInThatMonth * 100;

    // start
    countdownInstance.animate(percentage / 100);
  },
};
</script>

<style lang="scss" scoped>

.text-number {
  margin: 0;
  font-size: 44px;
}

.text-unit {
  margin: 0;
  font-size: 22px;
}

.panel-body {
  padding: 30px;
}

.counter-container {
  background-color: #ff7a73;
  border: 1px solid #ff7a73;
  border-radius: 10px;

  padding: 20px;
}
</style>
