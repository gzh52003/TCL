<template>
  <div id="DiscoverList" v-if="transfer[transferIdx]">
    <!-- 商品广告 transfer[transferIdx].data.data[0].retData.productList[idx].productName-->

    <van-image width="100%" :src="transfer[transferIdx].data.data[0].retData.ads[0].img" />

    <van-divider :style="{padding: '0 64px',color:'#333'}" :hairline="false">热门分类</van-divider>
    <!-- 商品宫格 -->
    <van-grid :column-num="3" :border="false">
      <template v-for="(value,idx) in transfer[transferIdx].data.data[0].retData.keyWords.length">
        <van-grid-item
          :key="value"
          :icon="transfer[transferIdx].data.data[0].retData.keyWords[idx].img"
          :text="transfer[transferIdx].data.data[0].retData.keyWords[idx].name"
        />
      </template>
    </van-grid>
    <!-- 跳转按钮 -->
    <div style="padding:0 12px">
      <van-button size="small" block>{{transfer[transferIdx].data.data[0].retData.titleName}}频道></van-button>
    </div>
    <van-divider :style="{padding: '0 64px',color:'#333'}" :hairline="false">热门单品</van-divider>

    <!-- 商品列表 -->
    <template v-for="(listItem,idx) in transfer[transferIdx].data.data[0].retData.productList">
      <van-card
        :key="listItem.uuid"
        :price="transfer[transferIdx].data.data[0].retData.productList[idx].price"
        :origin-price="transfer[transferIdx].data.data[0].retData.productList[idx].price===transfer[transferIdx].data.data[0].retData.productList[idx].marketPrice?'':transfer[transferIdx].data.data[0].retData.productList[idx].marketPrice"
        :title="transfer[transferIdx].data.data[0].retData.productList[idx].productName"
        :thumb="transfer[transferIdx].data.data[0].retData.productList[idx].img"
        @click="gotoGoods(transfer[transferIdx].data.data[0].retData.productList[idx].uuid,
                          transfer[transferIdx].data.data[0].retData.productList[idx].img,
                          transfer[transferIdx].data.data[0].retData.productList[idx].productName,
                          transfer[transferIdx].data.data[0].retData.productList[idx].price,
                          transfer[transferIdx].data.data[0].retData.productList[idx].marketPrice,
                          transfer[transferIdx].data.data[0].retData.titleName)"
      >
        <!-- 自定义原价 -->
        <template #origin-price>
          <van-origin-price
            v-if="transfer[transferIdx].data.data[0].retData.productList[idx].price!==transfer[transferIdx].data.data[0].retData.productList[idx].marketPrice"
            v-text="' ¥'+transfer[transferIdx].data.data[0].retData.productList[idx].marketPrice"
          />
        </template>
      </van-card>
    </template>
  </div>
</template>
<script>



export default {
  props: ["transfer","transferIdx"],
  methods: {
    gotoGoods(id,pic,name,promotionPrice,price,type){
      console.log(111,id,pic,name,promotionPrice,price,type);
      this.$router.push("/goods",{
        params:{
          id,
          pic,
          name,
          promotionPrice,
          price,
          type
        }
      })
    }
  },
};
</script>
<style lang="scss">
#DiscoverList {
  // height: 400px;
  overflow: hidden;
  padding: 20px 20px 50px;
  .van-button {
    background-color: #fff6f0;
    color: #333;
    border: none;
  }
  // 商品卡
  .van-card {
    background-color: #fff;
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    .van-card__header {
      .van-card__thumb {
        height: 60px;
        width: 60px;
      }
      .van-card__content {
        min-height: 60px;
        .van-card__bottom {
          .van-card__price {
            color: #ff4545;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>