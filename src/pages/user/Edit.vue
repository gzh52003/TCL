<template>
  <div>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" disabled></el-input>
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
    
       <img :src="imgsrc" alt="" class="imgbox">
       <p><input type="file" @change="change"></p>
         <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
       
    </el-form>
    <!-- 图片上传 -->
     <!-- <el-form-item prop="avatar" label="上传图片"> -->
    <!-- <el-upload
      prop="avatar"
      class="upload-demo"
      action="https://localhost:5000/upload/avatar"
      ref="upload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      list-type="picture"
      multiple
    >
  
      <el-button size="small" type="primary" @change.native="change">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->
       <!-- </el-form-item> -->
      
  </div>
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
      // 图片上传
      imgsrc:"",
      id:"",
      path: "/user",
      component: "",
      ruleForm: {
        username: "",
        gender: "",
        age: "",
      },
      rules: {
        username: [{ trigger: "blur" }],
        gender: [{ trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  
   
  methods: {
    // 图片上传
    async change(e){
                let _id=this.id
                console.log(_id);
                // 创建一个用户存放数据的容器
                const data = new FormData();
                data.append('avatar',e.target.files[0]);
                data.append('_id',_id);
                console.log(data)
                const result = await fetch('http://localhost:5000/upload/avatar',{
                    method:"post",
                    body: data                         
                }
                ).then(res=>res.json())
                console.log(result)
                console.log(result.data.avatarUrl)
                this.imgsrc="http://localhost:5000/public"+result.data.avatarUrl;
                  console.log(this.imgsrc)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { ruleForm } = this;
          console.log(this);
          const { _id } = ruleForm;
          console.log(_id);
          console.log(ruleForm);
          const { data } = await this.$request.put("/mongoUser/" + _id, {
            ...ruleForm,
          });
          console.log(data);
          alert("修改成功");
          this.$router.push({
            name: "user",
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  async created() {
    let { id } = this.$route.params;
    const { data } = await this.$request.get("/mongoUser/" + id);
    this.id=id
    Object.assign(this.ruleForm, data.data);

    // console.log(id)
  },
};
</script>


<style lang="scss">
.imgbox{
  width: 100px;
  height:100px;
}
</style>