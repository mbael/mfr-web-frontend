<template>
<div class="col-xs-12 col-xs-offset-0 col-sm-12 col-xs-offset-0"><h1>{{ $t('runs.title') }}</h1></div>
<map style="width: 100%; height: 80%; min-height: 400px;" class="col-xs-12 col-xs-offset-0 col-sm-12 col-xs-offset-0" :center="{
  lat: 1.38, 
  lng: 103.8}" :zoom="12">
</map>
</template>

<script>
import {
  load,
  Map,
  Marker,
} from 'vue-google-maps';

load({
  key: 'AIzaSyBfoTVCpcqS9pj4f4tf-c7Ifen_XXZ3f3I',
});

export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
    };
  },
  components: {
    load, Map, Marker,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
