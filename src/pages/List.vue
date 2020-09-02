<template>
  <div>
    <el-table ref="multipleTable" :data="goodslist" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="#" width="120">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="img_url" label="图片">
        <template v-slot:default="scope" class="topian">
          <img :src="scope.row.img_url" style="width:60px" />
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="120"></el-table-column>

      <el-table-column prop="category" label="款式" width="120"></el-table-column>
      <el-table-column prop="price" label="价格" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template v-slot:default="scope">
          <!-- 删除 -->
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            @click="deletegoods(scope.row._id)"
          ></el-button>
          <!-- 编辑 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
            @click="gotoalterGoods(scope.row._id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1, //当前页
      size: 10, //一页多少条
      goodslist: [],
      total: 0, //总条数
      pages: 0, //总页数
    };
  },

  methods: {
    // 删除
    async deletegoods(id) {
      // console.log(333);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      }).then(async () => {
        const { data } = await this.$request.delete("/good/" + id);
        // console.log(data);
        if (data.code === 1) {
          this.goodslist = this.goodslist.filter((item) => {
            // 留下不等于id的商品
            return item._id !== id;
          });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        }
      });
    },
    // 编辑跳转
    async gotoalterGoods(id) {
      // console.log(444);
      this.$router.push({
        name: "alterGoods",
        params: { id },
      });
    },

    // 分页
    handleSizeChange(val) {
      this.size = val; //每页多少条
      this.page = 1; //如果切换每页多少条，回到第一页开始看
      console.log(val);
      this.fetchall();
    },

    handleCurrentChange(val) {
      this.page = val;

      this.fetchall();
    },

    async fetchall() {
      let page = this.page;
      let size = this.size;
      const { data } = await this.$request.get("/good", {
        params: {
          page,
          size,
        },
      });
      this.goodslist = data.data;
      // console.log(data);
    },
  },
  // 创建阶段发送请求获取商品
  async created() {
    const res = await this.$request.get("/good/many");
    // console.log(res.data.data);
    this.goodslist = res.data.data;

    const { data } = await this.$request.get("/good/many", {
      params: {
        page: this.page,
        size: this.size,
      },
    });
    // this.fetchall();
    this.total = data.data.length;
  },
};
</script>
<style lang="scss" scoped>
</style>
  