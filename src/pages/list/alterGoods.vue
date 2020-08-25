<!-- 商品资料修改 -->
<template>
  <el-row>
    <el-form
      :model="ruleForm"
      status-icon
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-col :span="12">
        <el-form-item label="商品名称">
          <el-input type="text" disabled v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input type="text" v-model.number="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button type="primary" @click="getBack()">返回</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="12" style="text-align:center;">
        <img :src="ruleForm.pic" alt width="180" />
        <input type="file" @change="upload" class="upload_input" />
      </el-col>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    //自定义校验规则
    var checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("价格不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 0) {
            callback(new Error("必须为正数"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      goodsId: "",
      ruleForm: {
        name: "",
        price: "",
        pic: "",
      },
      //校验规则目录
      rules: {
        price: [{ validator: checkPrice, trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // 全校验通过执行
        if (valid) {
          // alert("submit!");
          const { goodsId, ruleForm } = this;
          const { data } = await this.$request.put("/good/" + goodsId, {
            ...ruleForm,
          });
          console.log(data);
          if (data.code === 1) {
            this.$message({
              type: "success",
              message: "修改成功",
            });
            this.getBack()
          } else {
            this.$message({
              type: "fail",
              message: "修改失败",
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getBack() {
      this.$router.back();
    },
    //上传商品图片
    async upload(e) {
      console.log(e);
      //创建容器
      const data = new FormData();
      //把该数据的id值传入容器
      data.set("_id", this.ruleForm._id);
      //把要上传的图片的资料传入容器
      data.set("goods", e.target.files[0]);
      //编辑请求并发送
      const result = await this.$request.put("/upload/goods", data, {
        "Content-Type": "multipart/form-data",
      });
      console.log(result);
      //图片路径用响应回来的数据替代
      this.ruleForm.pic = result.data.data.goodsUrl;
    },
  },

  async created() {
    const { id } = this.$route.params;
    this.goodsId = id;
    let { data } = await this.$request.get("/good/" + id);
    Object.assign(this.ruleForm, data.data);
    // console.log(this.ruleForm);
  },
};
</script>

<style lang="scss">
.upload_input {
  display: block;
  margin: auto;
  width: 168px;
  border: 1px solid rgba(0, 0, 0, 0.418);
  padding: 5px;
}
</style>