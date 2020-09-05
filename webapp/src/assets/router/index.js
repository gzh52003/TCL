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
    path: '/discover',
    name: 'discover',
    component:()=>import('../../views/Discover.vue')
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
  routes
})

export default router