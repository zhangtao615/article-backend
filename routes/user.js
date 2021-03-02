const router = require('koa-router')()
const { reg, login, checkName } = require('../controllers/user')
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
    ctx.session.username = data.username
    ctx.body = new SuccessModel(data.username)
    return
  }
  ctx.body = new ErrorModel('登录失败')
})
router.post('/checkName', async (ctx, next) => {
  const { username } = ctx.request.body
  const res = await checkName(username)
  if (res.username) {
    ctx.session.username = data.username
    ctx.body = new SuccessModel()
    return
  } else {
    ctx.body = new ErrorModel('登录失败')
  }
  
})

module.exports = router