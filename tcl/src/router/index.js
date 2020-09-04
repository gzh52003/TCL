// 引入模块
import Vue from "vue";
import VueRouter from 'vue-router'
import Index from '../pages/index/Index.vue'
import Home from '../pages/Home.vue'
import User from '../pages/user/User.vue'
import Edit from '../pages/user/Edit.vue'
import Add from '../pages/user/Add.vue'
import UserList from '../pages/user/UserList.vue'
import List from '../pages/List.vue'
import AlterGoods from '../pages/list/alterGoods.vue'
import Order from '../pages/Order.vue'
import Nofund from '../pages/Nofund.vue'
import Reg from '../pages/Reg.vue'
import Login from '../pages/Login.vue'

import request from '../utils/request';

// 使用VueRouter（插件都要使用）
Vue.use(VueRouter)

// 配置路由规则
const router = new VueRouter({
    routes: [
        {
            path: '/reg',
            component: Reg
        },
        {
            path: '/login',
            component: Login,
        },
        {
            path: '/',
            component: Index,
            // 路由权限判断
            meta:{
                requiresAuth:true
            },
            children: [
                {
                    path: '/home',
                    component: Home
                },
                {
                    name: "user",
                    path: '/user',
                    component: User,
                    children: [
                        {
                            name: 'userEdit',
                            path: '/edit/:id',
                            component: Edit
                        },
                        {
                            name: "add",
                            path: 'add',
                            component: Add
                        },
                        {
                            name: "UserList",
                            path: 'userList',
                            component: UserList
                        },
                    ]
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

// 全局路由守卫
// beforeEach：在路由切换前执行
router.beforeEach(async function (to, from, next) {
    // 判断目标路由是否需要登录才可访问
    // console.log('beforeEach',to,from);
    // requiresAuth是判断标准
    // 如果访问的界面需要权限
    if (to.matched.some(item => item.meta.requiresAuth)) {
        let currentUser = localStorage.getItem('currentUser') || {};
        try {
            currentUser = JSON.parse(currentUser)
        } catch (err) {
            currentUser = {};
        }
        // console.log('currentUser', currentUser)

        // 判断当前用户信息是否包含token
        if (currentUser.authorization) {
            // token解密不通过删除。通过则显示用户名
            request.get("/jwtverify", {
                params: {
                    authorization: currentUser.authorization
                }
            }).then(({ data }) => {
                //   code为2代表解密失败
                if (data.code === 2) {
                    localStorage.removeItem('currentUser');
                    next({
                        path: '/login',
                        query: {
                            // 跳转到登录页面，并传递目标页面路径
                            redirectTo: to.fullPath
                        }
                    })
                }
                // 优化用户体验先放行，如果回调函数发现解密失败则跳回登陆界面
                next()
            })
        }
        // 不含token直接到登陆界面
        else {

            next({
                path: '/login',
                query: {
                    // 跳转到登录页面，并传递目标页面路径
                    redirectTo: to.fullPath
                }
            })
        }
    } 
    // 本身不需要权限就能进入的界面直接放行
    else {
        next();
    }
})

// 暴露模块
export default router;