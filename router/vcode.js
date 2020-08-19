const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');


router.get("/",(req,res)=>{
    const options = {
        // 验证码长度
          // size: 10,
        //   线条数
          noise:3,
        //   去掉不会生成的字符
          ignoreChars: '0o1il',
          background:'#58bc58',
          color:true,
          fontSize:50,
          height:54
     }


    const captcha = svgCaptcha.create(options);// {data:'<svg/>',text:'abcd'}

    // console.log('vcode.session=',req.session);
    // 把验证码存入会话Session
    req.session.vcode = captcha.text.toLowerCase();
    // console.log('vcode.session222=',captcha.data);
    res.send({data:captcha.data});
})

module.exports=router