<template>
  <div id="app">
    <div class="mt35">
    <tag-multiselect></tag-multiselect>
    </div>

    <div class="ui divider"></div>

  </div>
</template>

<script>
import TagMultiselect from "./components/TagMultiselect";
export default {
  name: 'App',
  components: {TagMultiselect}

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
