const router = require('koa-router')()
const { reg, login, checkName, handleCommit } = require('../controllers/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
router.prefix('/api/user')

router.post('/reg', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const res = await reg(username, password)
  ctx.body = new SuccessModel(res)
})
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    ctx.cookies.set('username', data.username, {
      domain:'localhost:3000',
      path:'/',  
      maxAge:1000*60*60*24
    })
    ctx.body = new SuccessModel(data,username, data.id)
    return
  }
  ctx.body = new ErrorModel('登录失败')
})
router.post('/checkName', async (ctx, next) => {
  const { username } = ctx.request.body
  const res = await checkName(username)
  if (res.username) {
    ctx.session.name = data.username
    ctx.body = new ErrorModel('用户名已被注册')
  } else {
    ctx.body = new SuccessModel()
  }
})
router.post('/handleCommit', async (ctx, next) => {
  const {author, content, blogId, avatar} = ctx.request.body
  const res = await handleCommit(author, content, blogId, avatar)
  console.log(res)
})
module.exports = router