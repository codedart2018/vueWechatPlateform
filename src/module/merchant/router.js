import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/**
 * 获取token
 */
let token = window.localStorage.getItem('merchantToken');
if(token) {
    //取出菜单
    let mainMenu = window.localStorage.getItem('merchantMenu');
    var Menu = mainMenu ? typeof (JSON.parse(mainMenu) == "object") ? JSON.parse(mainMenu) : [] : [];
} else {
    var Menu = [];
}

/**
 * 默认路由
 * @type {[*]}
 */
const router =[
    {
        path: '/',
        name: 'manage',
        meta: {
            title: '管理中心',
            group: 'manage'
        },
        component: resolve => require(['./pages/common/manage'], resolve),
        children: [
            {
                path: '/wechat/main',
                name: 'wechatMain',
                meta: {
                    title: '微信公众号平台',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/wechat/manage'], resolve),
            }
        ]
    },
    {
        path: '/login', //登录
        name: 'login',
        meta: {
            title: '商户登陆中心',
            routeAuth: false
        },
        component: resolve => require(['./pages/login/index'], resolve),
        display: 0,
    },
    {
        path: '/register', // 注册
        name: 'register',
        meta: {
            title: '商户注册中心',
            routeAuth: false
        },
        component: resolve => require(['./pages/register/index'], resolve),
        display: 0,
    },
    ...sessionRouters(Menu)
];


/**
 * 导出路由
 */
export default new Router({
    //导出处理后的路由
    routes: router
    /**
    routes: [
        {
            path: '/',
            name: 'manage',
            meta: {
                title: '管理中心',
                group: 'manage'
            },
            component: resolve => require(['./pages/common/manage'], resolve),
            children: [{
                path: '/setting/personal',
                name: 'personal',
                meta: {
                    title: '个人设置',
                    group: 'manage'
                },
                component: resolve => require(['./pages/setting/personal'], resolve),
            },
            {
                path: '/setting/merchant',
                name: 'merchant',
                meta: {
                    title: '商户设置',
                    group: 'manage'
                },
                component: resolve => require(['./pages/setting/merchant'], resolve),
            },
            {
                path: '/public/list',
                name: 'public',
                meta: {
                    title: '公众号列表',
                    group: 'manage',
                    navigation: ['公众号', '公众号列表']
                },
                component: resolve => require(['./pages/public/list'], resolve),
            },
            {
                path: '/public/bind',
                name: 'bind',
                meta: {
                    title: '绑定公众号',
                    group: 'manage'
                },
                component: resolve => require(['./pages/public/bind'], resolve),
            },
            {
                path: '/expense/account',
                name: 'expenseAccount',
                meta: {
                    title: '帐户总览',
                    group: 'manage'
                },
                component: resolve => require(['./pages/expense/account'], resolve),
            },
            {
                path: '/expense/bills',
                name: 'expenseBills',
                meta: {
                    title: '消费明细列表',
                    group: 'manage'
                },
                component: resolve => require(['./pages/expense/bills'], resolve),
            },
            {
                path: '/expense/bills_detail/:id?',
                name: 'expenseBillsDetail',
                meta: {
                    title: '消费明细详情',
                    group: 'manage'
                },
                component: resolve => require(['./pages/expense/bills-detail'], resolve),
            },
            {
                path: '/expense/integral',
                name: 'expenseIntegral',
                meta: {
                    title: '积分明细列表',
                    group: 'manage'
                },
                component: resolve => require(['./pages/expense/integral'], resolve),
            },
            {
                path: '/wechat/main',
                name: 'wechatManage',
                meta: {
                    title: '微信公众号平台',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/wechat/manage'], resolve),
            },
            {
                path: '/wechat/menu',
                name: 'wechatMenu',
                meta: {
                    title: '菜单设置',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/wechat/menu'], resolve),
            },
            {
                path: '/wechat/fans',
                name: 'wechatFans',
                meta: {
                    title: '粉丝管理',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/wechat/fans'], resolve),
            },
            {
                path: '/wechat/message',
                name: 'wechatMessage',
                meta: {
                    title: '消息管理',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/wechat/message'], resolve),
            },
            {
                path: '/wechat/message_detail/:id?',
                name: 'wechatMessageDetail',
                meta: {
                    title: '消息详情',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/wechat/message-detail'], resolve),
            },
            {
                path: '/archives/material/:type?',
                name: 'archivesMaterial',
                meta: {
                    title: '素材管理',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/archives/material'], resolve),
            },
            {
                path: '/archives/category',
                name: 'archivesCategory',
                meta: {
                    title: '资讯分类',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/archives/category'], resolve),
            },
            {
                path: '/archives/index',
                name: 'archivesIndex',
                meta: {
                    title: '资讯列表',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/archives/index'], resolve),
            },
            {
                path: '/archives/add',
                name: 'archivesAdd',
                meta: {
                    title: '资讯添加',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/archives/add'], resolve),
            },
            {
                path: '/archives/edit/:id?',
                name: 'archivesEdit',
                meta: {
                    title: '资讯修改',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/archives/edit'], resolve),
            },
            {
                path: '/website/index',
                name: 'websiteIndex',
                meta: {
                    title: '微网站设置',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/website/index'], resolve),
            }]
        },
        {
            path: '/login', //登录
            name: 'login',
            meta: {
                title: '商户登陆中心',
                routeAuth: false
            },
            component: resolve => require(['./pages/login/index'], resolve),
            display: 0,
        },
        {
            path: '/register', // 注册
            name: 'register',
            meta: {
                title: '商户注册中心',
                routeAuth: false
            },
            component: resolve => require(['./pages/register/index'], resolve),
            display: 0,
        },
    ]
     **/
})
//苏格拉底 --》 伯拉图 --》 亚里士多德--》 亚里山大--》阿基米德
//                        加律略

/**
 * 导出循环处理结果
 * @param menu 菜单
 * @param routes 路由
 * @returns {Array}
 */
export function sessionRouters(menu = [], routes = []) {
    routes = eachMenu(menu);
    return routes;
}

/**
 * 动态循环菜单
 * @param menu 菜单
 * @param routes 路由
 * @returns {Array}
 */
function eachMenu(menu = [], routes = []) {
    if(menu.length <= 0) return routes;
    for (let item of menu){
        if(item.path && item.component) {
            //分组
            let arr = {
                id: item.id,
                icon: item.icon,
                name: item.name + (item.id * Math.floor(Math.random()*99+1)), //防止name重名实际并没卵用，只是为了不让控制台出现警告而已
                alias_name: item.name, //做个别名来 不用name 防止冲突
                group: item.group,
                pid: item.pid,
                path: item.path,
                url: item.url,
                display: item.display,
                meta: {
                    group: item.group,
                    title: item.name
                },
                component: resolve => require([`${item.component}.vue`], resolve)// todo 不知道为毛最后不加字符串一直警告，真TMD烦人
            };
            
            //参数处理 地址栏参数获取是query
            if(item.params) {
                let last_str = item.path.charAt(item.path.length - 1);
                let tmp_str = '';
                for(let p of item.params.split(",")) {
                    tmp_str += "/:" + p + "?";
                }
                if(last_str == "/") {
                    arr.path = arr.path + tmp_str.substr(1);
                } else {
                    arr.path = arr.path + tmp_str;
                }
            }
            
            //递归子菜单
            if(item.children && item.children.length != 0) {
                arr.children = eachMenu(item.children);
            }
            routes.push(arr);
        }
    }
    return routes;
}

/**
 * 导出过滤路由结果
 * @param old 原路由
 * @param routes 要过滤的路由
 */
export function filterRouters(old = [], routes = []) {
    if(old.length == 0 || routes.length == 0) return [];
    let new_routes = [];
    for (let route of old){
        for(let tmp of routes) {
            if(!route.id && route.id != tmp.id) {
                new_routes.push(route);
                break;
            }
        }
    }
    return new_routes;
}
