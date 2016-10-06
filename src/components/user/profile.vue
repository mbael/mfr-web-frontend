<template>
<div class="container-fluid">
  <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{ $t('profile.title') }}</h3>
      </div>
      <div class="panel-body">
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
            </span>
            <input v-model="user.email" type="text" class="form-control" placeholder="{{ $t('login.email') }}" aria-describedby="basic-addon1" disabled>
          </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import user from '../../services/user.js';

export default {
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      user: '',
    };
  },
  activate: function act(done) {
    user.getData(this.$http)
      .then((account) => {
        this.logged_user = account;
        done();
      })
      .catch(() => {
        done();
      });
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-group, .btn-group, p {
  margin: 8px;
}
h1 {
  color: #42b983;
}
</style>
