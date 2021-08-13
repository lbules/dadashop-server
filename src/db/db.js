/**
 * 连接数据库
 */

const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017' //本地默认的地址
const dbName = 'testdb'  //数据库名称

// 配置
mongoose.set('useCreateIndex',true)
mongoose.set('useFindAndModify',true)

// 开始连接
mongoose.connect(`${url}/${dbName}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// 连接对象
const db = mongoose.connection

db.on('error',err=>{
    console.error('mongoose connect error',err);
})

db.once('open',()=>{
    console.log('mongoose 连接成功！');
})

// 导出
module.exports = mongoose