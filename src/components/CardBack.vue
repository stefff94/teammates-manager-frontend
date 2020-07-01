<template>
    <div class="flip-card-back">
        <div class="ui card">
            <div class="content">
                <i class="right floated large x icon delete"></i>
                <div class="header text-center">Skills</div>
                <div class="description mt30">
                    <div class="ui bulleted list">
                        <div class="item"
                             v-for="skill in skills"
                             v-bind:key="skill.id">

                            {{ skill.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardBack",
        props: {
            skills: {
                type: Array
            },
            id: {
                type: Number
            }
        }
    }
</script>

<style scoped>

</style>
