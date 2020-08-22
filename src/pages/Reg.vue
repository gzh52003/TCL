<template>
  <div class="main">
    <div class="login-form">
      <h2 class="login-title">TCL后台管理系统-注册</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="ruleForm.username" @change="change()"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"  @keyup.13.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="gotoReg">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        flag:""
      },
    //  验证规则
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },


  methods: {
    //   判断用户名是否存在
    async change(){
        let {username}=this.ruleForm
         let {data}=await this.$request.get("/mongoUser/check",{
                       params:{
                            username
                       }            
                });
                // 用户名可以使用
        if(data.code===1){
            this.flag=true

            // 用户名已存在
        }else if(data.code===0){
            this.flag=false
            this.$message({
                          message: data.msg,
                        });
        }
        console.log(this.flag)
    },
    //   登录
    submitForm(formName) {
        // 如果用户名已存在，结束函数
        if(!this.flag){
            this.$message({
                          message: "用户名已存在，请重新注册",
                        });
            return
        }
        // 判断验证是否通过  
        this.$refs[formName].validate(async valid => {
            if(valid){
                //  let {ruleForm}=this
                // console.log(ruleForm)
                let username=this.ruleForm.username
                let password=this.ruleForm.password
                let {data}=await this.$request.post("/mongoUser/reg",{
                        username,password             
                });
                // console.log(data)
                // console.log(data.code)
                // 成功
                if(data.code==1){
                    this.$message({
                            message: data.msg,
                        });
                    this.$router.push("/login");
                    // 失败
                }else if(data.code==2){
                        this.$message({
                            message: "账号或密码错误",
                        });
                        return
                }
                
            }else{
                return false
            }
        })
          
    
    },
    // 点击登录
    gotoReg() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.login-form {
  width: 350px;
  height: 300px;
  /* 上下间隙150px, 左右自动 */
  /*透明背景色*/
  background-color: rgb(255, 255, 255, 0.8);
  padding: 30px;
  padding-right: 60px;
  /* 圆角 */
  border-radius: 20px;
  /* 居中 */
  margin: 200px auto;
}
.main {
  position: absolute;
  width: 100%;
  height: 100%;
  /* 这里不能@/路径来找图片 */
  background: url(./2.jpg)no-repeat center;
  background-size: 100%;
  overflow: hidden;
}
/* 标题 */
.login-title {
  text-align: center;
  color: #303133;
  margin-bottom: 20px;
}
.el-button {
  margin-left: 20px;
}
.el-form {
  margin-left: -10px;
  width: 320px;
}
.el-checkbox {
  margin-left: -35px;
}
</style>