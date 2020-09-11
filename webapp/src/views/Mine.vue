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

    <van-row >
      <van-col class="bgimg"
        style="width:100%;height:130px;padding-left:40%;padding-top:20px;color:#fff;"
      >
      <img src="../../public/img/2.png" alt="" class="img1">
        <div v-show="flag" style="margin-top:78px">
          <span>欢迎登录：</span>
          <span :name="username">{{username}}</span>
        </div>
        <div v-show="flag==false" style="margin-top:78px">
          <span style="cursor:pointer" @click="gologin">登录</span>/
          <span style="cursor:pointer" @click="goreg">注册</span>
        </div>
      </van-col>
    </van-row>


    <van-row style="height:50px;line-height:50px;background:#fff">
  <van-col span="12" style="padding-left:10px">我的订单</van-col>
  <van-col span="12" style="text-align:right;padding-right:10px">全部></van-col>
</van-row>

<van-grid>
  <van-grid-item icon="/img/cimg1.png" text="待支付" />
  <van-grid-item icon="/img/cimg2.png" text="待发货" />
  <van-grid-item icon="/img/cimg3.png" text="待收货" />
  <van-grid-item icon="/img/cimg4.png" text="待评价" />
</van-grid>
<div style="height:20px"></div>

<!-- <van-grid border:false>
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
</van-grid> -->
<div class="divbox">
  <div>
    <p>0</p>
    <span>我的收藏</span>
  </div>
  <div>
    <p>0</p>
    <span>优惠券</span>
  </div>
  <div>
    <p>0</p>
    <span>卡包</span>
  </div>
  <div>
    <p>0</p>
    <span>我的预约</span>
  </div>
</div>

<div style="height:20px"></div>
<van-row style="height:70px;line-height:70px;background:#fff;">
  <van-col span="4"  style="padding-left:15px"><van-icon name="/img/cimg5.png" style="width:26px;height:26px;" class="imgbox"/></van-col>
  <van-col span="16">
    <van-row  type="flex" style="flex-direction:column;line-height:35px">
       <van-col span="16">我的返现</van-col>
       <van-col span="16" style="color:#999;font-size:12px">活动订单返现查询</van-col>
      </van-row>
    </van-col>
  <van-col span="4" style="padding-left:30px;color:#999;font-size:26px">></van-col>
</van-row>
<div style="height:20px"></div>
<van-row style="height:70px;line-height:70px;background:#fff">
  <van-col span="4"  style="padding-left:15px"><van-icon name="/img/cimg6.png" style="width:26px;height:26px;" class="imgbox"/></van-col>
  <van-col span="16">
    <van-row  type="flex" style="flex-direction:column;line-height:35px">
       <van-col span="16">我的服务</van-col>
       <van-col span="16" style="color:#999;font-size:12px">维修、安装、进度查询</van-col>
      </van-row>
    </van-col>
   <van-col span="4" style="padding-left:30px;color:#999;font-size:26px">></van-col>
</van-row>
<div style="height:20px"></div>
<van-row style="height:70px;line-height:70px;background:#fff">
  <van-col span="4"  style="padding-left:15px"><van-icon name="/img/cimg7.png" style="width:26px;height:26px;" class="imgbox"/></van-col>
  <van-col span="16">
    <van-row  type="flex" style="flex-direction:column;line-height:35px;padding-bottom: 50px;">
       <van-col span="16">设置</van-col>
       <van-col span="20" style="color:#999;font-size:12px">个人信息、收货地址、账户安全</van-col>
      </van-row>
    </van-col>
   <van-col span="4" style="padding-left:30px;color:#999;font-size:26px">></van-col>
</van-row>
<div style="height:20px"></div>
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
.bgimg{
  background: url(../../public/img/1.png);
  position: relative;
}
.img1{
  position: absolute;
  width: 72px;
  height: 72px;
}

.imgbox img{
width: 100%;
height: 100%;
}
.divbox{
  height: 82px;
  background: #fff;
  display: flex;
  justify-content: space-around;
  // align-items: center;
}
.divbox div{
  display: flex;
  flex-direction:column;
  justify-content: center;

}.divbox div p{
text-align: center;
}
</style>