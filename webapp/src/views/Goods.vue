<template>
  <div>
    <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-image :src="data.img" class="shopimg"></van-image>
    <div class="goods-info">
      <h1 style="font-size:20px;margin-bottom:20px">{{data.productName}}</h1>
      <!-- <van-tag plain type="primary">{{data.secondParentCategory}}</van-tag> -->
      <p class="price">
        <del>{{data.marketPrice}}</del>
        <span>{{data.price}}</span>
      </p>
    </div>

    <ul class="ulbox">
      <li>
        <label for>配送</label>
        <!-- <p >广东省广州市海珠区</p> -->
        <van-cell @click="showPopup">
          <p ref="adress">广东省广州市海珠区</p>
        </van-cell>
        <van-popup v-model="show" position="bottom" :style="{ height: '60%' }">
          <van-address-edit
            :show-postal="false"
            :show-area="false"
            show-delete
            show-set-default
            @save="onSave"
          />
        </van-popup>

        <span>></span>
      </li>

      <li>
        <label for>服务</label>
        <p>7天退换货</p>
        <span>></span>
      </li>
    </ul>
    <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model="show">  <p >广东省广州市海珠区</p></van-popup>-->
    <!-- <h4>推荐商品</h4>
    <van-grid :border="false" :column-num="2" class="goodslist">
      <van-grid-item v-for="item in recommend" :key="item._id" @click="gotoDetail(item._id)">
        <van-image :src="item.pic" />
        <h4>{{item.name}}</h4>
        <p class="price">
          <del>{{item.price}}</del>
          <span>{{item.promotionPrice}}</span>
        </p>
      </van-grid-item>
    </van-grid>-->

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
import { Popup } from "vant";
import { Cell, CellGroup } from "vant";
import { AddressEdit } from "vant";
import { Toast } from "vant";

Vue.use(AddressEdit);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Popup);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
export default {
  data() {
    return {
      // value5:"",
      show: false,
      // 保存商品数据
      data: {},
      // 推荐页数据
      recommend: [],
      // 用户id
      user: "",
      // 收货人
      username:"",
      // 收货电话
      phone:"",
    };
  },
  methods: {
    onSave(val) {
      console.log(val)
      this.$refs.adress.innerHTML = val.addressDetail;
      this.username=val.name
      this.phone=val.tel
      Toast("修改成功");
      this.show = false;
    },

    // 地址修改
    // changeadress(){
    //   this.$refs.adress.innerHTML=this.value5
    //   this.show=false
    // },
    showPopup() {
      this.show = true;
    },

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
    // gotoDetail(id) {
    //   this.goto({
    //     name: "Goods",
    //     params: {
    //       id,
    //     },
    //   });
    // },
    // 获取id对应的数据
    async getdate(id) {
      let { data } = await this.$request.get(`/good/${id}/zuixin`);
      data = data.data;
      // console.log(data);
      // data=data.filter(item=>item.uuid===id)
      // console.log(data)
      this.data = data;
    },
    //  获取推荐商品数据
    // async getRecommend() {
    //   const { data: recommend } = await this.$request.get("/good", {
    //     params: {
    //       size: 2,
    //       page: 4,
    //     },
    //   });
    //   this.recommend = recommend.data;
    // },
    // 添加商品进购物车(qty为自定义的统计数量)
    async addcart() {
      const { uuid } = this.data;
      // console.log(this.data)
      // let id=_id
      // console.log(this.$refs.adress.innerHTML)
      let adress = this.$refs.adress.innerHTML;
      const current = this.cartlist.filter((item) => item.uuid === uuid)[0];
      let id = uuid;
      //  判断购物车是否已有该商品，如果是已有，则直接改变数量，没有则新增
      console.log(current);
      if (current) {
        await this.$request.get(`/good/${id}/addshop`, {
          // id:_id,
          params: {
             userid: this.user,
            qty: current.qty + 1,
          },
        });

        // console.log("11",data)
        this.$store.commit("changeQty", { uuid, qty: current.qty + 1 });
      } else {
        // console.log(this.data)
        await this.$request.get(`/good/${id}/addshop`, {
          // id:_id,
            params: {
              img:this.data.img,
            username:this.username,
            phone:this.phone,
            userid: this.user,
            adress,
            name: this.data.productName,
            promotionPrice: this.data.marketPrice,
            pic: this.data.img,
            price: this.data.price,
            checked: this.data.checked,
            kc: this.data.kc,
            qty: 1,
          },
        });

        // console.log("12",data)
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
    let currentUser = localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);
    this.user = currentUser._id;
    // console.log(this.user)
    let { id } = this.$route.params;
    // console.log("id=",id,"uuid=",uuid)
    // 请求数据库对应id的数据
    this.getdate(id);

    // // 推荐商品的数据
    // this.getRecommend();
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


<style lang="scss" scoped>
.shopimg {
  width: 100%;
  height: 375px;
  background: #fff;
}
.goods-info {
  background: #fff;
  padding-left: 20px;
}
.ulbox {
  background: #fff;
  margin-top: 20px;
  height: 190px;
}
.ulbox li {
  width: 90%;
  margin: 0 auto;
  height: 42px;
  display: flex;
  line-height: 42px;
  label {
    width: 20%;
    // padding-left: 20px;
  }
  p {
    width: 70%;
  }
  span {
    display: block;
    width: 10%;
  }
}
</style>