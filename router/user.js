const express=require("express")
const router=express.Router();
const query=require("../data/sql");
const token=require("../data/token");
// 注册
router.post("/reg",async(req,res)=>{
    const {username}=req.body
    const {password}=req.body
    let sql2=`select * from vip where username='${username}'`
    let sql=`insert into vip(username,password) values('${username}','${password}')`;
    const result=await query(sql2)
       
    if(result.length!=0){
        res.send({"type":"error1","msg":"用户名已存在"})
        return false
    } else {
        try{
        
            await query(sql)
            res.send({"type":"sucess","msg":"注册成功"})
        }catch(err){
            res.send({"type":"error2","msg":"注册失败"})
        }     
    }
   
})
// 登录
router.post("/login",async(req,res)=>{
    const {username,password,vcode,checkbox}=req.body
    console.log("vcode",req.session.vcode)
    // 判断输入的验证码和session里面存的验证码是否一致
    if(vcode!=req.session.vcode){
        res.send({"type":"error11","msg":"验证码错误"})
        return
    }
    let sql=`select * from vip where username='${username}' and password='${password}'`;
   
        let result2=await query(sql)
        if(result2.length){
            // 判断是否勾选免登陆
            if(checkbox=="true"){
                console.log(123)
                // 创建token
                let authorization=token.create({username},10000)
                result2=result2[0];
                result2.authorization=authorization
                res.send({data:result2})
                return
            }
           
            res.send({"type":"sucess","msg":"登录成功"}) 
        }
    else{
        res.send({"type":"error2","msg":"登录失败"})
    }     

})

// 修改
router.put("/:name",(req,res)=>{
    const {name} = req.params;
    console.log(req.params)
    // 查询数据库，删除对应商品
    res.send('shanchu')
})

// 删除
    router.delete('/:id',async (req,res)=>{
        const {id} = req.params;
        let sql = `delete from vip where id=${id}`;
        console.log(sql)
      
        try{
            // 尝试执行这里的代码
            const result = await query(sql);
            res.send(result)
        }catch(err){
            // 如果上面的代码有报错，则执行这里的代码
            res.send('删除失败')
        }
    
        
        
    })

// 查询所有用户
router.get("/select",async (req,res)=>{
    let sql="select * from vip";
    const result = await query(sql);
    console.log(result)
   if(result.length){
    res.send({data:result})
   }
    
})

module.exports=router