const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
// 跨域
const cors = require('koa2-cors') 

// 引入路由
const index = require('./routes/index')
const users = require('./routes/users')
const address = require('./routes/address')
const shop = require('./routes/shop')
const order = require('./routes/order')

// error handler
onerror(app)
 
// 设置跨域
app.use(cors({
  origin:'http://localhost:8080', //前端 origin
  credentials:true ,// 允许跨域带cookie
  
}))

// 配置密钥
app.keys=['asd1asa^d']  //密钥，用于加密

// 配置cookie
app.use(session({
  cookie:{
    path:'/',
    httpOnly:true, //  只能通过后端修改数据
    maxAge:24*60*60*1000
  }
}))




// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())

// 所有静态文件所在的目录，可以通过这个实现图片的访问。
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(address.routes(),address.allowedMethods())
app.use(shop.routes(),shop.allowedMethods())
app.use(order.routes(),order.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
