<template>
    <div>
       <van-icon name="arrow-left" style="font-size:30px" @click="prev">
       分类
       </van-icon>
    </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';

Vue.use(NavBar);
export default {
    methods:{
        // 点击返回上一步
        prev(){
            this.$router.go(-1)
        }
    },
    created(){
        console.log('created 分类');
    },
    destroyed(){
        console.log('destroyed 分类');
    }
}
</script>