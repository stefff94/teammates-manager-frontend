<template>
    <form class="ui form">
        <h3 class="ui dividing header">Teammate Data</h3>
        <div class="field">
            <label>Personal Data</label>
        </div>
    </form>
</template>

<script>
    export default {
        name: "PersonalDataForm",
        props: {
            teammate: Object,
            genders: Array
        }
    }
</script>

<style scoped>

</style>
