/**
 * 成功后返回的数据模型
 */

class SuccessModel {
    constructor(data) {
        this.errno = 0
        // data不为空
        if (data !== null) {
            this.data = data
        }
    }
}

module.exports = SuccessModel