/* 
 * user model
 */

const mongoose = require('../db/db')


/* 
Schema用于定义数据库的结构。
类似创建表时的数据定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)，
每个Schema会映射到mongodb中的一个collection，Schema不具备操作数据库的能力
*/
const Schema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true //用户名是唯一的
    },
    password: String
}, {
    // 在schema中设置timestamps为true，
    // schema映射的文档document会自动添加createdAt和updatedAt这两个字段，
    // 代表创建时间和更新时间
    timestamps: true
})


/* Model创造Document */
// 一定要将model()方法的第一个参数和其返回值设置为相同的值
const User = mongoose.model('user', Schema)

module.exports = User