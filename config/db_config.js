// 连接数据库

// 1.引入mongoose模块
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

// 禁止警告提示
mongoose.set('strictQuery', true);
// 2.连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/project_accounts');

// 3.插入集合和数据，数据库project_accounts会自动创建。
// （1）创建Schema对象（约束）
const AccountSchema=new Schema({
    // 标题
    title:{
        type:String,
        required:true             //必填项
    },
    // 时间
    time:Date,
    // 类型
    type:{
        type:Number,
        default:-1             //默认值
    },
    // 金额
    account:{
        type:Number,
        required:true
    },
    // 备注
    remarks:{
        type:String
    }
})

// （2）创建模型。一一对应数据库的集合。一个模型对应一个集合。所以这个存放数据的集合名字就是accounts
const AccountModel=mongoose.model('account',AccountSchema);         //集合名字自动变为accounts (加了一个s)

// （3）向我们操作数据库的页面accounts.js传输我们搭建好的模型
module.exports=AccountModel;

