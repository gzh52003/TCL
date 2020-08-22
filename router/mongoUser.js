const express = require("express")
const router = express.Router();
const mongo = require("../data/mongo")
const crypto = require('crypto');
const token = require("../data/token");
const {formatData} = require('./tools');

router.get("/check", async (req, res) => {
    let { username } = req.query;
    console.log(username,1)
    let result = await mongo.find("some", { username })
    console.log(result,123)
    if (result.length > 0) {
        // res.send({ "type": "err", "msg": "用户名已存在" })
        res.send(formatData({code:0}))
    } else {
        // res.send({ "type": "sucess", "msg": "√" })
        res.send(formatData())
    }
})

// 查询返回是一个数组，插入、删除、改都是一堆数据。不能直接用length判断
router.post("/reg", async (req, res) => {
    let { username, password } = req.body;
    const hash = crypto.createHash("sha256");
    hash.update(password + "xiaowei");
    password = hash.digest("hex");
    let result
    try {
        result = await mongo.insert("some", { username, password })
        // console.log(result)
        // res.send({ "type": "sucess", "msg": "注册成功" })
        res.send(formatData({msg:"注册成功"}))
    } catch{
        // res.send({ "type": "err", "msg": "注册失败" })
        res.send(formatData({code:2,msg:"注册失败"}))
    }
}
)
// 登录
router.post("/login", async (req, res) => {
    let { username, password, checked, vcode } = req.body;
    // if (vcode != req.session.vcode) {
    //     res.send({ "type": "error11", "msg": "验证码错误" })
    //     return
    // }
    const hash = crypto.createHash("sha256");
    hash.update(password + "xiaowei");
    password = hash.digest("hex");
    console.log(password,23)
    let result = await mongo.find("some", { username, password })
    if (result.length > 0) {
        // 判断是否勾选免登陆
        let authorization;
        if (checked == "true") {
            // 创建token
            authorization = token.create({ username }, 10000)

        } else {
            authorization = token.create({ username })
        }
        result = result[0];
        result.authorization = authorization
        // console.log("result=", result)
        // res.send({ data: result })
        res.send(formatData({data:result,msg:"登录成功"}))

    } else {
        // res.send({ "type": "err", "msg": "登录失败" })
        res.send(formatData({code:2,msg:"登录失败"}))
    }
})


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await mongo.remove('some', { _id: id })
        // console.log(result)
        // res.send({ data: result })
        res.send(formatData({code:1,msg:"删除成功"}))
    } catch (err) {
        // res.send({ "type": "fail" });
        res.send(formatData({code:2,msg:"删除失败"}))
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
router.get("/select", async (req, res) => {
    console.log(req.query,666777)
    let { page, size, sort = "add_time" } = req.query;
    // console.log(page,size,666)
    const skip = (page - 1) * size; //0
    const limit = size * 1; //10


    // 处理排序参数
    sort = sort.split(',');// ['price'],['price','-1']
    const result = await mongo.find('some', {}, { skip, limit });
    const result2 = await mongo.find('some');
    let num = Math.ceil(result2.length / size)
    let total  = result2.length
    // console.log(result2,999)
    res.send({ data: result, num,total , page, size})
})
// 获取单个用户信息、
router.get('/:id', async (req, res) => {
    const { id } = req.params; console.log('id=', id)
    const result = await mongo.find('some', { _id: id });
    // console.log(result)
    res.send({ data: result[0] });
})
// 更改
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    let { password, age, gender } = req.body;
    // console.log(age, gender)
    let newData = { age, gender }
    if (password) {
        const hash = crypto.createHash("sha256");
        hash.update(password + "xiaowei");
        password = hash.digest("hex");
        newData.password = password
    }

    try {
        console.log(newData)
        await mongo.update('some', { _id: id }, { $set: newData });
        res.send({ data: { _id: id, ...newData } })
    } catch (err) {
        // console.log('err=',err);
        res.send({ "type": "err", "msg": "更改失败" })
    }


})

// 模糊查询
// router.get("/ss",async (req,res)=>{
// //    //1、创建查询条件query
// //    var query={};
// //    //2、判断是否获取到参数，get方法请使用req.query.proname
        
// //    //3、添加匹配规则，创建查询条件
// //           query['username']=new RegExp(req.query.name);//模糊查询参数
// //          //多个条件时依次添加即可
// //          //查询字段为数字时，req.body.number获取的类型为字符串，需注意是否与数据库相应字段类型保持一致
        
// //     //    operate("find","collectionName",query,function(result){
// //     //        console.log(result);
// //     //        res.send(result);
// //     //    })
// //     let result = await mongo.find("some",query)
// //     console.log(result,123)
//             let {name} = req.query
//             console.log(name)
//             // var str=".*"+name+".*$"
//             // var reg = new RegExp(str)
//             // let result = await mongo.find("some",{"username":reg})
//             // console.log(result,123)
// })
// router.get('/ss', async (req, res) => {
//     // console.log(req)
//     // const { user } = req.query
//     // console.log(user)
//     // let result=await mongo.find("some",{username:user})
//     // console.log(result)
//     // res.send({data:result})
//     let { username } = req.query;
//     console.log(username,1)
//     let result = await mongo.find("some", { username })
//     console.log(result,123)
//     if (result.length > 0) {
//         // res.send({ "type": "err", "msg": "用户名已存在" })
//         res.send(formatData({code:0}))
//     } else {
//         // res.send({ "type": "sucess", "msg": "√" })
//         res.send(formatData())
//     }
// })




router.get("/ss", async (req, res) => {
    let { user } = req.query;
    console.log(user,1)
    let result = await mongo.find("some", { username:user })
    console.log(result,123)
    if (result.length > 0) {
        // res.send({ "type": "err", "msg": "用户名已存在" })
        res.send(formatData({code:0}))
    } else {
        // res.send({ "type": "sucess", "msg": "√" })
        res.send(formatData())
    }
})

module.exports = router