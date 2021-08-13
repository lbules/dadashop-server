const User = require("../models/User")

!(async()=>{
    //注册：创建一个新的用户

    // await User.create({
    //     username:'zhangsan',
    //     password:'123456'
    // })

    // 登录查询某个用户
    const zhangsan = await User.findOne({
        username:'zhangsan',
        password:'123'
    })

    console.log('zs',zhangsan);
})()

