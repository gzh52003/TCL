## 项目名称:TCL

### 演示

```
*官网:http://m.tcl.com/
*上线网址:
	*后台管理系统:http://http://120.25.229.45:8080/#/home
	*webapp:http://http://120.25.229.45:8081/#/home
```

### git仓库地址 : github.com/gzh52003/TCL

### 团队分工

```
*组长:谭铭杰 成员:梁剑威,钟地发
*梁剑威负责完成
	*后台管理程序:登录注册模块,路由权限判断,用户管理模块,接口
	*webapp:登录注册模块,路由权限判断,购物车模块,详情页,接口
*谭铭杰负责完成
	*后台管理程序:商品管理模块
	*webapp:分类页(未完成跳转详情页功能)
*钟地发负责首页
	*后台管理系统：项目没有参加（没进团队），私下练习注册，商品管理
	*webapp:首页，售后服务，商品轮播路由跳转详情，回到顶部
```

### 项目页面截图

![](E:\html三阶段\workbook\TCLApp\TCL\webapp\微信图片_20200909112032.png)

![](E:\html三阶段\workbook\TCLApp\TCL\webapp\微信图片_20200909112011.png)

![](E:\html三阶段\workbook\TCLApp\TCL\webapp\微信图片_20200909112039.png)

![](E:\html三阶段\workbook\TCLApp\TCL\webapp\微信图片_20200909112048.png)

![](E:\html三阶段\workbook\TCLApp\TCL\webapp\微信图片_20200909112054.png)

├─api		//所有访问的接口
│  ├─data	//封装的方法
│  └─router	//接口路由文件
├─tcl		//后台管理系统
│  ├─public	
│  ├─src 	//模块文件
│  │  ├─assets
│  │  ├─components
│  │  ├─pages
│  │  │  ├─index
│  │  │  ├─list
│  │  │  └─user
│  │  ├─router
│  │  └─utils
│  └─tool
└─webapp		//移动端
    ├─public	//网页部分图片
    │  ├─img
    │  └─vue-ico
    └─src	//模块文件
        ├─assets
        │  └─router
        ├─store
        ├─utils
        └─views
            └─Discover-module