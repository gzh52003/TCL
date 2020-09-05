<template>
  <div class="home">
    <!-- 头部搜索框 -->
    <van-search background="#FF6633" placeholder="请输入搜索关键词" @click="onSubmit" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#1E90FF">
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
      <img src="../../public/img/worp.jpg" alt />
    </div>

    <ul class="warp-2 active">
      <li>
        <a href>
          <img src="../../public/img/worp1.jpg" alt />
        </a>
      </li>
      <li>
        <a href>
          <img src="../../public/img/worp2.jpg" alt />
        </a>
      </li>
    </ul>
    <ul class="warp-2 active">
      <li>
        <a href>
          <img src="../../public/img/worp3.jpg" alt />
        </a>
      </li>
      <li>
        <a href>
          <img src="../../public/img/worp4.jpg" alt />
        </a>
      </li>
    </ul>
    <ul class="warp-3 active">
      <li>
        <a href>
          <img src="../../public/img/worp5.jpg" alt />
        </a>
      </li>
      <li>
        <a href>
          <img src="../../public/img/worp6.jpg" alt />
        </a>
      </li>
    </ul>
    <ul class="warp-4">
      <li>
        <a href>
          <img src="../../public/img/worp7.jpg" alt />
        </a>
      </li>
      <li>
        <a href>
          <img src="../../public/img/worp8.jpg" alt />
        </a>
      </li>
    </ul>
    <!-- 商品轮播图 -->

    <van-swipe indicator-color="#1E90FF" class="goodsswipe">
      <van-swipe-item class="con-left con">
        <li v-for="item in goodsswipe" :key="item._id">
          <img :src="item.cardImgSrc" alt />
          <p>{{ item.title }}</p>
          <span>{{ item.price }}</span>
        </li>
      </van-swipe-item>
      <van-swipe-item class="con-right con">
        <li v-for="item in goodsright" :key="item._id">
          <img :src="item.cardImgSrc" alt />
          <p>{{ item.title }}</p>
          <span>{{ item.price }}</span>
        </li>
      </van-swipe-item>
    </van-swipe>
    <div class="box">
      <div class="tcl-dynamic">
        <h4>TCL动态</h4>
        <div class="video">
          <img src="../../public/img/card.jpg" alt />
          <img src="../../public/img/bo.png" class="bo" alt />
          <p>驰援武汉，共克时艰，TCL在行动！</p>
        </div>
        <ul class="dynamic-title">
          <li>
            <img src="../../public/img/9.jpg" alt />
            <p>
              <span>
                TCL2020全球新品
                <br />发布会
              </span>
            </p>
          </li>
          <li>
            <img src="../../public/img/8.jpg" alt />
            <p>
              <span>
                TCL通讯实力亮相
                <br />2020，首款5G手机惊艳登场
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="tcl-statement">
      <dl>
        <dt>
          <img src="../../public/img/qualityproduct.png" alt />
        </dt>
        <dd>官方正品</dd>
      </dl>
      <dl>
        <dt>
          <img src="../../public/img/genius.png" alt />
        </dt>
        <dd>全国联保</dd>
      </dl>
      <dl>
        <dt>
          <img src="../../public/img/sevenday.png" alt />
        </dt>
        <dd>七天五理由</dd>
      </dl>
    </div>
    <div class="tcl-contact">
      <div>24小时全国热线</div>
      <p>4008-123456</p>
    </div>
    <div class="tcl-others" style="padding-bottom:3rem;">
      <div class="others-items">
        <a href>
          <span class="others-item">关于TCL</span>
        </a>
        <a hre>
          <span class="others-item">授权体验店</span>
        </a>
        <a href>
          <span class="others-item">合作加盟</span>
        </a>
      </div>
      <div class="tcl-copyright">TCL集团股份有限公司版权所有</div>
    </div>
    <!-- 返回顶部 -->
    <nav class="kf-up">
      <p>
        <van-icon name="phone-circle-o" color="red" class="icon" />
      </p>
      <p class="top">
        <van-icon name="back-top" class="icon" />
      </p>
    </nav>
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
  Icon,
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
Vue.use(Icon);

export default {
  name: "Home",
  data() {
    return {
      goodslist: [],
      goodsswipe: [],
      goodsright: [],
      formInline: {
        name: "",
      },
    };
  },
  components: {},
  methods: {
    gotoDetail() {},
    // 模糊搜索
    async onSubmit() {
      console.log(1);
      let { name } = this.formInline;
      let { data } = await this.$request.get("good/vague", {
        params: {
          name,
        },
      });
      this.total = data.data.length;
      this.goodslist = data.data;
      console.log(data.data);
    },
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
    console.log(list);
    this.goodslist = list;
    // 商品轮播

    // 左边
    const { data: swipre } = await this.$request.get("/goods", {
      params: {
        size: 3,
        sort: "left",
        total: 0,
      },
    });
    console.log(swipre);
    this.goodsswipe = swipre;
    // 右边
    const { data: right } = await this.$request.get("/goods", {
      params: {
        size: 3,
        sort: "right",
        total: 0,
      },
    });
    console.log(right);
    this.goodsright = right;
  },
};
</script>

<style lang="scss">
body {
  background: #f5f5f5;
}
* {
  margin: 0;
  padding: 0;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 255px;
  text-align: center;

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
.warp-4 li {
  height: 384px;
  width: 100%;
  img {
    width: 100%;
    height: 100%;
  }
}
// 商品轮播
.goodsswipe {
  margin-top: 40px;
  width: 100%;
  height: 232px;
  background: #fff;

  .con {
    display: flex;
    justify-content: space-evenly;
  }
  li {
    width: 33%;
    list-style: none;
    padding-left: 13px;

    img {
      width: 100px;
      height: 100px;
    }
  }
  p {
    font-size: 12px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  span {
    padding-left: 20px;
    color: #f00;
  }
}
// tcl-dynamic
.box {
  display: flex;
  justify-content: center;
  background: #fff;
  .tcl-dynamic {
    width: 345.18px;
    height: 418px;

    h4 {
      text-align: center;
      height: 50px;
      line-height: 50px;
      font-size: 24px;
    }
    .video {
      height: 150px;
      position: relative;

      .bo {
        position: absolute;
        width: 3.048rem;
        height: 3.048rem;
        left: 50%;
        top: 50%;
        margin-top: -1.024rem;
        margin-left: -1.024rem;
      }
      p {
        text-align: center;
        height: 40px;
        background: #f5f5f5;
        line-height: 40px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .dynamic-title {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      height: 262px;
      background: #fff;
      li {
        height: 162px;
        width: 165px;
        img {
          width: 100%;
          height: 92px;
        }
        p {
          text-align: center;
          background: #f5f5f5;

          span {
            font-size: 14px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
      }
    }
  }
}
.tcl-statement {
  height: 128px;
  display: flex;
  justify-content: space-around;
  background: #fff;
  margin-top: 20px;
  dl {
    width: 60px;
    height: 58px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
    }
    dd {
      font-size: 12px;
    }
  }
}
.tcl-contact {
  height: 83px;
  text-align: center;
  background: #fff;
  line-height: 34px;
  div {
    font-size: 16px;
    margin-top: 0.4rem;
    color: #333;
  }
  p {
    font-size: 24px;
    color: red;
    font-weight: 700;
    margin-top: 0.2rem;
  }
}
.tcl-others {
  width: 100%;
  height: 69.88px;
  margin-bottom: 100px;
  .others-items {
    align-items: center;
    display: flex;
    height: 3.98rem;
    justify-content: space-around;
  }

  a {
    width: 75px;
    height: 35px;
    font-size: 14px;
    color: #999;
    border: 1px solid #ccc;
    align-items: center;
    display: flex;
    justify-content: center;

    border-radius: 2px;
  }
  .tcl-copyright {
    font-size: 14px;
    color: #999;
    text-align: center;
  }
}
// 返回顶部
.kf-up {
  position: fixed;
  bottom: 110px;
  right: 0;
  p {
    background: #fff;
    border-radius: 50%;
  }
  .icon {
    font-size: 34px;
  }
  .top {
    margin-top: 10px;
  }
}
</style>
