const express=require("express");
const router=express.Router();
const mongo=require('../data/mongo')

//获取商品列表数据的端口
router.get("/",async(req,res)=>{
    const {page=1,size=5}=req.query
    const skip=(page-1)*size;
    const limit=size*1

    const result=await mongo.find('Goods',{},{limit,skip})
    
    res.send({result})
})
// router.get("/list",(req,res,next)=>{
//     const lists=[];
//     for(var i=0; i<7; i++){
//         const list = {
//             id:i,
//             name: i+"号技师",
//             price:parseInt(Math.random()*10000),
//             imgurl:`img/g${i}.jpg`
//         }

//         lists.push(list);
//     }
//     res.send(lists);
// });
// router.get("/details",(req,res,next)=>{
//     const lists=[];
//     for(var i=0; i<7; i++){
//         const list = {
//             id:i+"dhjhsjdhj",
//             name: i+"号技师",
//             price:parseInt(Math.random()*10000),
//             imgurl:`img/g${i}.jpg`
//         }

//         lists.push(list);
//     }
//     res.send(lists);
    
// });

module.exports=router