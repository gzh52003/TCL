// 引入模块
const http = require('http');
const ws=require("ws");
const express=require("express");
const Allrouter=require("./router")

// const mysql=require("mysql");
// 创建服务器
const app=express();


// 开启静态中间件
app.use(express.static("./"));
// 利用http模块连接express服务器与socket服务器
const server = http.createServer(app)
// 开启路由
app.use(Allrouter)
// 启动websocket服务器
const wss=new ws.Server({
    server
})
// 注意：必须使用createServer返回的服务器监听端口
server.listen(5000,()=>{
    console.log('server is running 5000');
})
// 监听事件
wss.on('connection',(client)=>{
    // 当客户端连接socket服务器时，触发connection事件，传递客户端对象，并把所有客户端对象保存在wss.clients属性中
    // client：客户端对象
    // console.log('connection',wss.clients.size);
    // 接受前端发来的信息
    client.on('message',(msg)=>{
        // console.log('msg',msg);

        // 收到信息，广播给所有连接的用户
        wss.clients.forEach(item=>{
            item.send(msg);
        })
    })
})




