<template>
  <div class="sidebar col-xs-4 col-sm-4 col-md-2 col-lg-1">
    <div class="list-group">
      <div class="list-group-item-heading">
        <h4 class="header">{{ $t('races.sidebar.title')}}</h4>
      </div>
      <row class="item" v-for="race in races" @select="select" :race.sync="race"></row>
    </div>
  </div>
</template>

<script>
import Row from '../side-bar/row.vue';

export default {
  name: 'SideBar',
  data() {
    return {
    };
  },
  props: {
    races: {
      type: Array,
      required: true,
    },
  },
  components: {
    Row,
  },
  methods: {
    select(race) {
      this.$emit('select', race);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.sidebar {
  background-color: white;
  border: 1px solid black;
  border-left-width: 0;
  border-top-width: 0;
  min-height: 90%;
  min-width: 180px;
  max-width: 20%;
  padding: 0px;

  .header {
    margin-left: 10px;
    padding: 0px;
  }
}
</style>
