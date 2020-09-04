<template>
  <div>
   <van-nav-bar
        title="用户中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
/>



<van-row>
  <van-col style="background-color:red;width:100%;padding-left:40%;padding-top:10%;color:#fff;height:100px">
    <span style="cursor:pointer" @click="gologin">登录</span>/
    <span style="cursor:pointer" @click="goreg">注册</span>
  </van-col>
</van-row>
  </div>
</template>
<script>
export default {
  name:'mine',
   methods:{
     onClickLeft(){
            this.$router.go(-1)
        },
      gologin(){
        this.$router.push("/login")
      },
      goreg(){
        this.$router.push("/reg")
      }
   }

}
</script>