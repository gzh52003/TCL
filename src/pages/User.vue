<template>
  <div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      style="display:inline-block"
    >
      <el-form-item label="查询用户">
        <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click.native="change()" class="btn">新增用户</el-button>

    <el-table :data="userlist" style="width: 100%" class="tablelist">
      <el-table-column label="Name" prop="username"></el-table-column>
      <el-table-column label="Gender" prop="gender"></el-table-column>
      <el-table-column label="Age" prop="age"></el-table-column>
      <el-table-column label="photo" prop="photo">
        <template slot-scope="scope">
                        <!-- scope指整个数据对象。scope.row指当前行数据 -->
                        <img :src="'http://localhost:5000'+scope.row.avatarUrl" alt style="width:50px;height:50px;" />
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
      pages: 0, //总页数
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
      console.log(index, row);
      let id = row._id;
      // 根据id跳转至对应的编辑
      this.$router.push({
        name: "userEdit",
        params: { id },
      });
    },
    // 删除数据
    async handleDelete(index, row) {
      console.log(index, row);
      if (confirm("是否确定删除")) {
        let id = row._id;
        let { data } = await this.$request.delete("/mongoUser/" + id);
        console.log(data);
        if (data.code == 1) {
          // this.userlist = this.userlist.filter((item) => item._id !== id);
          alert(data.msg);
          this.fetchall();
        } else if (data.code == 2) {
          alert(data.msg);
        }
        // console.log(data);
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val; //每页多少条
      this.page = 1; //如果切换每页多少条，回到第一页开始看
      this.fetchall();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`, 666);
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
        // console.log(data, 999);
        this.userlist = data.data;
        this.total = data.total;
        console.log(this.userlist)
        // console.log(this.$refs.imgs)      
        // this.imgurl.push(this.userlist.map(item=>{ return item.avatarUrl}))
        // this.imgurl=this.imgurl[0]
        // console.log(this.imgurl)
      }
  },
  created() {
    // 初始化渲染页面
    this.fetchall();
  },
};
</script>


<style lang="scss">
.btn {
  position: relative;
  top: 8px;
  left: 50px;
}
.el-table__body-wrapper {
  height: 450px;
  overflow-y: auto !important;
}
</style>