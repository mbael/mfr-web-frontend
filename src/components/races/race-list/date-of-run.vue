<template>
  <div class="col-xs-12 col-sm-12 col-md-3 col-lg-12">
    <div class="panel panel-default">
      <div class="panel-heading text-center">
        {{ $t('races.list.dateOfRun.title') }}
      </div>
      <div class="panel-body text-center">
        <span></span>
        <i class="fa fa-5x fa-calendar" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DateOfRun',
  components: {

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
  },
};
</script>

<style lang="scss" scoped>

</style>
