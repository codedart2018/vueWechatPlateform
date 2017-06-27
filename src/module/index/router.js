import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Test from './Test'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: resolve => require(['../../components/Hello'], resolve),
        },
        {
            path: '/test',
            name: 'Test',
            component: resolve => require(['./Test'], resolve)
        },
        {
            path: '/map',
            name: 'Map',
            component: resolve => require(['./Map'], resolve)
        }
    ]
})

