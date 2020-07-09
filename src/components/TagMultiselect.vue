<template>
    <div>
        <multiselect :options="options"></multiselect>
    </div>
</template>

<script>
    import Multiselect from 'vue-multiselect'
    export default {
        components: {
            Multiselect
        },
        props: {
          options: Array
        },
        name: "TagMultiselect"
    }
</script>

<style scoped>

</style>
