/**
 * 收货地址路由
 */

const router = require('koa-router')()
const {
    model
} = require('mongoose')
const {
    SuccessModel,
    ErrorModel
} = require('../res-model/index')

//   登录验证
const loginCheck = require('../middleware/loginCheck')
const { createAddress,getAddressList,getAddressById,updateAddress } = require('../controller/addressController')

router.prefix('/api/user/address')

/**
 * 创建收货地址
 */
router.post('/', loginCheck, async function (ctx, next) {
    // 获取用户信息
    const userInfo = ctx.session.userInfo
    const username = userInfo.username
    const data = ctx.request.body

    try {
        const newAddress = await createAddress(username,data)
        console.log(newAddress);
        ctx.body = new SuccessModel(newAddress)
    } catch (error) {
        console.error(error);
        ctx.body = new ErrorModel(10004,'创建收货地址失败')
    }
})

/**
 * 获取收货列表
 */
router.get('/',loginCheck,async function(ctx,next){
    // 获取用户信息
    const userInfo = ctx.session.userInfo
    const username = userInfo.username
    
    // 获取收货列表
    const addressList =await getAddressList(username)
    ctx.body = new SuccessModel(addressList)
})

/**
 * 获取单个收货地址
 */
router.get('/:id',loginCheck,async function(ctx,next){
    // 获取id
    const id= ctx.params.id
    const address = await getAddressById(id)
    ctx.body = new SuccessModel(address)
})
/**
 * 更新收货地址
 */
router.patch('/:id',loginCheck,async function(ctx,next){
    // 获取id和地址信息
    const id= ctx.params.id
    const data = ctx.request.body
    // 获取用户信息
    const userInfo = ctx.session.userInfo
    const username = userInfo.username

    const newAddress = await updateAddress(username,data,id)

    ctx.body = new SuccessModel(newAddress)
})




module.exports = router