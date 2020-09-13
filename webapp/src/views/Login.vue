<template>
  <div style="background:#fff;">
        <van-nav-bar
        class="tit"
        style="border-bottom:1px solid #ccc"
        title="用户中心"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
/>


<van-tabs v-model="activeName" style="padding:36px 0;">
  <van-tab title="验证码登录" name="a" style="margin-top:40px;color:#666">
 <van-form validate-first  style="" >
      <!-- 用户名通过 validator 进行异步函数校验 -->
      <div class="box1">
      <van-field
      class="reg"
        v-model="value1"
        placeholder="手机号码"
       :rules="[{ validator, message: '请输入正确手机格式' }]"
      />
      <img src="img/bg1.png" alt="" class="img1">
      </div>
      <!-- 通过 pattern 函数校验 -->
      <div class="box1"> 
      <van-field
      class="regpass reg"
        v-model="value2"
        placeholder="验证码"
      
      />
       <img src="img/bg2.png" alt="" class="img2">
       </div>
       <span  class="regvcode" ref="vcode" @click="change">dhdhh</span>
      <div style="margin: 16px;">
        <van-button style="margin-top:-20px;background: #f45;border:0" block type="info" @click="submitvcode">立即登录</van-button>
      </div>；


      <div style="padding-bottom: 220px;">
        <img src="img/bg.png" alt="" class="pimg">
      </div>
    </van-form>
  </van-tab>



  <van-tab title="账户密码登录" name="b" style="color:#666;margin-top:40px;">
    <van-form validate-first  style="" >
      <!-- 用户名通过 validator 进行异步函数校验 -->
      <div class="box1">
      <van-field
      class="reg"
        v-model="value3"
        placeholder="手机号码 / 邮箱 / 用户名"
      
      />
      <img src="img/bg1.png" alt="" class="img1">
      </div>
      <!-- 通过 pattern 函数校验 -->
      <div class="box1"> 
      <van-field
      class="reg"
        v-model="value4"
        placeholder="登录密码"
      
      />
       <img src="img/bg2.png" alt="" class="img2">
       </div>
    
      <div style="margin: 16px;">
        <van-button style="background: #f45;border:0" block type="info" @click="submit">立即登录</van-button>
      </div>


      <div style="padding-bottom: 220px;">
        <img src="img/bg.png" alt="" class="pimg">
      </div>
    </van-form>
  </van-tab>

</van-tabs>


   

  </div>
</template>

<script>
import Vue from 'vue';
import { Form,Field,Checkbox } from 'vant';
import { Notify } from 'vant';
// import { Toast } from 'vant';
import { Tab, Tabs } from 'vant';

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Checkbox);
Vue.use(Field);
Vue.use(Form);
export default {
  data() {
    return {
      // checkbox: false,
        // 切换
      activeName: 'a',
      value1: '',
      value2: '',
       value3: '',
      value4: '',
      // pattern:/\w{6,12}/
    };
  },
  methods: {
       onClickLeft(){
            this.$router.go(-1)
        },
           // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // // 异步校验函数返回 Promise
    
    //  asyncValidator(val) {
    //   return new Promise((resolve) => {
    //     Toast.loading('验证中...');

    //     setTimeout(() => {
    //       Toast.clear();
    //        resolve(this.$request.get("mongoUser/check",{
    //            params:{
    //                username:val
    //            }
    //        }));
    //     }, 1000)
    //   })
    // },
    // onFailed(errorInfo) {
    //   console.log('failed', errorInfo);
    // },
      // 点击切换验证码
    async change(){
         let {data}=await this.$request.get("vcode")
         this.$refs.vcode.innerHTML=data.data 
    },
    // 带验证码的登录
  async submitvcode(){
    let s=this.validator(this.value1)
    // 正则验证不通过结束
    if(s===false){
      return
    }
   
                let username=this.value1
               
                 let vcode=this.value2
                let {data}=await this.$request.post("/mongoUser/loginphone",{
                        username,vcode             
                });
                // 先判断验证码是否正确
                      if(data.code===3){
                    Notify({ type: 'danger', message: '验证码错误' });
                  // 刷新验证码
                  this.change()
                  // 验证码不匹配结束函数
                  return
                }
                 // 成功
                if(data.code==1){
                    localStorage.setItem("currentUser", JSON.stringify(data.data))
                     Notify({ type: 'success', message: '登录成功' });
                    this.$router.push("/mine");
                    // 失败
                }else if(data.code==2){
                       Notify({ type: 'danger', message: '账户名或密码错误' });
                        return
                }
  },
    async submit(){
                // console.log(val)
                let username=this.value3
                let password=this.value4
             
               
              // 发送登录请求
                let {data}=await this.$request.post("/mongoUser/loginno",{
                        username,password                                  
                });
                // console.log(data)
        
                // 登录成功
                if(data.code==1){
                     localStorage.setItem("currentUser", JSON.stringify(data.data))
                   Notify({ type: 'success', message: '登录成功' });
                    this.$router.push("/mine");
                }else if(data.code==2){//密码或用户名错误
                     Notify({ type: 'danger', message: '用户名或者密码错误' });
                        return
                
                
            }
    }
  },

  async created(){
      let {data}=await this.$request.get('vcode')
      this.$refs.vcode.innerHTML= data.data
     
  },
      mounted() {
    // 控制菜单显示
    this.$store.commit("displayTabbar", false);
  },
  destroyed() {
    this.$store.commit("displayTabbar", true);
  },
};
</script>

<style lang="scss" scoped>
body{
  background: #fff;
}
.tit .van-nav-bar__title{
padding-top: 20px;
}
.reg{
  border: 1px solid #ccc!important;
  width: 90%;
  margin: 0px auto 20px;
}
.regpass{
  width: 46%;
  margin: 0 0 0 20px;
}
.regvcode{
  width: 40%;
  position: relative;
  background: #f45;
  color: #fff;
  height:46px;
  display: block;
      right: -205px;
    top: -45px;
    text-align: center;line-height: 46px;
}
.pimg{
  position: relative;
  width: 90%;
  left: 18px;
    top: 50px;
}
.box1{
  position: relative;
  input{
    padding-left:20px
  }
}
.img1{
position: absolute;
width: 20px;
height: 20px;
top: 8px;
    left: 30px;
}

.img2{
  position: absolute;
  top: 6px;
    left: 30px;

}
.active{
  color:red!important
}
</style>

<style>
.box1 input
  {
    padding-left:40px
  
}

</style>