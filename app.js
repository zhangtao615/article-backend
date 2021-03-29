const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa2-cors')
const koajwt = require('koa-jwt')

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
app.use(function(ctx, next){
  return next().catch((err) => {
    if (401 == err.status) {
      ctx.status = 401;
      ctx.body = 'Protected resource, use Authorization header to get access\n';
    } else {
      throw err;
    }
  });
});
// 不受jwt保护的接口
const unprotected = [
  '/api/user/login',
  '/api/user/reg',
  '/api/user/checkName',
  '/api/blog/getBlogList',
  '/api/blog/getBlogDetail',
  '/api/blog/createBlog',
  '/api/tag/getTagList',
  '/api/tag/createTag'
];
app.use(koajwt({
  secret: '7years_VV'
}).unless({
  path: unprotected
}))

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
