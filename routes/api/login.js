var express = require('express');
const userModel = require('../../config/db_config_user');
// 引入md5模块
const md5 = require('md5');
const jwt = require('jsonwebtoken');
var router = express.Router();

// // 登录验证
router.post('/login', (req, res) => {
    // 获取用户名和密码
    const { username, password } = req.body;
    // 查询数据库
    userModel.findOne({ username: username, password: md5(password) }, (err, data) => {
        if (err) {
            res.status(500).send('登录失败，请稍后再试');
            res.json({
                code: '2001',
                msg: '数据库读取失败',
                data: null
            })
            return;
        }
        // console.log(data);
        // 判断data
        if (!data) {
            res.json({
                code: '2002',
                msg: '用户名或密码错误',
                data: null
            })
        }

        // 创建token
        const token=jwt.sign({
            username:data.username,
            _id:data._id
        },'gouyulang_accounts',{
            expiresIn:60*60*24*7
        });

        // 响应token
        res.json({
            code: '0000',
            msg: '登陆成功',
            data: token
        })
        // 登陆成功响应
        
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