<template>
  <div id="app" class="m20" style="width: 70%; margin: auto!important;">

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

    <div class="ui error floating message mt35" v-if="errorLoadingTeammates">
      <div class="header">Error loading teammates</div>
      <p>Unable to load the teammates</p>
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
            .catch(() => {});
  },
  data() {
    return {
      teammates: [],
      errorLoadingTeammates: false
    }
  },
  methods: {
    async getAllTeammatesAndUpdateView() {
      let self = this;

      ApiService.getAllTeammates()
              .then(response => {
                response.data.forEach(teammate =>
                        self.teammates.push(teammate));
                self.errorLoadingTeammates = false;
              }).catch(() => self.errorLoadingTeammates = true);
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
