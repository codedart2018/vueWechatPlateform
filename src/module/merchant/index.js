import Vue from 'vue'
import App from './App'
import Router from './router.js' //路由地址
/* eslint-disable no-new */

new Vue({
    el: '#app',
    router: Router,
    template: '<App/>',
    components: {App}
})
