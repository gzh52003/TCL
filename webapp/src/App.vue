<template>
  <div id="app">
    <router-view/>
    <van-tabbar route v-show="showMenu">
      <van-tabbar-item :icon="item.icon" v-for="item in menu" :key="item.name" :to="item.path">{{item.text}}</van-tabbar-item>
  </van-tabbar>
  </div>
</template>
<script>
import Vue from 'vue'
import {Button,Tabbar, TabbarItem,Tag} from 'vant';
Vue.use(Button)
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag);
export default {
  data(){
    return {
      showMenu:true,
      menu:[{
        name:'home',
        path:'/home',
        icon:'wap-home-o',
        text:'首页'
      },
      {
        name:'discover',
        path:'/discover',
        icon:'eye-o',
        text:'发现'
      },{
        name:'cart',
        path:'/cart',
        icon:'shopping-cart-o',
        text:'购物车'
      },{
        name:'mine',
        path:'/mine',
        icon:'user-o',
        text:'我的'
      }]
    }
  }
}
</script>
<style>

</style>

