<template>
  <div>
    <h1>商品管理</h1>
    <el-table :data="goodslist" style="width: 100%" height="400">
      <!-- 勾选框 -->
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 商品图片 -->
      <el-table-column prop="pic" label="#" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.pic" alt width="80" />
        </template>
      </el-table-column>

      <el-table-column prop="name" label="商品姓名" width="180"></el-table-column>

      <el-table-column prop="price" label="价格"></el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text" size="small" v-on:click="gotoAlterGoods(scope.row._id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
    };
  },
  methods: {
    gotoAlterGoods(id) {
      
      this.$router.push("/list/alterGoods/"+id);
    },
  },
  async created() {
    //创建阶段发送请求获取商品数据
    let { data } = await this.$request.get("/good");
    // 把数据存入goodslist中
    this.goodslist = data.result;
  },
};
</script>

<style>
</style>