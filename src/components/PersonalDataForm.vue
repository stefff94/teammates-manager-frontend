<template>
    <form class="ui form">
        <h3 class="ui dividing header">Teammate Data</h3>
        <div class="field">
            <label>Personal Data</label>
            <div class="three fields">
                <div class="field">
                    <input type="text" name="name" placeholder="Name">
                </div>
                <div class="field">
                    <input type="text" name="email" placeholder="E-mail">
                </div>
                <div class="field">
                    <select class="ui selection dropdown" id="gender-dropdown" v-model="teammate.gender.value">
                        <option value="" disabled selected>Gender</option>
                        <option v-for="g in genders" v-bind:key="g.id" v-bind:value="g.id">
                            {{ g.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </form>
</template>

<script>
    export default {
        name: "PersonalDataForm",
        props: {
            teammate: Object,
            genders: Array,
            roles: Array
        }
    }
</script>

<style scoped>

</style>
