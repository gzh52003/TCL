const express = require("express");
const router = express.Router();
const mongo = require("../data/mongo");
const { formatData } = require("./tools");

// 获取home的商品信息
router.get("/home", async(req, res) => {
    let { name } = req.query;
    const result = await mongo.find("home", { name });
    res.send(formatData({ data: result }));
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
//获取商品列表全部数据的接口
router.get("/many", async(req, res) => {
    try {
        const result = await mongo.find("Goods");
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
    const result = await mongo.find("Goods", { _id: id });
    res.send(formatData({ data: result[0].kc }));
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

module.exports = router;