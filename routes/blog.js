const router = require('koa-router')()
const {
  getBLogList,
  getBLogDetail
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

module.exports = router