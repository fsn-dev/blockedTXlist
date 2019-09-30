<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <TableList></TableList>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import TableList from './page/table/index.vue'

export default {
  name: 'app',
  components: {
    TableList
  },
  created() {
    document.title = this.$$.config.title
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
