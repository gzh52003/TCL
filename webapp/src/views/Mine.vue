<template>
  <div>
    <van-nav-bar
      title="用户中心"
      left-text="返回"
      right-text="退出"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-row>
      <van-col
        style="background-color:red;width:100%;padding-left:40%;padding-top:10%;color:#fff;height:100px"
      >
        <div v-show="flag">
          <span>欢迎登录：</span>
          <span :name="username">{{username}}</span>
        </div>
        <div v-show="flag==false">
          <span style="cursor:pointer" @click="gologin">登录</span>/
          <span style="cursor:pointer" @click="goreg">注册</span>
        </div>
      </van-col>
    </van-row>


    <van-row style="height:30px;line-height:50px;">
  <van-col span="10">我的订单</van-col>
  <van-col span="10" style="text-align:right;">全部></van-col>
</van-row>

<van-grid>
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
  <van-grid-item icon="photo-o" text="文字" />
</van-grid>
  </div>
</template>
<script>

import Vue from 'vue';
import { Grid, GridItem } from 'vant';

Vue.use(Grid);
Vue.use(GridItem);
export default {
  name: "mine",
  data() {
    return {
      flag: false,
      username:""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 退出
    onClickRight() {
      localStorage.removeItem("currentUser");
      this.$router.push("/login");
    },
    gologin() {
      this.$router.push("/login");
    },
    goreg() {
      this.$router.push("/reg");
    },
  },
  created() {
    
    let currentUser = localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);
   
    if (currentUser) {
      this.flag = true;
      this.username=currentUser.username
    }
  
  },
};
</script>

<style lang="scss">
// .name{
//   te
// }
</style>