import Vue from 'vue'
import Router from 'vue-router'
import Manage from './pages/common/Manage'
import Test from './pages/common/Test'
import NotFound from './pages/common/404'  //404 未找到页面
import Login from './pages/login/index'  //404 未找到页面

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Manage',
            component: Manage,
        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        },
        {
            path: '/login', //登录
            name: 'login',
            meta: {
                title: '管理登陆',
                routeAuth: false
            },
            component: Login,
            display: 0
        },
        {
            path: '*', //其他页面，强制跳转到登录页面
            name: '通配路由',
            meta: {
                title: '抱歉未找到该页面',
                routeAuth: false
            },
            //redirect: '/login'
            component: NotFound,
            display: 0
        }
    ]
})

/**
 * 导出循环处理结果
 * @param menu 菜单
 * @param routes 路由
 * @returns {Array}
 */
export function sessionRouters(menu = [], routes = []) {
    routes = eachMenu(menu)
    return routes
}

/**
 * 导出过滤路由结果
 * @param old 原路由
 * @param routes 要过滤的路由
 */
export function filterRouters(old = [], routes = []) {
    if(old.length == 0 || routes.length == 0) return []
    var new_routes = []
    //for (let [index, route] of new Map(old.map((item, i) => [i, item]))) {}
    for (let route of old){
        for(let tmp of routes) {
            if(!route.id && route.id != tmp.id) {
                new_routes.push(route)
                break
            }
        }
    }
    return new_routes
}


