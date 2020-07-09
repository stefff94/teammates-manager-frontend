<template>
  <div id="app">
    <div class="mt35">
      <personal-data-form></personal-data-form>
    </div>

    <div class="ui divider"></div>

  </div>
</template>

<script>

import PersonalDataForm from "./components/PersonalDataForm";
export default {
  name: 'App',
  components: {PersonalDataForm}
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
