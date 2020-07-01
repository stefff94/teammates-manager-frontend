<template>
  <div id="app">

    <div class="ui divider"></div>

    <h2 class="ui center aligned icon header">
      <i class="circular users icon"></i>
      Teammates
    </h2>

    <div class="ui three column stackable grid mt35">
      <card class="column"
            v-for="teammate in teammates"
            :person="teammate"
            v-bind:key="teammate.id"
            style="margin-bottom: 20px!important;"></card>
    </div>

  </div>
</template>

<script>
import Card from "./components/Card";

export default {
  name: 'App',
  components: {
    Card
  },
  data() {
    return {
      teammates: []
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
