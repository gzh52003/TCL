const express=require("express");
const router=express.Router();
const mongo=require('../data/mongo')

//获取商品列表数据的jie口
router.get("/",async(req,res)=>{
    const {page=1,size=5}=req.query
    const skip=(page-1)*size;
    const limit=size*1

    const result=await mongo.find('Goods',{},{limit,skip})
    
    res.send(result)
})
//获取指定商品数据
router.get('/:id',async(req,res)=>{
    const {id}=req.params

    const result=await mongo.find('Goods',{_id:id})
    res.send({data:result[0]})
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