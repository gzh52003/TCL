<template>
  <div class="home">
    <!-- 头部搜索框 -->
    <van-search background="#FF6633"  placeholder="请输入搜索关键词" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000">
      <van-swipe-item v-for="item in recommend" :key="item._id">
        <img v-lazy="item.pic" />
      </van-swipe-item>
    </van-swipe>

    <!-- 商品列表 -->
    <van-grid :border="false" :column-num="2" class="goodslist">
      <van-grid-item v-for="item in goodslist" :key="item._id" @click="gotoDetail(item._id)">
        <van-image :src="item.pic" />
        <h4>{{item.name}}</h4>
        <p class="price">
          <del>{{item.price}}</del>
          <span>{{item.promotionPrice}}</span>
        </p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import Vue from "vue";
import { Swipe, SwipeItem, Lazyload, Grid, GridItem, Image,Search } from "vant";
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Image);
Vue.use(Search);

export default {
  name: "Home",
  data() {
    return {
      recommend: [],
      goodslist: [],
    };
  },
  components: {},
  methods:{
    gotoDetail(id){
      this.$router.push({
        name:'Goods',
        params:{
          id
        }
      })
    }
  },
  async created() {
    // 轮播图数据
    const {
      data: { data: recommend },
    } = await this.$request.get("/good", {
      params: {
        size: 5,
      },
    });

    this.recommend = recommend;

  //   // 列表数据
    const {
      data: { data: goodslist },
    } = await this.$request.get("/good/many", {
     
    });
    this.goodslist = goodslist;
  },
};
</script>


<style lang="scss">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.my-swipe img{
    width:100px;
    height: 100px;
    
}
.price del {
    color: #999;
    margin-right: 5px;
}
.price del::before {
      content: "￥";
    }
.price span {
    color: #f00;
}
.price span ::before {
      content: "￥";
    }


</style>
