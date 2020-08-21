<!-- 商品资料修改 -->
<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="商品名称" >
      <el-input type="text" disabled="" :value="name"></el-input>
    </el-form-item>
    <el-form-item label="商品价格" prop="checkPass">
      <el-input type="text" v-model="ruleForm.checkPass" value=""></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
      <el-button @click="resetForm('ruleForm')">还原</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
      return{
          ruleForm:{
              name:"",
              price:""
          }
      }
  },
  methods: {
  },
  async created(){
      const {id}=this.$route.params
      console.log(id);
      let { data } = await this.$request.get("/good/"+id);
      this.ruleForm={
          name:data.name
      }
  }
};
</script>

<style lang="sass">
    
</style>