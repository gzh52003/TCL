<template>
    <div>
    <van-nav-bar
        title="分类"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
/>


    </div>
</template>

<script>

export default {
    data(){
        return {
              
        }
    },
    methods:{
        // 点击返回上一步
        onClickLeft(){
            this.$router.go(-1)
        },
     
    }
}
</script>