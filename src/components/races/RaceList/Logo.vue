<template>
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
</template>

<script>
export default {
  name: 'Logo',
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
};
</script>

<style lang="scss" scoped>

</style>
