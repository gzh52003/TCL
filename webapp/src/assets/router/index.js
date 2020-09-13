import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../../views/Home.vue'
import request from '../../utils/request';
Vue.use(VueRouter)

const routes=[
  {
    path:"/",
    component:Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path:"list",
    name:"List",
    component:()=>import('../../views/List.vue')
  },
  {
    path: '/goods/:id',
    name: 'Goods',
    component:()=>import('../../views/Goods.vue')
  },
  {
    path: '/steps',
    name: 'steps',
    component:()=>import('../../views/Steps.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component:()=>import('../../views/Cart.vue'),
       // 路由权限判断
       meta:{
        requiresAuth:true
    },
  },
 
  {
    path: '/discover',
    name: 'discover',
    component:()=>import('../../views/Discover.vue'),
    children:[
      {
        path: '/discover-list',
        name: 'discover-list',
        component:()=>import('../../views/Discover-module/discover-list.vue'),
      }
    ]
  },
  {
    path: '/mine',
    name: 'mine',
    component:()=>import('../../views/Mine.vue')
  },
  {
    path: '/repair',
    name: 'repair',
    component:()=>import('../../views/Repair.vue')
  },
  {
    path: '/reg',
    name: 'reg',
    component:()=>import('../../views/Reg.vue')
  },
  {
    path: '/login',
    name: 'login',
    component:()=>import('../../views/Login.vue')
  }
]


const router = new VueRouter({
   mode:'history',
  routes
})
// 路由权限判断(此处只限制了购物车板块)
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
export default router
