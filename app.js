var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 引入connect-mongo模块
var MongoStore = require("connect-mongo");
// 引入express-session模块
var session = require('express-session');
var jwt = require('jsonwebtoken');


var indexRouter = require('./routes/web/index');
var accountRouter = require('./routes/api/account');
var authRouter = require('./routes/web/auth');
var apiloginRouter = require('./routes/api/login');


// 引入数据库模块
require('./config/db_config.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 配置express-session模块
app.use(session({
  name: 'gouyulangsystem',
  secret: 'ajhxbhscjcjc',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,         //设置过期时间：1000毫秒*60*60*24*7=7天
    secure: false
  },
  resave: false,                 //重新设置session后，会自动重新计算过期时间
  saveUninitialized: false,
  rolling: true,    //为 true 表示 超时前刷新，cookie 会重新计时； 为 false 表示在超时前刷新多少次，都是按照第一次刷新开始计时。
  // 将session值都存放在下面的数据库project_accounts地址
  store: MongoStore.create({
    mongoUrl: 'mongodb://127.0.0.1:27017/project_accounts',
    ttl: 1000 * 60 * 60 * 24 * 7 // 过期时间，两个过期时间要一致
  }),
}))


// 路由
app.use('/', indexRouter);
app.use('/api', accountRouter);
app.use('/api', apiloginRouter);
app.use('/', authRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // 响应404
  res.render('404');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
