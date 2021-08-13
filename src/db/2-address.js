const Address = require('../models/Address')

    !(async () => {
        // // 创建
        const a1 = new Address({
            username: 'zhangsan',
            city: '北京',
            department: '西二旗小区',
            houseNumber: '2号楼1单元403',
            name: '双越老师',
            phone: '18677778888',
        })
        a1.save() // 保存到数据库

        // // 创建
        const a2 = new Address({
            username: 'zhangsan',
            city: '北京',
            department: '软件园二期',
            houseNumber: '百度科技园',
            name: '双越老师',
            phone: '18677778888',
        })
        a2.save() // 保存到数据库

        

    })()