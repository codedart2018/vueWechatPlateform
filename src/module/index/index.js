import Vue from 'vue'
import App from './App'
import Router from './router.js' //路由地址
import IView from 'iview' //Iview
import 'iview/dist/styles/iview.css' // 使用 IVIEW CSS
import './assets/style/common/customize.less' // 定制公共 less

Vue.use(IView)
/* eslint-disable no-new */

new Vue({
    el: '#app',
    router: Router,
    template: '<App/>',
    components: {App}
})
