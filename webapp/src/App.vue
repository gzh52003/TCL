<template>
  <div id="app">
    <router-view />
    <!-- <van-tabbar route v-show="showMenu">
      <van-tabbar-item  v-for="item in menu" :key="item.name" :to="item.path">{{item.text}}</van-tabbar-item>
    </van-tabbar>-->

          <!-- 弹出分类组件 -->
          <van-popup v-model="show" position="bottom" :style="{ height: '100%' }" >
            <discover v-bind:switch.sync="show"/>
          </van-popup>

    <van-tabbar v-show="showMenu" route>
      <van-tabbar-item v-for="item in menu" :key="item.name" :to="item.path" @click="changeTab(item)">
        <template #icon="props">
          <img
            :src="props.active ? item.icon.active : item.icon.inactive"
            style="width:70px;height:49px;display:blcok"
          />
        </template>
      
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import discover from "./views/Discover"
import Vue from "vue";
import { Button, Tabbar, TabbarItem, Tag, Popup,Icon } from "vant";
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Tag);
Vue.use(Popup);
Vue.use(Icon);

export default {
  data() {
    return {
      showMenu: true,
      show: false,
      active: "home",
      menu: [
        {
          name: "home",
          path: "/home",
          icon: {
            inactive:
              "http://s0.mall.tcl.com/group1/M00/04/F2/CkgbllvSvo2AHYYpAAAUegF3V34064.jpg",
            active:
              "http://s0.mall.tcl.com/group1/M00/04/F2/CkgbllvSvpyAadnxAAAWSZPpnL4739.jpg",
          },
        },
        {
          name: "discover",
          // path: "/discover",
          icon: {
            active:
              "http://s0.mall.tcl.com/group1/M00/04/F2/CkgbllvSvqiAN3cYAAAXRI17ylo497.jpg",
            inactive:
              "http://s0.mall.tcl.com/group1/M00/04/F2/CkgbllvSvq6AZXBqAAAVWajB5lU584.jpg",
          },
        },
        {
          name: "cart",
          path: "/cart",
          icon: {
            active:
              "http://s0.mall.tcl.com/group1/M00/04/F2/CkgbllvSvraAcP0uAAAU9BnDMo0013.jpg",
            inactive:
              "http://s0.mall.tcl.com/group1/M00/04/F2/CkgbllvSvraAcP0uAAAU9BnDMo0013.jpg",
          },
        },
        {
          name: "mine",
          path: "/mine",
          icon: {
            active:
              "http://s0.mall.tcl.com/group1/M00/04/F2/CkgbllvSvsOAW4UlAAAV_Dp4VeI465.jpg",
            inactive:
              "http://s0.mall.tcl.com/group1/M00/04/F2/CkgbllvSvsqAZj0aAAAT9PVRk4A355.jpg",
          },
        },
        {
          name: "repair",
          path: "/repair",
          icon: {
            active: "http://f0.mall.tcl.com/94a99af695e94618ad6c7a50a905d3eb",
            inactive: "http://f0.mall.tcl.com/94a99af695e94618ad6c7a50a905d3eb",
          },
        },
      ],
    };
  },
  components:{
    discover
  },
  methods: {
    showPopup() {
      this.show = !this.show;
    },
    changeTab(item){
      if(item.name=='discover'){
        this.showPopup()
      }
    }
  },
  //跳转路由时收起弹出分类
  watch:{
   '$route'(){
     this.show=false
   }
  }
};
</script>
<style lang="scss">
.van-tabbar-item__icon {
  margin: 0;
}
#app{
  .van-hairline--top-bottom{
    z-index: 3000;
  }
}
</style>

