// 声明中间件，检测登录
let checkLogin = (req, res, next) => {
    if (!req.session.username) {
        res.redirect('/login');
    }
    next();
}

module.exports=checkLogin;