import Vue from 'vue'
import App from './App'
import Router from './router.js' //路由地址
import IView from 'iview' //Iview
import 'iview/dist/styles/iview.css' // 使用 IVIEW CSS
import './assets/style/common/customize.less' // 定制公共 less
import Util from '../../libs/util' // 工具

Vue.use(IView)
Vue.config.productionTip = false

Router.beforeEach(({meta, path}, from, next) => {
    Util.title(meta.title)
    next()
})

new Vue({
    el: '#app',
    router: Router,
    template: '<App/>',
    components: {App}
})
