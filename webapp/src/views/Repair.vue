<template>
  <div>
    <van-nav-bar title="维修" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="banner">
      <img src="../../public/img/987.png" alt />
    </div>
    <div class="nav">
      <van-grid :column-num="4">
        <van-grid-item v-for="item in menu" :key="item.name" class="nav-item">
          <img :src="item.url" alt />
          <span>{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="goods">
      <p>
        <span>常见问题</span>
      </p>
      <van-grid :column-num="4">
        <van-grid-item v-for="item in issue" :key="item.name" class="jiadian nav-item">
          <img :src="item.url" alt />
          <span>{{item.name}}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <p class="title">
      <span>联系客服</span>
    </p>
    <div class="foods">
      <div class="left cont">
        <img src="../../public/img/kf.png" />
        <p>24小时在线客服</p>
        <p>为您提供专业的客户服务</p>
        <div class="go">立即咨询&gt;&gt;</div>
      </div>
      <div class="right cont">
        <img src="../../public/img/dh.png" />
        <p>7*24小时热线客服</p>
        <p>为您提供专业的客户服务</p>
        <div class="go">4008-123456</div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Grid, GridItem } from "vant";
Vue.use(Grid);
Vue.use(GridItem);
export default {
  name: "repair",
  data() {
    return {
      menu: [
        {
          url: "/img/wx.png",
          name: "我要维修",
        },
        {
          url: "/img/az.png",
          name: "我要安装",
        },
        {
          url: "/img/jd.png",
          name: "服务进度",
        },
        {
          url: "/img/zc.png",
          name: "服务政策",
        },
        {
          url: "/img/lq.png",
          name: "领取积分",
        },
        {
          url: "/img/jc.png",
          name: "产平教程",
        },
        {
          url: "./img/zzjc.png",
          name: "自助检测",
        },
        {
          url: "/img/fp.png",
          name: "电子发票",
        },
      ],
      issue: [
        {
          url: "./img/tv.png",
          name: "彩电",
        },
        {
          url: "./img/bx.png",
          name: "冰箱",
        },
        {
          url: "./img/kt.png",
          name: "空调",
        },
        {
          url: "./img/xyj.png",
          name: "洗衣机",
        },
      ],
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  // 改变底部菜单显示状态
  // 挂载
  mounted() {
    this.$store.commit("displayTabbar", false);
  },
  // 销毁
  destroyed() {
    this.$store.commit("displayTabbar", true);
  },
};
</script>
<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 175.88px;
  img {
    width: 100%;
    height: 100%;
  }
}
.nav {
  height: 200.5px;
  background: #fff;
  .nav-item {
    width: 93.8px;
    height: 66.1px;
    margin-top: 12px;
    img {
      width: 41px;
      height: 41px;
    }
    span {
      font-size: 14px;
    }
  }
}
.goods {
  margin-top: 10px;
  height: 167.93px;
  p {
    height: 51.59px;
    background: #fff;
    line-height: 51.59px;
    padding-left: 5px;
  }
}
.title {
  height: 51.59px;
  background: #fff;
  line-height: 51.59px;
  padding-left: 5px;
  border-bottom: 2px solid #f5f5f5;
}
.foods {
  height: 202.99px;
  background: #fff;
}
.cont {
  width: 50%;
  float: left;
  text-align: center;
  padding-top: 15px;
  img {
    width: 50px;
    height: 50px;
  }
  p {
    font-size: 14px;
    color: #666;
  }
  .go {
    color: #ff4545;
    margin-top: 30px;
  }
}
</style>