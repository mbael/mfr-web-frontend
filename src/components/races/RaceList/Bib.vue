<template>
  <div>
    {{ bibNumber }}
  </div>
</template>

<script>
import _ from 'lodash';
import UserService from '../../../services/user.js';

export default {
  data() {
    return {
      bibNumber: '',
      user: {},
    };
  },
  props: {
    joinedRaces: {
      type: Array,
      required: true,
    },
    nextRuns: {
      type: Object,
      required: true,
    },
    race: {
      type: Object,
      required: true,
    },
  },
  ready() {
    const getUserData = () =>
        UserService
          .get(this)
          .then(({ data }) => {
            this.user = data;
          })
          .then(() => {
            _.forEach(this.joinedRaces, (raceId) => {
              _.find(this.nextRuns[raceId].runners, (runner) => {
                if (runner.userId === this.user._id) {
                  this.bibNumber = runner.bib;
                }
              });
            });
          })
          .catch();

    return getUserData();
  },
};
</script>

<style lang="scss" scoped>

</style>
