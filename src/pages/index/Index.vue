 
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
          router
          :default-active="$route.path"
          style="height:100%"
          mode="vertical"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ff0"
          :default-openeds="openMenu"
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
      username: "",
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
          submenu: [
            {
              text: "添加用户",
              path: "/add",
            },
            {
              text: "用户列表",
              path: "/UserList",
            },
          ],
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
    };
  },
  async created() {
    let currentUser = localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUser);
    this.username = currentUser.username;

    // 注释这段为原生的代码，更新的为采取vue路由守卫实现
    // 没有localstorage直接结束并回到登录界面
    // if(!currentUser){
    //   this.$router.push("/login");
    //   return
    // }else{
    //   // token解密不通过删除。通过则显示用户名
    //     const {data} = await this.$request.get('/jwtverify',{
    //       params:{
    //         authorization:currentUser.authorization
    //       }
    //     })
    //     // console.log(data)
    //     // console.log(data.code)
    //     // 通过
    //     if (data.code == 1) {
    //                   this.username=currentUser.username
    //                   // console.log(this.username)
    //             }
    //             // 不通过
    //             else{
    //                 localStorage.removeItem('currentUser');
    //                 this.$router.push("/login");

    //             }
    // }
  },
  methods: {
    // 退出
    goout() {
      localStorage.removeItem("currentUser");
      this.$router.push("/login");
    },
  },
};
</script>



<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
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
#span1 {
  margin-right: 50px;
}
.box {
  height: 100%;
}
.el-menu {
  background: #0090ce !important;

  .el-menu-item {
    background: #0090ce !important;
  }
  .el-submenu__title {
    background: #0090ce !important;
  }
  .el-menu-item {
    min-width: 199px !important;
  }
}
.el-main {
  width: 100%;
  height: 100%;
}
.el-submenu__title .el-submenu__icon-arrow {
  color: red;
}
</style>


