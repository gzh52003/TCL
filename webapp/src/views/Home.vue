<template>
  <div class="home">
    <!-- 头部搜索框 -->
    <van-search background="#FF6633" placeholder="请输入搜索关键词" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="../../public/img/lunbo1.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../public/img/lunbo2.jpg" alt />
      </van-swipe-item>
      <van-swipe-item>
        <img src="../../public/img/lunbo3.jpg" alt />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品列表 -->
    <van-grid :column-num="4" class="goodslist">
      <van-grid-item
        v-for="item in goodslist"
        :key="item._id"
        @click="gotoDetail(item._id)"
        class="list"
      >
        <img :src="item.cardImgSrc" />
        <span class="list-title">{{ item.title }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 大图 -->
    <div class="warp-1">
      <img src="../../public/img/worp.jpg" alt="" />
    </div>

    <ul class="warp-2 active">
      <li>
        <a href=""><img src="../../public/img/worp1.jpg" alt=""/></a>
      </li>
      <li>
        <a href=""><img src="../../public/img/worp2.jpg" alt=""/></a>
      </li>
    </ul>
    <ul class="warp-2 active">
      <li>
        <a href=""><img src="../../public/img/worp3.jpg" alt=""/></a>
      </li>
      <li>
        <a href=""><img src="../../public/img/worp4.jpg" alt=""/></a>
      </li>
    </ul>
    <ul class="warp-3 active">
      <li>
        <a href=""><img src="../../public/img/worp5.jpg" alt=""/></a>
      </li>
      <li>
        <a href=""><img src="../../public/img/worp6.jpg" alt=""/></a>
      </li>
    </ul>
    <ul class="warp-4">
      <li>
        <a href=""><img src="../../public/img/worp7.jpg" alt=""/></a>
      </li>
      <!-- <li>
        <a href=""><img src="../../public/img/worp8.jpg" alt=""/></a>
      </li> -->
    </ul>
    <!-- 商品轮播图 -->
    <div class="goodsswipe">
      <div></div>
      <van-swipe class="my-swipe" indicator-color="white">
        <van-swipe-item v-for="item in goodsswipe" :key="item._id">
          <li>
            <img :src="item.cardImgSrc" alt="" />
            <h4>{{ item.title }}</h4>
            <span>{{ item.price }}</span>
          </li>
          <li></li>
          <li></li>
        </van-swipe-item>
        <van-swipe-item> </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Image,
  Search,
  Tab,
  Tabs,
} from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Image);
Vue.use(Search);
Vue.use(Tab);
Vue.use(Tabs);

export default {
  name: "Home",
  data() {
    return {
      goodslist: [],
      goodsswipe: [],
    };
  },
  components: {},
  methods: {
    gotoDetail() {},
  },
  async created() {
    //  宫格导航
    const { data: list } = await this.$request.get("/goods", {
      params: {
        size: 8,
        sort: "tag",
        total: 0,
      },
    });
    // console.log(data);
    this.goodslist = list;
    // 商品轮播
    const { data: swipre } = await this.$request.get("/goods", {
      params: {
        size: 6,
        sort: "price",
        total: 0,
      },
    });
    console.log(swipre);
    this.goodsswipe = swipre;
  },
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
.home {
  height: 100%;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 255px;
  text-align: center;
  background-color: #39a9ed;
  img {
    width: 100%;
    height: 100%;
  }
}
.goodslist {
  margin-top: 5px;
  .list {
    width: 93.8px;
    height: 98.49px;
  }
  img {
    width: 50px;
    height: 50px;
  }
  .list-title {
    margin-top: 4px;
  }
}
.price {
  del {
    color: #999;
    margin-right: 5px;
    &::before {
      content: "￥";
    }
  }
  span {
    color: #f00;
    &::before {
      content: "￥";
    }
  }
}
// 首选主推
.warp-1 {
  width: 100%;
  height: 43.51px;
  img {
    width: 100%;
    height: 100%;
  }
}
.active {
  display: flex;
  justify-content: space-around;
  height: 465.24px;
  img {
    width: 100%;
    height: 100%;
  }
}
.warp-4 {
  height: 384px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
// 商品轮播
.goodsswipe {
  height: 282px;
}
</style>
