<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'ransomwatch'
  }
</script>

<style lang = 'scss'>

  #app {

  	margin-top: 0;
    background-color: black;
    color: white;
  }
  .row {
  	width: 100%;
  	margin-right: 0 !important;
  	margin-left: 0 !important;
  }

  @import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
</style>
