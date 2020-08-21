<template>
  <div class="main">
    <div class="login-form">
      <h2 class="login-title">TCL后台管理系统-登录</h2>
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
          <el-checkbox v-model="ruleForm.checked" @click.native="keep($event)">保留7天免登陆</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="gotoReg">注册</el-button>
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
        checked: true
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
                let checked=this.ruleForm.checked
                let {data}=await this.$request.post("/mongoUser/login",{
                        username,password,checked             
                });
                console.log(data)
                if(data.code==1){
                     localStorage.setItem("currentUser", JSON.stringify(data.data))
                    this.$message({
                            message: data.msg,
                        });
                    this.$router.push("/home");
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
    // 判断有没勾选免登陆
    keep(eve){
      if (eve.target.tagName=="INPUT") return;
      console.log(this.ruleForm.checked)
      if(!this.ruleForm.checked){
        this.$message({
          message: "请不要在公共场合使用该功能",
          type: "warning"
        });
      }
    }
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
  background: url(./1.jpg);
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