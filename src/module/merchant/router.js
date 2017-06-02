import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
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
            },{
                path: '/setting/merchant',
                name: 'merchant',
                meta: {
                    title: '商户设置',
                    group: 'manage'
                },
                component: resolve => require(['./pages/setting/merchant'], resolve),
            },{
                path: '/public/list',
                name: 'public',
                meta: {
                    title: '公众号列表',
                    group: 'manage'
                },
                component: resolve => require(['./pages/public/list'], resolve),
            },{
                path: '/public/bind',
                name: 'bind',
                meta: {
                    title: '绑定公众号',
                    group: 'manage'
                },
                component: resolve => require(['./pages/public/bind'], resolve),
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
    ]
})
//苏格拉底 --》 伯拉图 --》 亚里士多德--》 亚里山大--》阿基米德
//                        加律略
