<template>
  <el-container>
    <el-header class="header">
      <el-row>
        <el-col :span="12" class="logo">
          <i class="el-icon-camera"></i>TCL后台管理系统
        </el-col>
        <el-col :span="12" style="text-align:right">
          <span id="span1">欢迎登录：{{username}}</span>
          <el-button type="danger" style="width:50px text-align:center" @click.native="goout()">退出</el-button>
        </el-col>
      </el-row>
    </el-header>

    <el-container class="content">
      <el-aside width="200px">
        <el-menu
         :default-active="activeIndex"
          mode="vertical"
          background-color="#0090CE"
          text-color="#fff"
          active-text-color="#ff0"
          @select="changeMenu"
          :default-openeds="openMenu"
          router
        >
          <template v-for="item in menu">
            <el-menu-item :index="item.path" :key="item.path" v-if="!item.submenu">
              <i :class="item.icon" style="color:#fff"></i>
              {{item.text}}
            </el-menu-item>
            <el-submenu :key="item.path" :index="item.path" v-else>
              <template v-slot:title>
                <i :class="item.icon" style="color:#fff"></i>
                {{item.text}}
              </template>

              <el-menu-item
                :key="sub.path"
                :index="item.path+sub.path"
                v-for="sub in item.submenu"
              >{{sub.text}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <div style="padding:15px 0;">
          <router-view />
          <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pages"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination> -->
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>

export default {
  name: "App",
  data() {
    return {
      
      username:"",
      openMenu: [],
      menu: [
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home",
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user-solid",
        },
        {
          text: "商品管理",
          path: "/list",
          icon: "el-icon-s-grid",
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-shopping-cart-2",
        },
      ],
      activeIndex: "/home",
      current: 0,
    };
  },
  async created(){
    let currentUser=localStorage.getItem("currentUser")
    currentUser=JSON.parse(currentUser)
    // 没有localstorage直接结束并回到登录界面
    if(!currentUser){
      this.$router.push("/login");
      return
    }else{
      // token解密不通过删除。通过则显示用户名
        const {data} = await this.$request.get('/jwtverify',{
          params:{
            authorization:currentUser.authorization
          }
        })
        console.log(data)
        console.log(data.code)
        // 通过
        if (data.code == 1) {
                      this.username=currentUser.username
                      console.log(this.username)
                }
                // 不通过
                else{
                    localStorage.removeItem('currentUser');
                    this.$router.push("/login");
                   
                }
    }
   
  },
  methods: {
    goto(path, idx) {
      console.log(this.$router);
      this.$router.push(path);
      // this.$router.replace(path);
      this.currentIndex = idx;
    },
    changeMenu(path) {
      this.activeIndex = path;
    },
    // 退出
    goout(){
                    localStorage.removeItem('currentUser');
                    this.$router.push("/login");
    }
  },
  
}
    
</script>



<style lang="scss">
body,
html {
  margin: 0;
  height: 100%;
}
.header {
  line-height: 60px;
  color: #fff;
  background-color: #0090ce;
  .logo {
    font-size: 24px;
    color: #fff;
    i {
      font-size: 40px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }
}
.is-active {
  i {
    color: inherit !important;
  }
}
.is-vertical,
.content {
  height: 100%;
}
.el-aside {
  background: #0090ce;
}
#app {
  height: 100%;
}
#span1{
  margin-right: 50px;
}
</style>

