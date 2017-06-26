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
                    group: 'manage'
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
                path: '/wechat/message_view/:id?',
                name: 'wechatMessageView',
                meta: {
                    title: '消息详情',
                    group: 'wechat'
                },
                component: resolve => require(['./pages/wechat/message-view'], resolve),
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
                path: '/archives/index/',
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
    ]
})
//苏格拉底 --》 伯拉图 --》 亚里士多德--》 亚里山大--》阿基米德
//                        加律略
