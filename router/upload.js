const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const mongo = require('../data/mongo');



// 配置上传参数
let storage = multer.diskStorage({
    // 上传文件保存目录，无则自动创建
    destination: path.join(__dirname, '../uploads/'),

    // 格式化文件名：字段名+时间戳+扩展名
    // avatar-1597202347355.jpg
    filename: function (req, file, cb) {
        // 获取文件后缀名
        let ext = path.extname(file.originalname);

        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
})

// 设置中间件
const uploadMiddleware = multer({ storage });


// post /api/upload/avatar
router.post('/avatar', uploadMiddleware.single('avatar'), (req, res) => {
    // 中间件会把图片信息格式化到req.file,req.files
    const { _id } = req.body;
    console.log(_id)
    console.log('file=', req.file, req.body);
    

    // 更新用户信息
    const avatarUrl = '/uploads/' + req.file.filename
    mongo.update('some', { _id }, { $set: { avatarUrl } })

    res.send({data:{ _id, avatarUrl } });
})

// 一次性最多传5张图片
// router.post('/goods', uploadMiddleware.array('goods', 5), (req, res) => {

// })

module.exports = router;