<template>
<div class="container-fluid">
  <div class="col-xs-12 col-xs-offset-0 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">{{ $t('reset_password.title') }}</h3>
      </div>
      <div class="panel-body">
          <div class="input-group">
            <span class="input-group-addon" id="basic-addon1">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
            </span>
            <input v-model="email" type="text" class="form-control" placeholder="{{ $t('reset_password.email') }}" aria-describedby="basic-addon1">
          </div>
      </div>
      <div class="panel-footer">
        <div class="btn-group" role="group" aria-label="...">
          <button type="button" class="btn btn-default pull-right" @click="sendForm">{{ $t('reset_password.button') }}</button>
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
h1 {
  color: #42b983;
}
</style>
