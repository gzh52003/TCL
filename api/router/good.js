const express = require("express");
const router = express.Router();
const mongo = require("../data/mongo");
const { formatData } = require("./tools");
// 渲染订单数据
router.get("/shoppingcar", async (req, res) => {
    let result
try{
     result=await mongo.find("list")
     console.log("res",result)
    res.send(formatData({code:1,data:result}))
}catch(err){
    res.send(formatData({code:0}))
}
})
// // 带正则匹配的订单数据渲染数据可视化
// router.get("/regshop", async(req, res) => {
//     const { name } = req.query;
//     console.log(name)
//     let reg = new RegExp(".*" + name + ".*$", "i");
//     let result1,result2

//         try {
//              result2= await mongo.find("list",{
//                 name:reg,
//                  });
//                 res.send(formatData({ data: result2 }));
//         } catch (err) {
//         res.send(formatData({ code: 0 }));
//     }
   
   
// });
// 订单数据
router.get("/shopdata", async(req, res) => {
    const { page = 1, size = 5 } = req.query;
    const skip = (page - 1) * size;
    const limit = size * 1;
    try {
        const result = await mongo.find("list", {}, { limit, skip });
        res.send(formatData({ data: result }));
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});
// 获取home的商品信息
router.get("/home", async(req, res) => {
    let { type } = req.query;
    const result = await mongo.find("Goods", { type });
    res.send(formatData({ data: result }));
});
//获取商品列表全部数据的接口
router.get("/many", async(req, res) => {
    try {
        const result = await mongo.find("Goods");
        res.send(formatData({ data: result }));
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});
//获取商品列表有限的数据的jie口
router.get("/", async(req, res) => {
    const { page = 1, size = 5 } = req.query;
    const skip = (page - 1) * size;
    const limit = size * 1;
    try {
        const result = await mongo.find("Goods", {}, { limit, skip });
        res.send(formatData({ data: result }));
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});





//模糊搜索商品数据接口
router.get("/vague", async(req, res) => {
    const { name } = req.query;
    let reg = new RegExp(".*" + name + ".*$", "i");
    try {
        const result = await mongo.find("Goods", { name: reg });
        res.send(formatData({ data: result }));
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});
// 获取cart中的数据
router.get("/cart", async(req, res) => {
    let {userid}=req.query
    try {
        const result = await mongo.find("cart",{userid});
        res.send(formatData({ data: result }));
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});
// 获取空调类商品
router.get("/air", async(req, res) => {
    const { name } = req.query;
    console.log("111", name);
    try {
        const result = await mongo.find("Goods", { secondParentCategory: name });
        res.send(formatData({ data: result }));
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});

router.get("/:id/kucun", async(req, res) => {
    const { id } = req.params;

    // 读取数据库的库存信息
    const result = await mongo.find("cart", { _id: id });
    res.send(formatData({ data: result[0].kc }));
});
//获取特效商品数据
router.get("/:id/zuixin", async(req, res) => {
    const { id } = req.params;
    console.log("sss",id)

    try {
        // const result = await mongo.find("Goods", {"retData.productList.uuid":{uuid:id}});
        let result=await mongo.find("Goods",{"retData.productList":{"$elemMatch":{
            "uuid":id,
             }}})
           
        // console.log("re=",result)
        result=result[0].retData.productList
        result=result.filter(item=>item.uuid===id)
        console.log(result[0])
       
        res.send(formatData({ data: result[0] }));
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});

//获取指定商品数据
router.get("/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const result = await mongo.find("Goods", { _id: id });
        res.send(formatData({ data: result[0] }));
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});

//更改指定商品数据
router.put("/:id", async(req, res) => {
    const { id } = req.params;
    //获取要修改的属性
    const { price, pic } = req.body;

    let newData = { price, pic };

    try {
        const result = await mongo.update("Goods", { _id: id }, { $set: newData });
        res.send(formatData());
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});
// 清空购物车
router.delete("/all", async(req, res) => {
    let {userid}=req.query
    // console.log("222",userid)
    try {
        const result = await mongo.remove("cart",{userid});
        res.send(formatData());
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});
//删除购物车指定商品数据
router.delete("/:id/car", async(req, res) => {
    const { id } = req.params;
    let {userid}=req.query
    console.log(userid)
    try {
        const result = await mongo.remove("cart", { _id: id,userid });
        res.send(formatData());
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});
//删除指定商品数据
router.delete("/:id", async(req, res) => {
    const { id } = req.params;
    try {
        const result = await mongo.remove("Goods", { _id: id });
        res.send(formatData());
    } catch (err) {
        res.send(formatData({ code: 0 }));
    }
});
// 获取列表页数据
router.get('/list/:id',async(req,res)=>{
    const {id}=req.params;
    try{
        const result=await mongo.find("Goods",{_id:id})
        res.send(formatData({code:1,data:result}))
    }catch(err){
        res.send(formatData({code:0}))
    }
})
// // 获取列表页到详情页数据
// router.get('/shopcar/:id',async(req,res)=>{
//     const {id,pic,name,promotionPrice,price,type}=req.params;
//     console.log("shuju",id,pic,name,promotionPrice,price,type)
//     try{
//         const result=await mongo.find("Goods",{_id:id})
//         res.send(formatData({code:1,data:result}))
//     }catch(err){
//         res.send(formatData({code:0}))
//     }
// })
// 添加结算商品到订单表
router.post("/listserver", async (req, res) => {
    // console.log(req.query)
    let {list}=req.body
    console.log("123===",list)
let result;
try {
    result = await mongo.insert("list", { list});
    res.send(formatData({ msg: "成功" }));
} catch {
    res.send(formatData({ code: 2, msg: "失败" }));
}
})

// 添加商品
router.get("/:id/addshop", async (req, res) => {
    let {id}=req.params
    let uuid=id
    let {name,tit,promotionPrice,price,pic,qty,checked,kc,adress,username,phone,userid,img} = req.query;
    console.log("123",promotionPrice,price,pic,qty,checked,kc)
    let result
    // console.log(id,qty)
    // 查询商品名是否存在
    // console.log("user=",userid)
    let result1 = await mongo.find("cart",{uuid,userid})
    console.log("re=",result1)
    
    // 大于0存在执行qty+1
    if (result1.length > 0) {
        let newData={qty}
        // console.log(newData)
        try{
        await mongo.update("cart",{uuid,userid},{$set:newData})
        // console.log("updata")
        res.send(formatData({code:4}))
    }catch(err){
        res.send(formatData({code:0}))
    }
    } 
    else {
        try {
            result = await mongo.insert("cart",
             {name,tit,promotionPrice,price,pic,qty,uuid,kc,checked,adress,username,phone,userid,img})
            // console.log("insert")
            res.send(formatData())
        } catch{
            res.send(formatData({code:2}))
        }
    }
    
  
}
)
module.exports=router
