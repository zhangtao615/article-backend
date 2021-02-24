const router = require('koa-router')()
const {
  getTagList,
  createTag
} = require('../controllers/tag')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.prefix('/api/tag')

router.get('/getTagList', async (ctx, next) => {
  const res = await getTagList()
  ctx.body = new SuccessModel(res)
})

router.post('/createTag', async (ctx, next) => {
  let val = ctx.request.body.tag
  const res = await createTag(val)
  ctx.body = new SuccessModel(res)
})
module.exports = router