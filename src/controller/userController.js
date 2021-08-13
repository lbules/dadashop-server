/**
 * user controller
 */

const {
    User
} = require("../models");
const md5 = require('md5-node') //引入md5加密


/**
 * 注册
 * @param {string} username  用户名
 * @param {string} un_password  未加密的密码
 * @returns 
 */
async function register(username, un_password) {
    // 对密码进行一次md5加密
    let password = md5(un_password)
    // 加密后的密码保存进数据库，这里的参数名要和models中的一致
    const newUser = await User.create({
        username,
        password
    })
    return newUser
}

/**
 * 登录，查询单个用户
 * @param {string} username 用户名
 * @param {string} un_password 密码
 */
async function login(username,un_password) {
    let password = md5(un_password)
    console.log(username,password);
    const user = await User.findOne({username,password})
    console.log('the user is',user);

    // 登录成功，user不为空返回true，否则返回false
    if(user!==null) {
        return true
    }
    return false
}


// 导出
module.exports = {
    register,login
}