<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'app',
        components: {

        },
        watch: {
            '$route' (to, from) {
                // 对路由变化作出响应...
                //console.log(to,from)
            }
        }
    }
</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    body, html {
        width: 100%;
        height: 100%;
        background-color: #FFFFFF;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        bottom: 0px;
    }
</style>
