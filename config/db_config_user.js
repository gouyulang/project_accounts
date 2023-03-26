// 连接数据库

// 1.引入mongoose模块
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// 禁止警告提示
mongoose.set('strictQuery', true);
// 2.连接MongoDB数据库
// mongoose.connect('mongodb://127.0.0.1:27017/project_accounts_user');           //两个数据库名字必须一致
mongoose.connect('mongodb://127.0.0.1:27017/project_accounts');

// 3.插入集合和数据，数据库project_accounts_users会自动创建。
// （1）创建Schema对象（约束）
const userSchema=new Schema({
    // 注册信息
    username:String,
    password:String
})

// （2）创建模型。一一对应数据库的集合。一个模型对应一个集合。所以这个存放数据的集合名字就是users
const userModel=mongoose.model('user',userSchema);         //集合名字自动变为users (加了一个s)

// （3）向我们操作数据库的页面users.js传输我们搭建好的模型
module.exports=userModel;

