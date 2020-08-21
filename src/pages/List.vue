<template>
  <div class="xiaoBoxBox">
    <h1>商品管理</h1>
    <el-table :data="goodslist" style="width: 100%" height="400">
      <el-table-column prop="pic" label="#" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.pic" alt width="80" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
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
  async created() {
    let { result } = await fetch(
      "http://localhost:5000/good?size=5"
    ).then((res) => res.json());
    this.goodslist = await result;
    console.log(result);
    // console.log(this.goodslist);
  },
};
</script>

<style>
</style>