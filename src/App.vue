<template>
    <header-bar></header-bar>
    <main>
      <router-view></router-view>
    </main>
    <footer-bar></footer-bar>
</template>

<script>
import HeaderBar from './components/layout/header-bar';
import FooterBar from './components/layout/footer-bar';

export default {
  components: {
    HeaderBar, FooterBar,
  },
  data: function data() {
    return {
      center: {
        lat: 1.38,
        lng: 20,
      },
    };
  },
  replace: false,
};
</script>

<style lang="scss">
body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

html {
  height: 100%;
}

main {
  padding: 20px 20px 20px 20px;
  flex: 1;
}

.navbar {
  margin: 0;
}
</style>
