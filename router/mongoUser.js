const express=require("express")
const router=express.Router();
const mongo=require("../data/mongo")
const crypto = require('crypto');
const token=require("../data/token");

router.get("/check",async(req,res)=>{
    let {username}=req.query;

    let result=await mongo.find("some",{username})
    if(result.length>0){
        res.send({"type":"err","msg":"用户名已存在"})
    }else{
        res.send({"type":"sucess","msg":"√"})
    }
})

// 查询返回是一个数组，插入、删除、改都是一堆数据。不能直接用length判断
router.post("/reg",async(req,res)=>{
    let {username,password}=req.body;
    const hash=crypto.createHash("sha256");
    hash.update(password+"xiaowei"); 
    password=hash.digest("hex");
    let result
    try{
        result=await mongo.insert("some",{username,password})
        console.log(result)
        res.send({"type":"sucess","msg":"注册成功"})
    }catch{
        res.send({"type":"err","msg":"注册失败"})
    }
}
)
// 登录
router.post("/login",async(req,res)=>{
    let {username,password,checkbox,vcode}=req.body;
    if(vcode!=req.session.vcode){
        res.send({"type":"error11","msg":"验证码错误"})
        return
    }
    const hash=crypto.createHash("sha256");
    hash.update(password+"xiaowei"); 
    password=hash.digest("hex");
    let result=await mongo.find("some",{username,password})
    if(result.length>0){
        // 判断是否勾选免登陆
        let authorization;
        if(checkbox=="true"){
            // 创建token
            authorization=token.create({username},10000)
            
        }else{
            authorization=token.create({username})
        }
            result=result[0];
            result.authorization=authorization
            console.log("result=",result)
            res.send({data:result})
        
    }else{
        res.send({"type":"err","msg":"登录失败"})
    }
})


router.delete('/:id',async (req,res)=>{
    const {id} = req.params;
    try{
        const result = await mongo.remove('some',{_id:id})
        res.send({"type":"sucess"})
    }catch(err){
        res.send({"type":"fail"});
    }

})


// router.put('/:id',async (req,res)=>{
//     const {id} = req.params;
//     const {name,pass}=req.body;
//     var t
//     if(name && pass){
//         t={$set:{username:name,password:pass}}
//     }else if(name){
//         t={$set:{username:name}}
//     }else if(pass){
//         t={$set:{password:pass}}
//     }
    
//     try{
//         const result = await mongo.update('some',{_id:id},t)
//         res.send({"type":"sucess"})

//     }catch(err){
//         res.send({"type":"fail"});
//     }

// })
// 获取所有用户信息
router.get("/select",async(req,res)=>{
    const result = await mongo.find('some');
    console.log(result)
    res.send({data:result})
})
// 获取单个用户信息、
router.get('/:id',async(req,res)=>{
    const {id} = req.params;console.log('id=',id)
    const result = await mongo.find('some',{_id:id});
    // console.log(result)
    res.send({data:result[0]});
})
// 更改
router.put('/:id',async (req,res)=>{
    const {id} = req.params;
    let {password,age,gender} = req.body;
    console.log(age,gender)
    let newData = {age,gender}
    if(password){
        const hash=crypto.createHash("sha256");
        hash.update(password+"xiaowei"); 
        password=hash.digest("hex");
        newData.password = password
    }

    try{
        console.log(newData)
        await mongo.update('some',{_id:id},{$set:newData});
        res.send({data:{_id:id,...newData}})
    }catch(err){
        // console.log('err=',err);
        res.send({"type":"err","msg":"更改失败"})
    }
    
    
})
module.exports=router