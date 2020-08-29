<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select v-model="ruleForm.gender">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
        <el-option label="保密" value="保密"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      path: "/user",
      component: "",
      // 控制用户是否存在

      ruleForm: {
        username: "",
        gender: "",
        age: "",
        password:""
      },
      rules: {
        username: [{ trigger: "blur" }],
        gender: [{ trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { ruleForm } = this;
          let { data } = await this.$request.get("/mongoUser/check", {
            params: {
              ...ruleForm,
            },
          });
          console.log(data)
          console.log(data.code);
          if (data.code === 0) {
            this.$message({
              message:"用户名已存在"
            })
            return;
          } else if (data.code === 1) {
            let { data } = await this.$request.post("/mongoUser/reg", {
              ...ruleForm,
            });
            console.log(data);
             this.$message({
              message:"新增成功"
            })
            this.$router.push({
              name: "UserList",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.demo-ruleForm{
  width: 600px;
}
</style>