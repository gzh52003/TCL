<template>
    <div>
        <van-steps :active="active" active-icon="success" active-color="#38f">
  <van-step>买家下单</van-step>
  <van-step>商家接单</van-step>
  <van-step>买家提货</van-step>
  <van-step>交易完成</van-step>
</van-steps>


<van-button type="primary" @click="change" style="margin:140px">返回首页</van-button>
    </div>
</template>



<script>
import Vue from 'vue';
import { Step, Steps } from 'vant';
import { Button } from 'vant';

Vue.use(Button);
Vue.use(Step);
Vue.use(Steps);
export default {
    data(){
        return{
active:"1"
        }
    }
    ,
    methods:{
        change(){
            this.$router.replace({"name":"Home"})
        }
    }
}
</script>