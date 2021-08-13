/**
 * @description 订单数据测试
 * @author 双越老师
 */

const Address = require('../models/Address')
const Order = require('../models/Order')
const Product = require('../models/Product')

!(async () => {
    // 模拟一个订单的创建过程

    const username = '15218044491'

    // 根据 addressId 获取地址信息
    const address = await Address.findById('6113df5fc760c962b8f0320a')

    // 商店信息
    const shopId = '6113419b1acf812124d80f81'
    const shopName = '沃尔玛'

    // 订单的商品 id 和数量
    const products = [
        {
            id: '61148f6bf63cc2179c401514',
            num: 6
        },
        {
            id: '61148f6bf63cc2179c401517',
            num: 3
        }
    ]

    // 获取商品列表
    const pIds = products.map(p => p.id)
    const productList = await Product.find({
        // 条件1：商品 id
        _id: {
            $in: pIds
        },
        // 条件2：商店 id
        shopId,
    })

    // 给商品列表增加数量
    const productListWithSales = productList.map(p => {
        // 商品 id
        const id = p._id.toString()

        // 找到商品销量
        const filterProducts = products.filter(item => item.id === id)
        if (filterProducts.length === 0) {
            // 没有找到匹配的数量，报错
            throw new Error('未找到匹配的销量数据')
        }

        return {
            orderSales: filterProducts[0].num, // 销量
            product: p
        }
    })

    // 创建订单
    await Order.create({
        username,
        address,
        shopId,
        shopName,
        isCanceled: false, // 是否被取消，依赖于前端的传入
        products: productListWithSales
    })

    // 获取订单列表
    const orderList = await Order.find().sort({ _id: -1 }) // 逆序
    console.log('order list', orderList)
    console.log('order product 0', orderList[0].products[0])

})()
