<template>
    <div id="app" class="m20">
        <div class="mt35">
            <personal-data-form :teammate="newTeammate" :genders="genders" :roles="roles"></personal-data-form>
        </div>

        <div class="mt35 mb35">
            <tag-multiselect :options="skills" :teammate="newTeammate"></tag-multiselect>
        </div>

        <button class="ui button" @click="handleTeammate" :disabled="submitDisabled">Submit</button>
        <button class="ui button" @click="clearNewTeammate">Reset</button>

        <div class="ui error message mt30" v-if="newTeammate.errors.length > 0">
            <div class="header">
                <span>Issues</span>
            </div>
            <ul class="list">
                <li v-for="e in newTeammate.errors" v-bind:key="e">{{ e }}</li>
            </ul>
        </div>

        <div class="ui divider"></div>

    </div>
</template>

<script>
    import PersonalDataForm from "./components/PersonalDataForm";
    import TagMultiselect from "./components/TagMultiselect";
    import ApiService from "./services/api.service";
    import { avatars, avatarBaseUrl, genders, roles, rules } from "./variables";

    export default {
        name: 'App',
        components: {TagMultiselect, PersonalDataForm},
        mounted() {
            this.resetSelects();
        },
        computed: {
            submitDisabled() {
                let t = this.newTeammate;
                return !t.name.value || !t.gender.value || !t.email.value || !t.role.value || !t.city.value;
            }
        },
        data: function() {
            return{
                skills: [],
                newTeammate: {
                    name: {},
                    gender: {},
                    email: {},
                    city: {},
                    role: {},
                    skills: [],
                    errors: []
                },
                roles: roles,
                genders: genders,
                avatars: avatars,
                teammates: [],
                rules: rules
            }
        },
        methods: {
            handleTeammate(){
                if(typeof this.newTeammate.id === 'undefined')
                    this.insertTeammate()
            },
            insertTeammate() {
                if(this.teammateIsValid()) {
                    const avatarUrl = avatarBaseUrl
                        + this.avatars[this.newTeammate.gender.value][Math.floor(Math.random() * 3)];
                    const newTeammate = {
                        personalData: {
                            name: this.newTeammate.name.value,
                            role: this.roles.find(r => {
                                return r.id === this.newTeammate.role.value
                            }).name,
                            gender: this.newTeammate.gender.value,
                            photoUrl: avatarUrl,
                            email: this.newTeammate.email.value,
                            city: this.newTeammate.city.value
                        },
                        skills: this.newTeammate.skills
                    }
                    ApiService.insertTeammate(newTeammate)
                        .then((response) => {
                            newTeammate.id = response.data.id;
                            this.updateViewAfterInsert(newTeammate);
                        });
                }
            },
            teammateIsValid() {
                this.newTeammate.errors = [];
                let isValid = true;
                this.rules.forEach(r => {
                    this.newTeammate[r.property].error = false;
                    if(!r.reg.test(this.newTeammate[r.property].value)) {
                        this.newTeammate.errors.push("Please enter a correct value for field " + r.property);
                        this.newTeammate[r.property].error = true;
                        isValid = false;
                    }
                });
                return isValid;
            },
            updateViewAfterInsert(newTeammate) {
                this.teammates.push(newTeammate);
                this.clearNewTeammate();

                this.skills = [];
                this.getSkillsAndUpdateView();
            },
            getSkillsAndUpdateView(){
                let self = this;

                ApiService.getSkills()
                    .then( (result) => {
                        Object.keys(result).forEach((savedSkill) => {
                            let skill = {
                                code: result[savedSkill].name.substring(0, 2) + Math.floor((Math.random() * 10000000)),
                                name: result[savedSkill].name
                            }
                            self.skills.push(skill);
                        })
                    })
            },
            clearNewTeammate() {
                this.newTeammate.name = {};
                this.newTeammate.gender = {};
                this.newTeammate.email = {};
                this.newTeammate.role = {};
                this.newTeammate.city = {};
                this.newTeammate.skills = [];
                this.newTeammate.errors = [];
                this.resetSelects();
            },
            resetSelects() {
                global.$('.ui.dropdown').dropdown('clear');
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
        width: 70%;
        margin: auto!important;
    }
</style>
