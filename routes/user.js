const router = require('koa-router')()
const { reg, login, checkName, handleCommit, getComment, changeUserInfo, getCurrentUser } = require('../controllers/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const jwt = require("jsonwebtoken")
router.prefix('/api/user')

router.post('/reg', async (ctx, next) => {
  const { username, password, avatar } = ctx.request.body
  const res = await reg(username, password, avatar)
  ctx.body = new SuccessModel(res)
})
router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    const token = jwt.sign({
      data: data.username
    }, '7years_VV', {expiresIn: 24 * 60 * 60 * 1000 });
    ctx.body = new SuccessModel(token)
    return
  }
  ctx.body = new ErrorModel('登录失败')
})
router.get('/getCurrentUser', async (ctx, next) => {
  const token = ctx.request.header.authorization.split(' ')[1]
  let username = ''
  jwt.verify(token, '7years_VV', function (err, decoded) {
    if (err) {
      console.log(err)
    } else {
      let now = Date.parse(new Date()) / 1000
      if (decoded.exp > now) {
        username = decoded.data
      }
    }
  });
  const data = await getCurrentUser(username)
  ctx.body = new SuccessModel(data)
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
  const {author, content, blogId, avatar} = ctx.request.body
  const res = await handleCommit(author, content, blogId, avatar)
  if (res.affectedRows === 1) {
    ctx.body = new SuccessModel('评论成功')
  } else {
    ctx.body = new ErrorModel('评论失败')
  }
})
router.get('/getComment', async (ctx, next) => {
  let id = ctx.query.blogId
  const res = await getComment(id)
  if (res) {
    ctx.body = new SuccessModel(res)
  } else {
    ctx.body = new ErrorModel('获取评论失败')
  }
})
router.post('/changeUserInfo', async (ctx, next) => {
  const { id, name, avatar } = ctx.request.body
  const res = await changeUserInfo(id, name, avatar)
  if (res.affectedRows === 1) {
    ctx.body = new SuccessModel('信息更新成功')
  } else {
    ctx.body = new ErrorModel('信息更新失败')
  }
})
module.exports = router