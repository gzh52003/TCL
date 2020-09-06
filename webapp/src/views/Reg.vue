<template>
  <div>
        <van-nav-bar
        title="用户中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
/>

    <van-form validate-first  style="padding-top:100px" >
      <!-- 用户名通过 validator 进行异步函数校验 -->
      <van-field
        v-model="value1"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{validator:asyncValidator, message: '用户名已存在'}]"
      />
      <!-- 通过 pattern 函数校验 -->
      <van-field
        v-model="value2"
         label="密码"
        placeholder="请输入密码"
      
      />
    
      <div style="margin: 16px;">
        <van-button round block type="info" @click="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import Vue from 'vue';
import { Form,Field,Checkbox } from 'vant';
import { Notify } from 'vant';
import { Toast } from 'vant';
Vue.use(Checkbox);
Vue.use(Field);
Vue.use(Form);
export default {
  data() {
    return {
    
      value1: '',
      value2: '',
      // pattern:/\w{6,12}/
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
        console.log(val)
        setTimeout(() => {
          Toast.clear();
           resolve(this.$request.get("mongoUser/check",{
               params:{
                   username:val
               }
           }));
        }, 1000)
      }).then(res=>{
            // 判断用户名是否已存在
            console.log(res.data.code)
            if(res.data.code===0){  
             
                return false
            }else{
             
                return true
            }
            
            
        });
    },
    // onFailed(errorInfo) {
    //   console.log('failed', errorInfo);
    // },

    async submit() {
      console.log(this.value1)
                let t=await this.asyncValidator(this.value1)
                console.log(t)
                if(t===false){
                  return
                }
                let username=this.value1
                let password=this.value2
                let {data}=await this.$request.post("/mongoUser/reg",{
                        username,password             
                });
                // 成功
                if(data.code==1){
                     Notify({ type: 'success', message: '注册成功' });
                    this.$router.push("/login");
                    // 失败
                }else if(data.code==2){
                       Notify({ type: 'danger', message: '注册失败' });
                        return
                }
    }
  },
};
</script>