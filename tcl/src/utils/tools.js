//格式化数据
                        //默认空对象，并设置对象的属性的默认值，方便不传参数和解构属性
function formatData({code=1,data=[],msg='success'}={}){
    if(code===0){
        msg='fail'
    }
    return{
        code,
        data,
        msg
    }
}

module.exports={
    formatData
}