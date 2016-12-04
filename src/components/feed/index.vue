<template>
  <div class="header text-center col-xs-12 col-xs-offset-0 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
   feed
  </div>
</template>

<script>

import {
  tabset,
  tabGroup,
  tab,
} from 'vue-strap';

export default {
  data() {
    return {};
  },
  route: {
    activate(transition) {
      transition.next();
    },
    data() {
    },
  },
  components: {
    tabset, tabGroup, tab,
  },
};
</script>

<style scoped>

.runner-name {
  padding: 10px;
}

.runner {
  margin: 5px;
}

.avatar {
  max-width: 64px;
  min-width: 64px;
}

.tabs {
  padding: 0;
}

.header {
  padding: 0;
}

.map {
  height: 500px; 
  min-height: 500px;
  padding: 0;
}

h1 {
  color: #42b983;
}
</style>
