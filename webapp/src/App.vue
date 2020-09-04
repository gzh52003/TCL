<template>
  <div id="app">
    <router-view />
    <van-tabbar route v-show="showMenu">
      <van-tabbar-item
        v-for="item in menu"
        :icon="item.icon"
        :key="item.name"
        :to="item.path"
        @click="changeTab(item)"
      >{{item.text}}</van-tabbar-item>
    </van-tabbar>
    <van-cell is-link @click="showPopup"></van-cell>
    <van-popup v-model="show">内容</van-popup>
  </div>
</template>
<script>
import Vue from "vue";
import { Button, Tabbar, TabbarItem, Tag, Popup } from "vant";
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag);
Vue.use(Popup);
export default {
  data() {
    return {
      showMenu: true,
      show:false,
      menu: [
        {
          name: "home",
          path: "/home",
          icon: "wap-home-o",
          text: "首页",
        },
        {
          name: "discover",
          path: "/discover",
          icon: "eye-o",
          text: "发现",
        },
        {
          name: "cart",
          path: "/cart",
          icon: "shopping-cart-o",
          text: "购物车",
        },
        {
          name: "mine",
          path: "/mine",
          icon: "user-o",
          text: "我的",
        },
      ],
      methods: {
        changeTab(item){
          console.log(item);
        },
        showPopup(){
          this.show=true
        }
      },
    };
  },
};
</script>
<style>
</style>

