/* 
*登录中间件
*/

const { ErrorModel } = require("../res-model")

module.exports = async (ctx,next)=>{
    const session = ctx.session
    if(session && session.userInfo) {
        await next()
        return
    }

    ctx.body = new ErrorModel(10003,'登录验证失败')
}