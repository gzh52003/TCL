<template>
  <div>
   <van-nav-bar
        title="维修"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
/>
  </div>
</template>
<script>
export default {
  name:'repair',
   methods:{
     onClickLeft(){
            this.$router.go(-1)
        },
   }

}
</script>