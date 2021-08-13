/**
 * 订单路由
 */
const { createOrder } = require('../controller/orderController')
const {
    SuccessModel,
    ErrorModel
} = require('../res-model/index')

const router = require('koa-router')()


router.prefix('/api/order') // 前缀

//   登录验证
const loginCheck = require('../middleware/loginCheck')

// 创建订单
router.post('/',loginCheck,async function (ctx,next){
    // 获取当前的用户名
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    // 获取订单数据
    const data = ctx.request.body
    
    // 创建订单
    try {
        const newOrder = await createOrder(username,data)
        ctx.body = new SuccessModel(newOrder)
    } catch (error) {
        console.error(error);
        ctx.body = new ErrorModel(10005,'创建订单失败')
    }

})

// 获取订单列表


module.exports = router