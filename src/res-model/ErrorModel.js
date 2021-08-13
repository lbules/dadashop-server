/**
 * 错误返回的
 */

class ErrorModel {
    // 默认错误类型error是-1
    constructor(errno = -1,message = 'error') {
        this.errno = errno
        this.message = message
    }
}

module.exports = ErrorModel