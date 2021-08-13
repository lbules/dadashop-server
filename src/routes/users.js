const {
  register,
  login
} = require('../controller/userController')

const {
  SuccessModel,
  ErrorModel
} = require('../res-model/index')

const router = require('koa-router')()


router.prefix('/api/user') // 前缀

// 注册请求
router.post('/register', async function (ctx, next) {
  // 获取用户名和密码
  const {
    username,
    password
  } = ctx.request.body


  try {
    // 创建新用户
    const newUser = await register(username, password)
    // 注册成功
    ctx.body = new SuccessModel(newUser)

  } catch (error) {
    ctx.body = new ErrorModel(10001, `注册失败！--${error.message}`)
  }

})

// 登录请求
router.post('/login', async function (ctx, next) {
  const {
    username,
    password
  } = ctx.request.body
  // 处理登录逻辑
  const result = await login(username, password)
  console.log('the result is ',result);
  if(result) {
    // 登陆成功
    ctx.session.userInfo = {username} //设置session

    ctx.body = new SuccessModel()
  }else {
    ctx.body = new ErrorModel(10002,'登录失败！')
  }
})


module.exports = router