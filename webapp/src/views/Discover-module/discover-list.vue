<template>
  <div id="DiscoverList">
    <!-- 商品广告 transfer.retData.productList[idx].productName-->

    <van-image width="100%" :src="transfer.retData.ads[0].img" />

    <van-divider :style="{padding: '0 64px',color:'#333'}" :hairline="false">热门分类</van-divider>
    <!-- 商品宫格 -->
    <van-grid :column-num="3" :border='false'>
      <template v-for="(value,idx) in transfer.retData.keyWords.length">
        <van-grid-item
          :key="value"
          :icon="transfer.retData.keyWords[idx].img"
          :text="transfer.retData.keyWords[idx].name"
        />
      </template>
    </van-grid>
    <!-- 跳转按钮 -->
    <div style="padding:0 12px">
    <van-button size="small" block>{{transfer.retData.titleName}}频道></van-button>

    </div>
    <van-divider :style="{padding: '0 64px',color:'#333'}" :hairline="false">热门单品</van-divider>

    <!-- 商品列表 -->
    <template v-for="(listItem,idx) in transfer.retData.productList">
      <van-card
      :key="listItem.uuid"
        :price="transfer.retData.productList[idx].price"  
        :origin-price="transfer.retData.productList[idx].price===transfer.retData.productList[idx].marketPrice?'':transfer.retData.productList[idx].marketPrice"
        :title="transfer.retData.productList[idx].productName"
        :thumb="transfer.retData.productList[idx].img"
      >
      <!-- 自定义原价 -->
    <template #origin-price>
    <van-origin-price v-if="transfer.retData.productList[idx].price!==transfer.retData.productList[idx].marketPrice" v-text="' ¥'+transfer.retData.productList[idx].marketPrice"/>
    </template>
      </van-card>
    </template>
  </div>
</template>
<script>
export default {
  props: ["transfer"],
  created() {
    console.log('this.props[0]',this.props[0]);
  },
};
</script>
<style lang="scss">
#DiscoverList {
  // height: 400px;
  overflow: hidden;
  padding: 20px 20px 50px;
  .van-button{
    background-color: #fff6f0;
    color: #333;
    border: none;
  }
  // 商品卡
  .van-card{
    background-color: #fff;
    padding:12px 0;
    border-bottom: 1px solid #eee;
    .van-card__header{
      .van-card__thumb{
        height: 60px;
        width: 60px;
      }
      .van-card__content{
        min-height: 60px;
        .van-card__bottom{
          .van-card__price{
            color: #ff4545;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>