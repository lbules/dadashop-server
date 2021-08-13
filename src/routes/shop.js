const {
    getHotList,
    getShopInfo,
    getProductsByShopId
} = require('../controller/shopController')
const {
    SuccessModel,
    ErrorModel
} = require('../res-model/index')

const router = require('koa-router')()


router.prefix('/api/shop') // 前缀

//  商店列表
router.get('/hot-list', async function (ctx, next) {
    const list = await getHotList()
    ctx.body = new SuccessModel(list)
})

// 单个商店信息
router.get('/:id', async function (ctx, next) {
    const id = ctx.params.id
    const shop = await getShopInfo(id)
    ctx.body = new SuccessModel(shop)
})

// 获取商店的商品
router.get('/:id/products',async function(ctx,next){
    const shopId = ctx.params.id
    // 分类参数，默认为all
    const tab = ctx.query.tab || 'all'

    const products = await getProductsByShopId(shopId,tab)
    ctx.body = new SuccessModel(products)
})

module.exports = router