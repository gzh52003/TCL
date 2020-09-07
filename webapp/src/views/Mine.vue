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


    <van-row style="height:50px;line-height:50px;">
  <van-col span="12" style="padding-left:10px">我的订单</van-col>
  <van-col span="12" style="text-align:right;padding-right:10px">全部></van-col>
</van-row>

<van-grid>
  <van-grid-item icon="balance-o" text="待支付" />
  <van-grid-item icon="newspaper-o" text="待发货" />
  <van-grid-item icon="logistics" text="待收货" />
  <van-grid-item icon="other-pay" text="待评价" />
</van-grid>


<van-grid border:false>
  <van-grid-item  text="0" />
  <van-grid-item  text="0" />
  <van-grid-item  text="0" />
  <van-grid-item  text="0" />
</van-grid>
<van-grid>
  <van-grid-item  text="我的收藏" />
  <van-grid-item  text="优惠券" />
  <van-grid-item  text="卡包" />
  <van-grid-item  text="我的预约" />
</van-grid>


<van-row style="height:70px;line-height:70px">
  <van-col span="4"  style="padding-left:15px"><van-icon name="balance-o" /></van-col>
  <van-col span="16">
    <van-row  type="flex" style="flex-direction:column;line-height:35px">
       <van-col span="16">我的返现</van-col>
       <van-col span="16" style="color:#999;font-size:12px">活动订单返现查询</van-col>
      </van-row>
    </van-col>
  <van-col span="4" style="padding-left:15px;color:#999">></van-col>
</van-row>

<van-row style="height:70px;line-height:70px">
  <van-col span="4"  style="padding-left:15px"><van-icon name="question-o" /></van-col>
  <van-col span="16">
    <van-row  type="flex" style="flex-direction:column;line-height:35px">
       <van-col span="16">我的服务</van-col>
       <van-col span="16" style="color:#999;font-size:12px">维修、安装、进度查询</van-col>
      </van-row>
    </van-col>
  <van-col span="4" style="padding-left:15px;color:#999">></van-col>
</van-row>

<van-row style="height:70px;line-height:70px">
  <van-col span="4"  style="padding-left:15px"><van-icon name="phone-o" /></van-col>
  <van-col span="16">
    <van-row  type="flex" style="flex-direction:column;line-height:35px">
       <van-col span="16">设置</van-col>
       <van-col span="20" style="color:#999;font-size:12px">个人信息、收货地址、账户安全</van-col>
      </van-row>
    </van-col>
  <van-col span="4" style="padding-left:15px;color:#999">></van-col>
</van-row>
  </div>
</template>
<script>

import Vue from 'vue';
import { Grid, GridItem,Icon } from 'vant';
import { Toast } from 'vant';
Vue.use(Icon);
Vue.use(Grid);
Vue.use(GridItem);
export default {
  name: "mine",
  data() {
    return {
      flag: false,
      username:"",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 退出
    onClickRight() {
        Toast('已成功退出');
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