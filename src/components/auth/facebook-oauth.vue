<template>
  <div class="container-fluid">
    <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
     {{ state }}
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/authentication.js';

export default {
  name: 'FacebookOauth',
  data() {
    return {
      auth: {
      },
    };
  },
  route: {
    data({ to: { query } }) {
      const router = this.$router;
      // facebook implicit code
      const {
        code,
      } = query;

      // route when code is absent
      if (!code) {
        router.go({
          name: 'Login',
        });
      } else {
        // send to server
        this.sendToken(code);
      }
    },
  },
  methods: {
    sendToken(code) {
      const router = this.$router;
      // auth service
      AuthService.loginWithFacebook(this, {
        code,
      })
        .then(() => {
          console.log(1);
          // redirect to runs component
          router.go({
            name: 'Runs',
          });
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h1 {
  color: #42b983;
}
</style>
