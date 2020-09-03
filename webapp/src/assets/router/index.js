import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../../views/Home.vue'

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
    path: '/cart',
    name: 'Cart',
    component:()=>import('../../views/Cart.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component:()=>import('../../views/Login.vue')
  },
  {
    path: '/reg',
    name: 'Reg',
    component:()=>import('../../views/Reg.vue')
  }
]
const router = new VueRouter({
  routes
})

export default router