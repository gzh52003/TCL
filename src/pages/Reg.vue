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
          <el-input v-model="ruleForm.username"></el-input>
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
    //   登录
    submitForm(formName) {
        // 判断验证是否通过  
        this.$refs[formName].validate(async valid => {
            if(valid){
                //  let {ruleForm}=this
                // console.log(ruleForm)
                let username=this.ruleForm.username
                let password=this.ruleForm.password
                let {data}=await this.$request.post("/mongoUser/login",{
                        username,password             
                });
                console.log(data)
                // 成功
                if(data.code==1){
                    // 设置localstroage
                     localStorage.setItem("currentUser", JSON.stringify(data.data))
                    this.$message({
                            message: data.msg,
                        });
                    this.$router.push("/home");
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
    // 点击注册
    gotoReg() {
      this.$router.push("/reg");
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