
const jwt = require('jsonwebtoken');

const privateKey = 'laoxie';

function create(data={},expiresIn='2h'){
    const token = jwt.sign({ ...data }, privateKey ,{
        // token有效期,字符串是以秒计算（纯数字除外），后面加符号则按符号含义计算，
        // 如果是纯数字加字符串则按毫秒，纯数字不加字符串按秒计算
        expiresIn
    });
    return token;
}

function verify(token){
    let result ;
    try{
        jwt.verify(token, privateKey);
        result = true;
    }catch(err){
        result = false
    }

    return result;
}


module.exports = {
    create,
    verify
}