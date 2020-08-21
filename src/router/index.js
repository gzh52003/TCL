// 引入模块
import Vue from "vue";
import VueRouter from 'vue-router'

import Home from '../pages/Home.vue'
import User from '../pages/User.vue'
import List from '../pages/List.vue'
import AlterGoods from '../pages/list/alterGoods.vue'
import Order from '../pages/Order.vue'
import Nofund from '../pages/Nofund.vue'
import Edit from '../pages/user/Edit.vue'
import Add from '../pages/user/Add.vue'
import Reg from '../pages/Reg.vue'
import Login from '../pages/Login.vue'


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
            path: '/reg',
            component: Reg 
        },
        {
            path: '/login',
            component: Login 
        },
        {
            path: '/home',
            component: Home,
            children:[
               
                {
                    name:"user",
                    path: '/user',
                    component: User      
                },
                {
                    name:'userEdit',
                    path: '/edit/:id',
                    component: Edit
                },
                {
                    name:"add",
                    path: '/add',
                    component: Add      
                },
                {
                    path: '/list',
                    component: List,
                },
                {//修改商品资料时从List组件跳转到alterGoods组件
                    path: '/list/alterGoods/:id',
                    component: AlterGoods,
                },
                {
                    path: '/order',
                    component: Order
                },
            ]
            
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