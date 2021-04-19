const router = require('koa-router')()
const {
  getBLogList,
  getBLogDetail,
  createBlog,
  deleteBlog,
  getUserComments,
  deleteComment
} = require('../controllers/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/blog')

router.get('/getBlogList', async (ctx, next) => {
  let keyword = ctx.query.keyword || ''
  const listData = await getBLogList(keyword)
  ctx.body = new SuccessModel(listData)
})
router.get('/getBlogDetail', async (ctx, next) => {
  let id = ctx.query.id
  const blogData = await getBLogDetail(id)
  if (blogData) {
    ctx.body = new SuccessModel(blogData)
  } else {
    ctx.body = new ErrorModel('文章找不到啦')
  }
})
router.post('/createBlog', async (ctx, next) => {
  const { title, content, tag, createTime, description, pic } = ctx.request.body
  const res = await createBlog(title, content, tag, createTime, description, pic)
  if (res.affectedRows === 1) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('文章创建失败')
  }
})
router.post('/deleteBlog', async (ctx, next) => {
  const { id } = ctx.request.body
  const res = await deleteBlog(id)
  if (res.affectedRows === 1) {
    ctx.body = new SuccessModel('文章删除成功')
  } else {
    ctx.body = new ErrorModel('文章删除失败')
  }
})

router.get('/getUserComments', async (ctx, next) => {
  const username = ctx.query.username
  const res = await getUserComments(username)
  ctx.body = new SuccessModel(res)
})
router.post('/deleteComment', async (ctx, next) => {
  const { id } = ctx.request.body
  const res = await deleteComment(id)
  if (res.affectedRows === 1) {
    ctx.body = new SuccessModel('删除成功')
  } else {
    ctx.body = new ErrorModel('删除失败')
  }
})
module.exports = router