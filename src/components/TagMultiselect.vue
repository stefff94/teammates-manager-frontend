<template>
    <div>
        <multiselect tag-placeholder="Add this as a new skill"
                     placeholder="Search or add a new skill"
                     label="name"
                     track-by="code"
                     :options="options"
                     :multiple="true"
                     :taggable="true">
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
                const skill = {
                    name: newSkill,
                    code: newSkill.substring(0, 2) + Math.floor(Math.random() * 10000000)
                }
                this.options.push(skill);
                this.teammate.skills.push(skill);
            }
        }
    }
</script>

<style scoped>

</style>
