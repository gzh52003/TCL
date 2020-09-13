const express = require("express");
const router = express.Router();
const mongo = require("../data/mongo");
const crypto = require("crypto");
const token = require("../data/token");
const { formatData } = require("./tools");

router.get("/check", async(req, res) => {
    let { username } = req.query;
    let result = await mongo.find("some", { username });
    if (result.length > 0) {
        res.send(formatData({ code: 0 }));
    } else {
        res.send(formatData());
    }
});


// 查询返回是一个数组，插入、删除、改都是一堆数据。不能直接用length判断
router.post("/reg", async(req, res) => {
    let { username, password, gender, age } = req.body;
    const hash = crypto.createHash("sha256");
    hash.update(password + "xiaowei");
    password = hash.digest("hex");
    let result;
    try {
        result = await mongo.insert("some", { username, password, gender, age });
        res.send(formatData({ msg: "注册成功" }));
    } catch {
        res.send(formatData({ code: 2, msg: "注册失败" }));
    }
});
// 手机号+验证码登录
router.post("/loginphone", async(req, res) => {
    let { username,checked, vcode } = req.body;
    // console.log(vcode)
    // console.log(req.session.vcode)
    if (vcode != req.session.vcode) {
        res.send(formatData({ code: 3, msg: "验证码错误" }));
        return;
    }
    let result = await mongo.find(
        "some", { username }, { field: { password: false } }
    );
    if (result.length > 0) {
        // 判断是否勾选免登陆
        let authorization;
        if (checked) {
            // 创建token
            authorization = token.create({ username }, "148h");
        } else {
            authorization = token.create({ username });
        }
        result = result[0];
        result.authorization = authorization;
        res.send(formatData({ data: result, msg: "登录成功" }));
    } else {
        res.send(formatData({ code: 2, msg: "登录失败" }));
    }
});
// 不带验证码登录（纯账号密码）
router.post("/loginno", async(req, res) => {
    let { username, password,checked } = req.body;
    // console.log(vcode)
    // console.log(req.session.vcode)
    const hash = crypto.createHash("sha256");
    hash.update(password + "xiaowei");
    password = hash.digest("hex");
    let result = await mongo.find(
        "some", { username,password }, { field: { password: false } }
    );
    if (result.length > 0) {
        // 判断是否勾选免登陆
        let authorization;
        if (checked) {
            // 创建token
            authorization = token.create({ username }, "148h");
        } else {
            authorization = token.create({ username });
        }
        result = result[0];
        result.authorization = authorization;
        res.send(formatData({ data: result, msg: "登录成功" }));
    } else {
        res.send(formatData({ code: 2, msg: "登录失败" }));
    }
});
// 带验证码的注册
router.post("/regvcode", async(req, res) => {
    let { username, password, gender, age,vcode } = req.body;
    if (vcode != req.session.vcode) {
        res.send(formatData({ code: 3, msg: "验证码错误" }));
        return;
    }
    const hash = crypto.createHash("sha256");
    hash.update(password + "xiaowei");
    password = hash.digest("hex");
    let result;
    try {
        result = await mongo.insert("some", { username, password, gender, age });
        res.send(formatData({ msg: "注册成功" }));
    } catch {
        res.send(formatData({ code: 2, msg: "注册失败" }));
    }
});
// 带验证码登录
router.post("/login", async(req, res) => {
    let { username, password, checked, vcode } = req.body;
    // console.log(vcode)
    // console.log(req.session.vcode)
    if (vcode != req.session.vcode) {
        res.send(formatData({ code: 3, msg: "验证码错误" }));
        return;
    }
    const hash = crypto.createHash("sha256");
    hash.update(password + "xiaowei");
    password = hash.digest("hex");
    let result = await mongo.find(
        "some", { username, password }, { field: { password: false } }
    );
    if (result.length > 0) {
        // 判断是否勾选免登陆
        let authorization;
        if (checked) {
            // 创建token
            authorization = token.create({ username }, "148h");
        } else {
            authorization = token.create({ username });
        }
        result = result[0];
        result.authorization = authorization;
        res.send(formatData({ data: result, msg: "登录成功" }));
    } else {
        res.send(formatData({ code: 2, msg: "登录失败" }));
    }
});



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
router.get("/select", async(req, res) => {
    let { page, size, sort = "add_time" } = req.query;
    const skip = (page - 1) * size; //0
    const limit = size * 1; //10

    // 处理排序参数
    sort = sort.split(","); // ['price'],['price','-1']
    const result = await mongo.find(
        "some", {}, { skip, limit, field: { password: false } }
    );
    const result2 = await mongo.find("some");
    let total = result2.length;
    res.send({ data: result, total });
});
// 模糊查询
router.get("/vague", async(req, res) => {
    let { name } = req.query;
    // 在nodejs使用mogo的模糊查询必须使用构造函数的正则表达式，不能使用//
    var str = ".*" + name + ".*$";
    var reg = new RegExp(str);
    let result = await mongo.find(
        "some", { username: reg }, { field: { password: false } }
    );
    if (result.length > 0) {
        res.send(formatData({ data: result }));
    } else {
        res.send(formatData());
    }
});
router.delete("/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const result = await mongo.remove("some", { _id: id });
        res.send(formatData({ code: 1, msg: "删除成功" }));
    } catch (err) {
        res.send(formatData({ code: 2, msg: "删除失败" }));
    }
});
// 获取单个用户信息
router.get("/:id", async(req, res) => {
    const { id } = req.params;
    console.log("id=", id);
    // 过滤密码
    const result = await mongo.find(
        "some", { _id: id }, { field: { password: false } }
    );
    res.send(formatData({ data: result[0] }));
});

// 更改
router.put("/:id", async(req, res) => {
    const { id } = req.params;
    let { password, age, gender } = req.body;
    let newData = { age, gender };
    if (password) {
        const hash = crypto.createHash("sha256");
        hash.update(password + "xiaowei");
        password = hash.digest("hex");
        newData.password = password;
    }
    try {
        await mongo.update("some", { _id: id }, { $set: newData });
        res.send(formatData({ data: { _id: id, ...newData } }));
    } catch (err) {
        res.send(formatData({ code: 2, msg: "更改失败" }));
    }
});

module.exports = router;