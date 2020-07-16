<template>
    <form class="ui form">
        <h3 class="ui dividing header">Teammate Data</h3>
        <div class="field">
            <label>Personal Data</label>
            <div class="three fields">
                <div class="field" v-bind:class="teammate.name.error ? 'error' : ''">
                    <input type="text" name="name" placeholder="Name" v-model="teammate.name.value">
                </div>
                <div class="field" v-bind:class="teammate.email.error ? 'error' : ''">
                    <input type="text" name="email" placeholder="E-mail" v-model="teammate.email.value">
                </div>
                <div class="field">
                    <select class="ui selection dropdown gender-dropdown" id="gender-dropdown" v-model="teammate.gender.value">
                        <option value="" disabled selected>Gender</option>
                        <option v-for="g in genders" v-bind:key="g.id" v-bind:value="g.id">
                            {{ g.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="two fields">
                <div class="field" v-bind:class="teammate.city.error ? 'error' : ''">
                    <input type="text" name="city" placeholder="City" v-model="teammate.city.value">
                </div>
                <div class="field">
                    <select class="ui selection dropdown role-dropdown" id="role-dropdown" v-model="teammate.role.value">
                        <option value="" disabled selected>Role</option>
                        <option v-for="r in roles" v-bind:key="r.id" v-bind:value="r.id">
                            {{ r.name }}
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
