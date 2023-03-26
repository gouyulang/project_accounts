var express = require('express');
// 引入数据库模型
var AccountModel = require('../../config/db_config.js');
// 引入moment模块
const moment = require('moment');
// 引入检测中间件
const checkLogin=require('../../middlewares/checkLogin');
var router = express.Router();


// 添加首页路由规划
router.get('/', (req, res) => {
  //重定向
  res.redirect('/account');
})

/* 记账本列表 */
router.get('/account',checkLogin, function (req, res, next) {


  // res.send('账本列表');
  AccountModel.find().sort({ time: -1 })                //逆序排序
    .then(data => {
      // console.log(data);
      // 响应成功的提示
      res.render('list', { accounts: data, moment: moment });

    })
});

// 添加记录
router.get('/account/create',checkLogin, function (req, res, next) {
  // res.send('添加记录');
  res.render('create');
});


// 新增记录
router.post('/account',checkLogin, (req, res, next) => {
  // console.log(req.body);

  // 插入数据库
  // （1）利用moment 将time字符串 先转成对象，再转成Date对象
  req.body.time = moment(req.body.time).toDate();

  // （2）接收模型，然后利用模型向数据库中操作前端传过来的数据
  AccountModel.create({
    ...req.body,                       //es6语法

  }).then(data => {
    // （3）成功提醒
    res.render('success', { msg: '添加成功哦！', url: '/account' });
  });
})


// 删除记录
router.get('/account/:id',checkLogin, (req, res) => {
  //获取params的id参数
  let id = req.params.id;      //req.params存放的就是我们前端路由传来的的id.value

  //删除数据
  AccountModel.deleteOne({
    _id: id
  }).then(data => {
    //提醒删除
    res.render('success', { msg: '删除成功哦！', url: '/account' });
  });

})

module.exports = router;
