<template>
  <div>
       <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
/>
   <van-card
      :desc="item.adress"
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
          <del>{{item.promotionPrice}}</del>
          <span style="margin:30px 0">{{item.price}}</span>
          <van-stepper v-model="item.qty" input-width="20px" button-size="20px" theme="round" @change="changeQty(item._id,$event)" />
        </p>
      </template>
       <template #footer>
    <van-button size="mini" style="color:red" @click="removeItem(item._id)">删除</van-button>
  </template>
   </van-card>
 <van-button size="mini" style="color:red" @click="clearcart" v-show="this.goodslist.length==0 ? false : true">清空购物车</van-button>
<van-submit-bar :price="totalPrice" button-text="结算" @submit="onSubmit">
    <van-checkbox v-model="checked">全选</van-checkbox>
  <!-- <template #tip>
    你的收货地址不支持同城送, <span>修改地址</span>
  </template> -->
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
    user:""
    }
  }
  ,
  
  computed:{
    // 获取公共数据
      goodslist(){
      return this.$store.state.cart.goodslist
    },

    // 勾选框
     checked:{
      get(){
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

  //  计算总金额
    totalPrice(){
      // return this.goodslist.reduce((pre,item)=>pre+item.sales_price*item.qty,0)*100;
      return this.$store.getters.totalPrice
    },
  
  },
  
   methods:{
    //  结算
    async onSubmit(){
      let {data}=await this.$request.get("/good/cart",{params:{userid:this.user}})
      console.log(data.data)
      await this.$request.post("/good/listserver",{
        list:data.data
      })
      this.clearcart()
      this.$router.replace({"name":"steps"})
    },
    //  数量改变调用
     changeQty(id,qty){
      // this.$store.commit('changeQty',{_id:id,qty})
      // 下面函数用作判断是否已超库存
      this.$store.dispatch('changeQtyAsync',{_id:id,qty})
    },
    
     onClickLeft(){
            this.$router.push("/home")
        },
        // 删除商品调用
      async removeItem(id){
      
     
          this.$store.commit("remove",id)
          await this.$request.delete(`/good/${id}/car`,{params:{userid:this.user}})
        
       
      },
      // 清空购物车
      async clearcart(){
         this.$store.commit("clear")
        await this.$request.delete(`/good/all`,{params:{userid:this.user}})
      
       
      }
   }
   ,
     mounted() {
    // 控制菜单显示
    this.$store.commit("displayTabbar", false);
  },
  destroyed() {
    this.$store.commit("displayTabbar", true);
  },
  
   async created(){
    let currentUser = localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);
    this.user = currentUser._id;
    let {data}=await this.$request.get("/good/cart",{params:{userid:this.user}})
     // 调用mutation方法
        this.$store.commit("GO", data.data);
     
   }
}
</script>

<style scoped lang="scss">
.van-card__tag{
  left:-15px;
  top:30px;
}
.van-card__title{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.van-image{
  margin-left: 20px;
}
.van-card{
  height: 120px;
}
.van-card__content{
margin-left: 30px;
}
</style>