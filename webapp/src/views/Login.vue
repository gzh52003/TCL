<template>
  <div>
    <!-- <div class="header sizing">
      <van-icon name="arrow-left" class="left" />
      <span class="JS-nav-title">个人中心</span>
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>-->
  </div>
</template>

<script>
import Vue from "vue";
import { Form, Field } from "vant";
Vue.use(Form);
Vue.use(Field);
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  width: 100%;
  height: 52.76px;

  .JS-nav-title {
    line-height: 52.76px;
    text-align: center;
    font-size: 20px;
    padding-left: 35%;
  }
  .left {
    font-size: 24px;
  }
}
</style>