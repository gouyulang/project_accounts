var express = require('express');
var router = express.Router();

// 引入数据库模型
var AccountModel = require('../../config/db_config.js');
const jwt = require('jsonwebtoken');
// 引入moment模块
const moment = require('moment');
// 引入token验证中间件
const checkToken=require('../../middlewares/checktoken');


/* 1.记账本列表 */
router.get('/account',checkToken, function (req, res, next) {

    AccountModel.find().sort({ time: -1 }).exec((err, data) => {
        if (err) {
            // 响应失败的提示
            res.json({
                // 响应编号
                code: '2005',
                // 响应的信息
                msg: '读取失败',
                // 响应的数据
                data: null
            });
            // 响应成功的提示
            res.json({
                // 响应编号
                code: '0000',
                // 响应的信息
                msg: '读取成功',
                // 响应的数据
                data: data
            });
        }
    })

});


// 2.新增记录
router.post('/account',checkToken, (req, res, next) => {
    // console.log(req.body);

    // 插入数据库
    // （1）利用moment 将time字符串 先转成对象，再转成Date对象
    req.body.time = moment(req.body.time).toDate();

    // （2）接收模型，然后利用模型向数据库中操作前端传过来的数据
    AccountModel.create({
        ...req.body,                       //es6语法

    }).then(data => {
        res.json({
            // 响应编号
            code: '1002',
            // 响应的信息
            msg: '创建成功',
            // 响应的数据
            data: data
        })

    });


})


// 3.删除记录
router.delete('/account/:id',checkToken, (req, res) => {
    //获取params的id参数
    let id = req.params.id;      //req.params存放的就是我们前端路由传来的的id.value

    //删除数据
    AccountModel.deleteOne({
        _id: id
    }).then(data => {
        res.json({
            // 响应编号
            code: '1003',
            // 响应的信息
            msg: '删除成功',
            // 响应的数据
            data: {}              //还可以是null
        })
    });

})


// 4.获取单个账单信息
router.get('/account/:id',checkToken, (req, res) => {
    //获取params的id参数
    let id = req.params.id;      //req.params存放的就是我们前端路由传来的的id.value

    // 查询数据库
    AccountModel.find({
        _id: id
    }).then(data => {
        res.json({
            // 响应编号
            code: '1004',           //0000表示成功，非0表示失败
            // 响应的信息
            msg: '查询成功',
            // 响应的数据
            data: null
        })
    });

})

// 5.更新账单信息
router.patch('/account/:id',checkToken, (req, res) => {
    //获取params的id参数
    let id = req.params.id;      //req.params存放的就是我们前端路由传来的的id.value

    // 更新数据库
    AccountModel.updateOne({
        _id: id
    }, req.body).then(data => {

        // 再次查询数据库，获取更新后的单条数据
        AccountModel.find({
            _id: id
        }).then(data => {
            res.json({
                // 响应编号
                code: '1005',           //0000表示成功，非0表示失败
                // 响应的信息
                msg: '更新成功',
                // 响应的数据
                data: data
            })
        });

    });

})


module.exports = router;
