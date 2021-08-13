/**
 * 获取热门商店列表
 */

const { Shop, Product } = require("../models");

/**
 * 热门商店列表
 * @returns 返回热门商店列表
 */
async function getHotList() {
    const list = await Shop.find().sort({_id:-1})
    return list
}

/**
 * 查询单个商店信息
 * @param {string} id 商店id
 * @returns 
 */
async function getShopInfo(id) {
    const shop = await Shop.findById(id)
    return shop
}


/**
 * 
 * @param {string} shopId 商店id 
 * @param {Array} tab 分类
 */
async function getProductsByShopId(shopId,tab = 'all') {
    const list = await Product.find({
        shopId,
        tabs:{
            $in:tab
        }
    }).sort({_id:-1})

    return list
}

module.exports = {
    getHotList,
    getShopInfo,
    getProductsByShopId
}