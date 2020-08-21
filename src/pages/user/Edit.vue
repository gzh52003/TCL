<template>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="姓名" prop="username">
    <el-input type="text" v-model="ruleForm.username" autocomplete="off" disabled ></el-input>
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
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
    //   var validatePass = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请输入用户名'));
    //     } else {
    //       if (this.ruleForm.checkPass !== '') {
    //         this.$refs.ruleForm.validateField('checkPass');
    //       }
    //       callback();
    //     }
    //   };
    //   var validatePass2 = (rule, value, callback) => {
    //     if (value === '') {
    //       callback(new Error('请再次输入密码'));
    //     } else if (value !== this.ruleForm.pass) {
    //       callback(new Error('两次输入密码不一致!'));
    //     } else {
    //       callback();
    //     }
    //   };
      return {
           path:"/user",
           component: "",
        ruleForm: {
          username: '',
          gender: '',
          age: ''
        },
        rules: {
          username: [
            {trigger: 'blur' }
          ],
          gender: [
            { trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate(async(valid) => {
          if (valid) {
            const {ruleForm} = this
            console.log(this)
            const {_id}=ruleForm
            console.log(_id)
            console.log(ruleForm)
            const {data} = await this.$request.put("/mongoUser/"+_id,{
              ...ruleForm
          });
        console.log(data)
        alert('修改成功');
            this.$router.push({
            name:'user',
          })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    },
     async created() {
        const { id } = this.$route.params;
        console.log(id)
        const { data } = await this.$request.get("/mongoUser/" + id);
        // this.userid = id;
        console.log(data)
        Object.assign(this.ruleForm, data.data);
  },
  }

</script>