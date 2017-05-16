import Vue from 'vue'
import App from './App'
import IView from 'iview'
import 'iview/dist/styles/iview.css' // 使用 IVIEW CSS
import './assets/style/common/common.less' // 定制公共 less
import Toast from '../../libs/toast/' // 定制吐司
import Util from '../../libs/util' // 工具
import '../../libs/filter' //过滤器
import Router from './router.js' //路由地址

Vue.use(Toast)
// Vue.use(Http)
Vue.use(IView)
Vue.config.productionTip = false

Router.beforeEach(({meta, path}, from, next) => {
    Util.title(meta.title);
    let auth = meta.routeAuth == false ? false : true
    //获取用户是否登陆
    let token = window.localStorage.getItem('token');
    console.log(token)
    if (auth && !token && path != '/login') {
        next({path: '/login'})
    } else if (path == '/login' && token) {
        next({path: '/'})
    }
    next()
})

new Vue({
    el: '#app',
    router: Router,
    template: '<App/>',
    components: {App}
})
