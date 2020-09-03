<template>
  <div style="position:relative;top:-33px">
    <el-row>
      <el-col :span="12">
        <h1>商品管理</h1>
      </el-col>
      <el-col :span="12">
        <el-form
          :inline="true"
          :model="formInline"
          class="demo-form-inline"
          style="padding:11px 0;height:40px"
        >
          <el-form-item label="查询商品">
            <el-input
              v-model="formInline.name"
              placeholder="请输入商品姓名"
              @keyup.enter.native="onSubmit"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  
    <el-table :data="goodslist" style="width: 100%" height="400" >
      <!-- 勾选框 -->

           <!-- <el-table-column type="selection" width="55">
          </el-table-column>  -->
    

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
          <el-button
            type="text"
            size="small"
            v-on:click="deleteGoods(scope.row._id,scope.row.name)"
          >删除</el-button>
          <el-button type="text" size="small" v-on:click="gotoAlterGoods(scope.row._id)">编辑</el-button>
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
        style="text-align:center"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goodslist: [],
      page: 1, //当前页
      size: 10, //一页多少条
      total: 0, //总条数
      pages: 0, //总页数
      formInline: {
        name: "",
      },
    };
  },
  methods: {
  
    // 模糊查询
    async onSubmit() {
      console.log(1);
      let { name } = this.formInline;
      let { data } = await this.$request.get("/good/vague", {
        params: {
          name,
        },
      });
      this.total = data.data.length;
      this.goodslist = data.data;
    },
    //编辑数据
    gotoAlterGoods(id) {
      this.$router.push("/list/alterGoods/" + id);
    },
    //删除数据
    deleteGoods(id, name) {
      const h = this.$createElement;
      this.$msgbox({
        title: "警告！",
        message: h("p", null, [
          h("span", null, "确定要删除 "),
          h("i", { style: "color: teal" }, name),
        ]),
        type: "warning",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = "执行中...";
            setTimeout(() => {
              done();
              setTimeout(() => {
                instance.confirmButtonLoading = false;
              }, 300);
            }, 2000);
          } else {
            done();
          }
        },
      }).then(async () => {
        //删除数据
        console.log(id);
        const { data } = await this.$request.delete("/good/" + id);
        if (data.code === 1) {
          //重新渲染
          this.goodslist = this.goodslist.filter((item) => item._id !== id);
          this.$message({
            type: "info",
            message: "删除成功" + name + "的数据",
          });
        } else {
          this.$message({
            type: "info",
            message: "删除失败",
          });
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      this.size = val; //每页多少条
      this.page = 1; //如果切换每页多少条，回到第一页开始看
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
    },
  },
  async created() {
    //创建阶段发送请求获取商品数据
    let dataMany = await this.$request.get("/good/many");
    let { data } = await this.$request.get("/good", {
      params: {
        page: this.page,
        size: this.size,
      },
    });

    // 把数据存入goodslist中
    this.goodslist = data.data;
    this.total = dataMany.data.data.length;
    console.log(this.goodslist);
    
  },
};
</script>

<style>
</style>