<template>
  <div id="DiscoverList">
    <!-- 商品广告 transfer.retData.productList[idx].productName-->

    <van-image width="100%" :src="transfer.retData.ads[0].img" />

    <van-divider :style="{padding: '0 64px',color:'#333'}" :hairline="false">热门分类</van-divider>
    <!-- 商品宫格 -->
    <van-grid :column-num="3">
      <template v-for="(value,idx) in transfer.retData.keyWords.length">
        <van-grid-item
          :key="value"
          :icon="transfer.retData.keyWords[idx].img"
          :text="transfer.retData.keyWords[idx].name"
        />
      </template>
    </van-grid>
    <!-- 跳转按钮 -->
    <van-button type="danger">进入{{transfer.retData.titleName}}频道></van-button>
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
  data() {
    return {};
  },
  props: ["transfer"],
  created() {
    console.log(this.props[0]);
  },
};
</script>
<style lang="scss">
#DiscoverList {
  // height: 400px;
  overflow: hidden;
  padding: 20px;
}
</style>