var express = require('express');
const userModel = require('../../config/db_config_user');
// 引入md5模块
const md5 = require('md5');
var router = express.Router();

// 注册页面
router.get('/register', (req, res) => {
    // 响应html内容
    res.render('register');
})

// 注册用户
router.post('/register', (req, res) => {
    // 其实这里还应该有表单验证

    // 获取请求体的数据
    // console.log(req.body);

    // 插入数据库
    userModel.create({
        ...req.body,
        // 利用md5进行加密
        password: md5(req.body.password)
    }, (err, data) => {
        if (err) {
            res.status(500).send('注册失败，请稍后再试');
            return;
        }
        res.render('success', { msg: '注册成功', url: '/login' });
    })
})

// // 登录页面
router.get('/login', (req, res) => {
    // 响应html内容
    res.render('login');
})

// // 登录验证
router.post('/login', (req, res) => {
    // 获取用户名和密码
    const { username, password } = req.body;
    // 查询数据库
    userModel.findOne({ username: username, password: md5(password)}, (err, data) => {
        if (err) {
            res.status(500).send('登录失败，请稍后再试');
            return;
        }
        // console.log(data);
        // 判断data
        if (!data) {
            return res.send('账号或密码错误！');
        }
        // 写入session
        req.session.username = data.username;
        req.session._id = data._id;
        // 登陆成功响应
        res.render('success', { msg: '登录成功', url: '/account' });
    })
})

// // 退出登录
router.post('/logout', (req, res) => {
    // 销毁session
    req.session.destroy(() => {
        res.render('success', { msg: '退出成功', url: '/login' });
    })

})

module.exports = router;