<template>
    <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="display:inline-block"
    >
      <el-form-item label="查询用户">
        <el-input v-model="formInline.user" placeholder="请输入姓名" @keyup.13.native="onSubmit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="userlist" style="width: 100%" class="tablelist">
      <el-table-column label="Name" prop="username"></el-table-column>
      <el-table-column label="Gender" prop="gender"></el-table-column>
      <el-table-column label="Age" prop="age"></el-table-column>
      <el-table-column label="photo" prop="photo">
        <template slot-scope="scope">
                        <!-- scope指整个数据对象。scope.row指当前行数据 -->
                        <img :src="scope.row.avatarUrl" alt style="width:50px;height:50px;" />
                    </template>
        </el-table-column>
      <el-table-column align="right">
        <template v-slot:="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
       </el-table>
        <!-- 分页 -->

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pages"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
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
      
      userlist: [],
      page: 1, //当前页
      pagesize: 10, //一页多少条
      total: 0, //总条数
      pages: 0, //控制页码所在下标
      // imgurl:[],
      formInline: {
        user: "",
        region: "",
      },
    };
  },
  methods: {
    // 模糊查询
    async onSubmit() {
      let { user } = this.formInline;
      let { data } = await this.$request.get("/mongoUser/vague", {
        params: {
          name: user,
        },
      });
      // console.log("data",data)
      this.total = data.data.length;
      this.userlist = data.data;
    },
    change() {
      // 新增用户
      this.$router.push({
        name: "add",
      });
    },
    // 编辑
    handleEdit(index, row) {
    //   console.log(index, row);
      let id = row._id;
      let page=this.page
    //   console.log(page)
      // 根据id跳转至对应的编辑
      this.$router.push({
        name: "userEdit",
        params: { id,page },
      });
    },
    // 删除数据
    async handleDelete(index, row) {
      // console.log(index, row);
      if (confirm("是否确定删除")) {
        let id = row._id;
        let { data } = await this.$request.delete("/mongoUser/" + id);
        if (data.code == 1) {
        this.$message({
          message:data.msg
        })
          this.fetchall();
        } else if (data.code == 2) {
          this.$message({
          message:data.msg
        })
        }
      }
    },
    // 分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val; //每页多少条
      this.page = 1; //如果切换每页多少条，回到第一页开始看
      this.fetchall();
    },
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`, 666);
      this.page = val;
      this.fetchall();
    },
    async fetchall() {
      let page = this.page;
      let size = this.pagesize;    
      const { data } = await this.$request.get("/mongoUser/select", {
          params: {
            page,
            size,
          },
        });
        // console.log(data)
        this.userlist = data.data;
        this.total = data.total;   
      }
  },
  created() {
    //   根据当前页数进行渲染
       let { page } = this.$route.params;
        this.handleCurrentChange(page)
        this.pages=page
    
    
  },
};

</script>
<style lang="scss">
.el-table__body-wrapper {
  height: 450px;
  overflow-y: auto !important;
}
</style>