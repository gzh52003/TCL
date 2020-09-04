
function formatData({code=1,data=[],msg='success'}={}){

    if(code === 0){
        msg = '用户名已存在';
    }

    return {
        code,
        data,
        msg
    }
}


module.exports = {
    formatData,
}