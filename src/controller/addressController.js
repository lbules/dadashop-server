const {
    addListener
} = require('../models/Address')
const Address = require('../models/Address')

/**
 * 创建收货地址
 * @param {string} username 
 * @param {object} data 
 */
async function createAddress(username, data) {
    const address = await Address.create({
        username,
        ...data //展开data
    })

    // 返回地址
    return address
}

/**
 * 获取收货列表
 * @param {string} username 用户名
 */
async function getAddressList(username) {
    // -1 ，逆序排序
    const addressList = await Address.find({
        username
    }).sort({
        updatedAt: -1
    })
    // 返回地址列表
    return addressList
}

/**
 * 根据id,获取单个收货地址
 * @param {string} id id
 * @returns 
 */
async function getAddressById(id) {
    const address = await Address.findById(id)
    return address
}


/**
 * 更新收货地址
 * @param {string} username 
 * @param {object} data 
 * @param {string} id 
 * @returns 
 */
async function updateAddress(username,data,id) {
    const newAddress = await Address.findOneAndUpdate(
        // 根据id查找，只能改当前用户下的地址
        {_id:id,username}, //查询条件
        {username,...data}, //更新的数据
        {new:true} //返回的是更新后的数据
    )

    return newAddress
}

module.exports = {
    createAddress,
    getAddressList,
    getAddressById,
    updateAddress
}