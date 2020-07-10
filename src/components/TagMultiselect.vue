<template>
    <div>
        <multiselect tag-placeholder="Add this as a new skill"
                     placeholder="Search or add a new skill"
                     label="name"
                     track-by="code"
                     :options="options"
                     :multiple="true"
                     :taggable="true"
                     @tag="addSkill">
        </multiselect>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    export default {
        components: {
            Multiselect
        },
        props: {
            options: Array,
            teammate: Object
        },
        name: "TagMultiselect",
        methods: {
            addSkill(newSkill){
            }
        }
    }
</script>

<style scoped>

</style>
