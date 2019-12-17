//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，表中的数据有name、age、sex等字段，并且这些字段的数据类型也定义了，最后将model导出即可
const userSchema = mongoose.Schema({
    UserName: String,
    PassWord: String,
    FirstName: String,
    LastName: String,
    CompanyName: String
}, { collection: 'system_user' })

//导出model模块
const User = module.exports = mongoose.model('user', userSchema);