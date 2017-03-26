<template>
  <div class="infowindow container-fluid">
    <div class="row">
      <div class="racetitle col-md-8 text-left">
        <span class="text">
          {{ selectedRace.title }}
        </span>
      </div>
      <div class="join col-md-4 text-right">
        <button class="btn btn-sm btn-default" type="button" v-show="!joinedRaces.includes(selectedRace._id)" @click="join(selectedRace)">{{ $t('races.infowindow.join') }}</button>
        <button class="btn btn-sm btn-danger" type="button" v-show="joinedRaces.includes(selectedRace._id)" @click="leave(selectedRace)">{{ $t('races.infowindow.leave') }}</button>
      </div>
    </div>
    <div class="row">
      <div class="info col-md-6 text-left">
        <span class="text">
          {{ info }}
        </span>
      </div>
      <div class="date col-md-6 text-right">
        <span class="text">
          {{ nextRun.date | moment "YYYY/M/d" }}
        </span>
      </div>
    </div>
    <div class="row">
      <div class="recorder col-md-6">
        placeholder
      </div>
      <div class="record col-md-6">
        placeholder
      </div>
    </div>
    <div class="row">
      
    </div>
    <div class="row">
      <div class="follow col-md-6">
        <button type="button" v-show="!followedRaces.includes(selectedRace._id)" @click="follow(selectedRace)" class="btn btn-default">{{ $t('races.infowindow.follow') }}</button>
        <button type="button" v-show="followedRaces.includes(selectedRace._id)" @click="unfollow(selectedRace)" class="btn btn-default">{{ $t('races.infowindow.unfollow') }}</button>
      </div>
      <div class="favourite col-md-6">
        <button type="button" @click="favourite(selectedRace)" class="btn btn-default">{{ $t('races.infowindow.favourite') }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'InfoWindow',
  data() {
    return {
    };
  },
  methods: {
    join(selectedRace) {
      this.$emit('join', selectedRace);
    },
    leave(selectedRace) {
      this.$emit('leave', selectedRace);
    },
    follow(selectedRace) {
      this.$emit('follow', selectedRace);
    },
    unfollow(selectedRace) {
      this.$emit('unfollow', selectedRace);
    },
    favourite(selectedRace) {
      this.$emit('favourite', selectedRace);
    },
  },
  props: {
    selectedRace: {
      type: Object,
      required: true,
    },
    joinedRaces: {
      type: Array,
      required: true,
    },
    followedRaces: {
      type: Array,
      required: true,
    },
    nextRun: {
      type: Object,
      required: true,
    },
  },
  computed: {
    info() {
      // TODO language & conversion km, mile
      return `${this.selectedRace.distance} Monthly`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.row {
  div {
    padding: 0px;
  }
}

.infowindow {
  margin: 10px;

  .racetitle {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px;
    font-weight: 400;
  }

  .join {
    padding: 0px;
  }
}
</style>
