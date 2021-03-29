const router = require('koa-router')()
const { reg, login, checkName, handleCommit } = require('../controllers/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const jwt = require("jsonwebtoken")
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
    const token = jwt.sign(
      {
        name: data.username
      },
      "7years_VV", // secret
      { expiresIn: '24h' } 
    )
    data.token = token
    ctx.body = new SuccessModel(data, username)
    return
  }
  ctx.body = new ErrorModel('登录失败')
})
router.post('/checkName', async (ctx, next) => {
  const { username } = ctx.request.body
  const res = await checkName(username)
  if (res.username) {
    ctx.body = new ErrorModel('用户名已被注册')
  } else {
    ctx.body = new SuccessModel()
  }
})
router.post('/handleCommit', async (ctx, next) => {
  const {author, content, blogId, createTime} = ctx.request.body
  const res = await handleCommit(author, content, blogId, createTime)
  if (res.affectedRows === 1) {
    ctx.body = new SuccessModel('评论成功')
  } else {
    ctx.body = new ErrorModel('评论失败')
  }
})
module.exports = router