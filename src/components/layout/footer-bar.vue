<template>
<footer>
  <nav class="navbar-default">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
        <div class="form-group">
          <form class="navbar-form navbar-left">
            <ul class="list-group">
              <li class="list-group-item disabled">About us</li>
              <a v-link="{ name: 'Who' }">
                <li class="list-group-item">What is Mór Fit Run?</li>
              </a>
              <a v-link="{ name: 'How' }">
                <li class="list-group-item">How it works?</li>
              </a>
              <a v-link="{ name: 'Application' }">
                <li class="list-group-item">Mobile app</li>
              </a>
            </ul>
          </form>
          <form class="navbar-form navbar-left">
            <ul class="list-group">
              <li class="list-group-item disabled">Community</li>
              <li class="list-group-item">Gallery</li>
              <li class="list-group-item">Follow us on Facebook</li>
              <li class="list-group-item">Follow us on Twitter</li>
              <li class="list-group-item">Follow us on Instagram</li>
              <li class="list-group-item">Blog</li>
            </ul>
          </form>
          <form class="navbar-form navbar-left">
            <ul class="list-group">
              <li class="list-group-item disabled">International</li>
              <li class="list-group-item" @click="changeLanguage('en')">English</li>
              <li class="list-group-item" @click="changeLanguage('hu')">Magyar</li>
            </ul>
          </form>
          <form class="navbar-form navbar-right">
            <div class="container-fluid">
              <div class="row">
                <img class="img-responsive" alt="Brand" src="http://morfitrun.com/images/header-logo.png">
              </div>
              <div class="row">
                © 2016 Mor Fit Run
              </div>
              <div class="row">
                All rights reserved
              </div>
            </div>
          </form>
        </div>
      </div><!-- /.navbar-collapse -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
    </div><!-- /.container-fluid -->
  </nav>
</footer>
</template>

<script>
import Icon from 'vue-awesome';

export default {
  data() {
    return {
    };
  },
  components: {
    Icon,
  },
  methods: {
    changeLanguage(lang) {
      this.$locale.change(lang);
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar-static-bottom {
  border-radius: 0;
  z-index: 1000;
  border-width: 0 0 1px;
  padding-right: 0;
  padding-left: 0;
  margin: 20px 0 0;
  position: absolute;
  bottom: 0;
}

footer {
  border-top: 1px solid #e7e7e7;
}
</style>
