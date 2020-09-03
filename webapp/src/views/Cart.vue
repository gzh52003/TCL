<template>
  <div>
   <van-card
       :price="item.price"
      :title="item.name"
      :thumb="item.pic"
      v-for="item in goodslist"
      :key="item._id"
     
>
    <template #tag>
        <van-checkbox v-model="item.checked"></van-checkbox>
      </template>
      <template #price>
        <p class="price">
          <del>{{item.price}}</del>
          <span>{{item.promotionPrice}}</span>
          <van-stepper v-model="item.qty" input-width="20px" button-size="20px" theme="round" @change="changeQty(item._id,$event)" />
        </p>
      </template>
   </van-card>

<van-submit-bar :price="totalPrice" button-text="提交订单">
    <van-checkbox v-model="checkAll">全选</van-checkbox>
  <template #tip>
    你的收货地址不支持同城送, <span>修改地址</span>
  </template>
</van-submit-bar>
  </div>
</template>
<script>
import Vue from "vue";
import { Card, Step, Steps, SubmitBar, Stepper,Checkbox, CheckboxGroup  } from "vant";

Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.use(Card);
Vue.use(Step);
Vue.use(Steps);
Vue.use(SubmitBar)
Vue.use(Stepper)


export default {
  name:'Cart',
  data(){
    return {
      
    }
  }
  ,
  computed:{
        goodslist(){
      return this.$store.state.goodslist
    },
     checkAll:{
      get(){
        console.log("111")
        return this.goodslist.every(item=>item.checked);
      },
      set(val){
        console.log(val)
        this.goodslist = this.goodslist.map(item=>{
          item.checked = val;
          console.log(item)
          return item;
        });
      }
    },

   
    totalPrice(){
      // return this.goodslist.reduce((pre,item)=>pre+item.sales_price*item.qty,0)*100;
      return this.$store.getters.totalPrice
    }
  },
   methods:{
     changeQty(id,qty){
      this.$store.commit('changeQty',{_id:id,qty})
    }
   }
}
</script>