/* 
 * address model
 */

const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    // 地址依赖于用户
    username: {
        type: String,
        require: true,
    },
    city: String,
    department: String,
    houseNumber: String,
    name: String,
    phone: String
}, {
    timestamps: true
})

const Address = mongoose.model('address', Schema)

module.exports = Address