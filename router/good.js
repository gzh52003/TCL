const express=require("express");
const router=express.Router();
router.get("/list",(req,res,next)=>{
    const lists=[];
    for(var i=0; i<7; i++){
        const list = {
            id:i,
            name: i+"号技师",
            price:parseInt(Math.random()*10000),
            imgurl:`img/g${i}.jpg`
        }

        lists.push(list);
    }
    res.send(lists);
});
router.get("/details",(req,res,next)=>{
    const lists=[];
    for(var i=0; i<7; i++){
        const list = {
            id:i+"dhjhsjdhj",
            name: i+"号技师",
            price:parseInt(Math.random()*10000),
            imgurl:`img/g${i}.jpg`
        }

        lists.push(list);
    }
    res.send(lists);
    
});

module.exports=router