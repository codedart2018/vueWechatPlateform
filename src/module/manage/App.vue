<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'app',
    mounted() {

    },
    watch: {
      '$route' (to, from) {
        if(to.path == '/login') {

        }
      }
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  body, html {
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.96);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    bottom: 0px;
  }
</style>

