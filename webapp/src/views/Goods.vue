<template>
  <div>
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-image :src="data.pic" style="height:150px"></van-image>
    <div class="goods-info">
      <h1 style="font-size:12px">{{data.name}}</h1>
      <van-tag plain type="primary">{{data.secondParentCategory}}</van-tag>
      <p class="price">
        <del>{{data.price}}</del>
        <span>{{data.promotionPrice}}</span>
      </p>
    </div>

    <h4>推荐商品</h4>
    <van-grid :border="false" :column-num="2" class="goodslist">
      <van-grid-item v-for="item in recommend" :key="item._id" @click="gotoDetail(item._id)">
        <van-image :src="item.pic" />
        <h4>{{item.name}}</h4>
        <p class="price">
          <del>{{item.price}}</del>
          <span>{{item.promotionPrice}}</span>
        </p>
      </van-grid-item>
    </van-grid>

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="goto('/cart')"
        :badge="cartlist.length"
      />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addcart" />
      <van-goods-action-button type="danger" text="立即购买" @click="buyNow" />
    </van-goods-action>
  </div>
</template>
<script>
import Vue from "vue";
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";

Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
export default {
  data() {
    return {
      // 保存商品数据
      data: {},
      // 推荐页数据
      recommend: [],
    };
  },
  methods: {
    buyNow() {
      this.$router.push("/cart");
    },

    goto(path) {
      this.$router.push(path);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 点击推荐替换本页面
    gotoDetail(id) {
      this.goto({
        name: "Goods",
        params: {
          id,
        },
      });
    },
    // 获取id对应的数据
    async getdate(id) {
      let { data } = await this.$request.get("/good/" + id);
      this.data = data.data;
    },
    //  获取推荐商品数据
    async getRecommend() {
      const { data: recommend } = await this.$request.get("/good", {
        params: {
          size: 2,
          page: 4,
        },
      });
      this.recommend = recommend.data;
    },
    // 添加商品进购物车(qty为自定义的统计数量)
    addcart() {
      const { _id } = this.data;
      const current = this.cartlist.filter((item) => item._id === _id)[0];
      //  判断购物车是否已有该商品，如果是已有，则直接改变数量，没有则新增
      if (current) {
        this.$store.commit("changeQty", { _id, qty: current.qty + 1 });
      } else {
        const goods = {
          ...this.data,
          qty: 1,
        };
        // 调用mutation方法
        this.$store.commit("add", goods);
      }
    },
  },
  //
  computed: {
    cartlist() {
      return this.$store.state.cart.goodslist;
    },
  },
  mounted() {
    // 控制菜单显示
    this.$store.commit("displayTabbar", false);
  },
  destroyed() {
    this.$store.commit("displayTabbar", true);
  },

  async created() {
    let { id } = this.$route.params;
    // 请求数据库对应id的数据
    this.getdate(id);

    // 推荐商品的数据
    this.getRecommend();
  },
  // 路由守卫控制路由跳转
  beforeRouteUpdate(to, from, next) {
    console.log(to.params.id, from.params.id);
    if (to.params.id !== from.params.id) {
      this.getdate(to.params.id);
      this.getRecommend();
    }
    next();
  },
};
</script>