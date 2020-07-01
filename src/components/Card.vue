<template>
    <transition name="fade">
        <div class="flip-card">
            <div class="flip-card-inner">
                <card-front :data="person.personalData"></card-front>
                <card-back
                        :skills="person.skills"
                        :id="person.id"></card-back>
            </div>
        </div>
    </transition>
</template>

<script>
    import CardBack from "./CardBack";
    import CardFront from "./CardFront";

    export default {
        name: "Card",
        components: {
            CardBack,
            CardFront
        },
        props: {
            person: {
                type: Object
            }
        }
    }
</script>

<style scoped>

</style>
