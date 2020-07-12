<template>
  <div id="app" class="m20" style="width: 70%; margin: auto!important;">

    <div class="ui divider"></div>

    <h2 class="ui center aligned icon header">
      <i class="circular users icon"></i>
      Teammates
    </h2>

    <div class="ui three column stackable grid mt35" v-if="!errorLoadingTeammates">
      <card class="column"
            v-for="teammate in teammates"
            :person="teammate"
            v-bind:key="teammate.id"
            @delete="deleteTeammate"
            @update="populateNewTeammateForUpdate"
            style="margin-bottom: 20px!important;"></card>
    </div>

    <div class="ui error floating message mt35" v-if="errorLoadingTeammates">
      <div class="header">Error loading teammates</div>
      <p>Unable to load the teammates</p>
    </div>

    <div class="ui error floating message mt35" v-if="errorDeletingTeammate">
      <div class="header">Error deleting teammate</div>
      <p>Unable to delete the teammate</p>
    </div>

  </div>
</template>

<script>
import Card from "./components/Card";
import ApiService from "./services/api.service";

export default {
  name: 'App',
  components: {
    Card
  },
  mounted() {
    this.getAllTeammatesAndUpdateView()
            //.catch(() => {});
  },
  data() {
    return {
      newTeammate: null,
      teammates: [],
      errorLoadingTeammates: false,
      errorDeletingTeammate: false
    }
  },
  methods: {
    getAllTeammatesAndUpdateView() {
      let self = this;

      ApiService.getAllTeammates()
              .then(response => {
                response.data.forEach(teammate =>
                        self.teammates.push(teammate));
                self.errorLoadingTeammates = false;
              }).catch(() => self.errorLoadingTeammates = true);
    },
    deleteTeammate(id) {
      let self = this;

      ApiService.deleteTeammate(id)
              .then(() => {
                self.updateViewAfterDelete(id);
                self.errorDeletingTeammate = false;
              }).catch(() => self.errorDeletingTeammate = true);
    },
    updateViewAfterDelete(id) {
      this.teammates.splice(
              this.teammates.findIndex(t => t.id === id), 1);
    },
    populateNewTeammateForUpdate(id) {
      let self = this;
      this.teammates.find(teammate => {
        if (teammate.id === id) {
          self.newTeammate = {
            name: {
              value: teammate.personalData.name
            },
            gender: {
              value: teammate.personalData.gender
            },
            email: {
              value: teammate.personalData.email
            },
            city: {
              value: teammate.personalData.city
            },
            role: {
              value: teammate.personalData.role
            },
            skills: teammate.skills
          }
        }
      });
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
