<template>
    <div>
        <multiselect v-model="teammate.skills"
                     tag-placeholder="Add this as a new skill"
                     placeholder="Search or add a new skill"
                     label="name"
                     track-by="id"
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
                let skill = this.options.find(s => s.name === newSkill);
                if(typeof skill === "undefined")
                    skill = {
                        name: newSkill,
                        id: newSkill.substring(0, 2) + Math.floor(Math.random() * 10000000)
                    }
                this.options.push(skill);
                this.teammate.skills.push(skill);
            }
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
