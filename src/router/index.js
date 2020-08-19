// 引入模块
import Vue from "vue";
import VueRouter from 'vue-router'

import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import List from '../pages/List.vue'
import Order from '../pages/Order.vue'
import Nofund from '../pages/Nofund.vue'



// 使用VueRouter（插件都要使用）
Vue.use(VueRouter)

// 配置路由规则
const router=new VueRouter({
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/home',
            component: Home
        },
        {
            path: '/user',
            component: User
        },
        {
            path: '/list',
            component: List
        },
        {
            path: '/order',
            component: Order
        },
        {
            path: '/404',
            component: Nofund
        },
        {
            // 当以上路由都匹配不到则404
            path: '*',
            component: Nofund
        }
    ]
})

// 暴露模块
export default router;