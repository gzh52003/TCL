<template>
  <div>
        <van-nav-bar
        title="用户中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
/>

    <van-form validate-first @failed="onFailed" style="padding-top:100px">
      <!-- 用户名通过 validator 进行异步函数校验 -->
      <van-field
        v-model="value1"
        label="用户名"
        placeholder="请输入用户名"
      />
      <!-- 通过 pattern 函数校验 -->
      <van-field
        v-model="value2"
         label="密码"
        placeholder="请输入密码"
        :rules="[{message: '用户名或密码错误' }]"
      />
      <!-- 复选框 -->
      <van-field name="checkbox" label="7天免登录">
        <template #input>
            <van-checkbox v-model="checkbox" shape="square" />
        </template>
        </van-field>
      <!-- 验证码 -->
      <van-field
        v-model="value3"
         label="验证码"
        placeholder="请输入验证码"
        style="width:300px;"
      >
      </van-field>
       <span style="width:100px;" class="span1" ref="vcode" @click="change"></span>
      <div style="margin: 16px;">
        <van-button round block type="info" @click="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue';
import { Form,Field,Toast,Checkbox } from 'vant';
import { Notify } from 'vant';
Vue.use(Checkbox);
Vue.use(Field);
Vue.use(Form);
export default {
  data() {
    return {
      checkbox: false,
      value1: '',
      value2: '',
      value3: '',
      pattern:/\w{6,12}/
    };
  },
  methods: {
       onClickLeft(){
            this.$router.go(-1)
        },
    // 异步校验函数返回 Promise
    
     asyncValidator(val) {
      return new Promise((resolve) => {
        Toast.loading('验证中...');

        setTimeout(() => {
          Toast.clear();
           resolve(this.$request.get("mongoUser/check",{
               params:{
                   username:val
               }
           }));
        }, 1000)
      })
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
      // 点击切换验证码
    async change(){
         let {data}=await this.$request.get("vcode")
         this.$refs.vcode.innerHTML=data.data 
    },
    async submit(val){
                console.log(val)
                let username=this.value1
                let password=this.value2
                let checked=this.checkbox
                let vcode=this.value3
              // 发送登录请求
                let {data}=await this.$request.post("/mongoUser/login",{
                        username,password,checked,vcode,                                  
                });
                console.log(data)
                if(data.code===3){
                Notify({ type: 'danger', message: '验证码错误' });
                  // 刷新验证码
                  this.change()
                  // 验证码不匹配结束函数
                  return
                }
                // 登录成功
                if(data.code==1){
                     localStorage.setItem("currentUser", JSON.stringify(data.data))
                   Notify({ type: 'success', message: '登录成功' });
                    this.$router.push("/home");
                }else if(data.code==2){//密码或用户名错误
                     Notify({ type: 'danger', message: '用户名或者密码错误' });
                        return
                
                
            }
    }
  },

  async created(){
      let {data}=await this.$request.get('vcode')
      this.$refs.vcode.innerHTML= data.data
     
  }
};
</script>

<style lang="scss" scoped>
.span1{
    display: inline-block;
    height: 44px;
    position: relative;
        top: -50px;
    right: -225px;

}
</style>