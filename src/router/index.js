import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

/**
 * 获取token
 */
let token = window.localStorage.getItem('token')
if(token) {
    //取出菜单
    let mainMenu = window.localStorage.getItem('mainMenu')
    var Menu = mainMenu ? typeof (JSON.parse(mainMenu) == "object") ? JSON.parse(mainMenu) : [] : []
} else {
    var Menu = []
}

/**
 * 默认路由 带后台取出的路由
 * 后端取出来必须要有name 不然编程式导航会找不到路径 默认路由里不会存在id的 只有后台取出的路由才会带有ID ID还有个方法过虑追加路由使用，本身比对字符串不知道为什么有问题，导致过滤不了
 * @type {[*]}
 */
const router =[
    {
        path: '/',
        name: 'Hello',
        component: Hello
    },
    ...sessionRouters(Menu)
]

/**
 * 后置追加路由 注通配路由应该最后加入
 * @type {[*]}
 */
const afterRouter = [

]
export default new Router({
    //这里从后台取出路由来
    routes: router.concat(afterRouter)
})

/**
 * 动态循环菜单
 * @param menu 菜单
 * @param routes 路由
 * @returns {Array}
 * todo 后期来处理一级导航可以不填组件地址
 */
function eachMenu(menu = [], routes = []) {
    if(menu.length <= 0) return routes
    for (let item of menu){
        if(item.path && item.component) {
            let arr = {
                id: item.id,
                icon: item.icon,
                name: item.name,
                pid: item.pid,
                path: item.path,
                url: item.url,
                display: item.display,
                component: resolve => require([`${item.component}`], resolve)
            };
            
            //参数处理 todo 之前理解错了 地址栏参数获取是query
            if(item.params) {
                let last_str = item.path.charAt(item.path.length - 1);
                let tmp_str = ''
                for(let p of item.params.split(",")) {
                    tmp_str += "/:" + p + "?"
                }
                if(last_str == "/") {
                    arr.path = arr.path + tmp_str.substr(1)
                } else {
                    arr.path = arr.path + tmp_str
                }
            }
            
            //递归子菜单
            if(item.children && item.children.length != 0) {
                arr.children = eachMenu(item.children)
            }
            routes.push(arr)
        }
    }
    
    return routes
}


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
