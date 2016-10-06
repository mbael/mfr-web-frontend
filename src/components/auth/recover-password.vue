<template>
<div class="container-fluid">
  <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{ $t('recover_password.title') }}</h3>
      </div>
      <div class="panel-body">
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
            </span>
            <input v-model="password" type="password" class="form-control" placeholder="{{ $t('recover_password.password') }}" aria-describedby="basic-addon1">
          </div>
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">
              <i class="fa fa-key" aria-hidden="true"></i>
            </span>
            <input v-model="passwordAgain" type="password" class="form-control" placeholder="{{ $t('recover_password.passwordAgain') }}" aria-describedby="basic-addon1">
          </div>
      </div>
      <div class="panel-footer">
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default pull-right" @click="sendForm">{{ $t('recover_password.button') }}</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-group, .btn-group, p {
  margin: 8px;
}
</style>
