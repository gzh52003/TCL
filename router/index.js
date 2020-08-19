const express=require("express");
const router=express.Router();
const goodrouter=require("./good");
const userrouter=require("./user");
const proxyrouter=require("./proxy")
const mongouserrouter=require("./mongoUser");
const uploadrouter=require("./upload")
// session会话技术
const session=require("express-session")
// 验证码模块
const vcoderouter=require("./vcode")
// 令牌技术token
const token=require("../data/token")
const cors = require('./cors')
router.use(cors)
router.use(express.urlencoded({extended:false}),express.json())



router.use(session({
    secret: 'xiaowei',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // 设置cookie有效期
        maxAge: 1000*60*60*2
    }
}))

router.get("/jwtverify",(req,res)=>{
    const {authorization}=req.query
    
        // 判断能否解密出结果
        if(token.verify(authorization)){
            res.send({"type":"sucess1"})
        }else{
            res.send({"type":"error8"})
        }
       
    
    
})

router.use("/good",goodrouter);
router.use("/user",userrouter);
router.use("/proxy",proxyrouter);
router.use("/mongoUser",mongouserrouter);
router.use("/vcode",vcoderouter)
router.use("/upload",uploadrouter)


module.exports=router
 