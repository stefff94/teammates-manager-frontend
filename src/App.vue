<template>
  <div id="app">
    <personal-data-form :teammate="newTeammate" :genders="genders" :roles="roles"></personal-data-form>
    <div class="ui divider"></div>

  </div>
</template>

<script>
import PersonalDataForm from "./components/PersonalDataForm";
export default {
  name: 'App',
  components: {PersonalDataForm},
  data: function() {
    return{
      newTeammate: {
        name: {},
        gender: {},
        email: {},
        city: {},
        role: {}
      },
      roles: [
        {id: 'R1', name: 'Student'},
        {id: 'R2', name: 'Frontend developer'},
        {id: 'R3', name: 'Backend developer'},
        {id: 'R4', name: 'Full Stack developer'},
        {id: 'R5', name: 'Analyst Programmer'},
      ],
      genders: [
        {id: 'M', name: 'Male'},
        {id: 'F', name: 'Female'}
      ]
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
