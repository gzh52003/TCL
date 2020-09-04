// 引入模块
const express=require("express");
const Allrouter=require("./router")

// const mysql=require("mysql");
// 创建服务器
const app=express();


// 开启静态中间件
app.use(express.static("./"));
// 开启路由
app.use(Allrouter)


app.listen(5000,()=>{
    console.log("begin server 5000")
})
