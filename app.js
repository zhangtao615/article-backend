const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const session = require('koa-session')
// const redisStore = require('koa-redis')
// const { REDIS_CONFIG } = require('./config/db')

const user = require('./routes/user')
const blog = require('./routes/blog')
const tag = require('./routes/tag')

// error handler
onerror(app)
// 处理跨域
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// session 配置
app.keys = ['WJiol#0615']
const SESSION_CONFIG = {
    key: 'user_id',
    path: '/',
    domain: 'http://localhost:3000',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    overwrite: true,
    signed: true
}
app.use(session(SESSION_CONFIG, app))
// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(tag.routes(), tag.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
