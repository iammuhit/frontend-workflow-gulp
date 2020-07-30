<template>
    <div id="vue-example">
        {{ message }}
    </div>
</template>

<script>
    module.exports = {
        mounted() {
            console.log('Vue component mounted.')
        },
        data() {
            return {
                message: 'Vue Component Example!'
            };
        }
    };
</script>

<style>
    #vue-example {
        font-size: 18px;
        font-family: 'Roboto', sans-serif;
        color: #333;
        text-align: center;
    }
</style>