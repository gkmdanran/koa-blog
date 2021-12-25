const Router = require('koa-router')
const TagRouter = new Router()
const controller = require('./controller')
const verifyAuth = require('../../commonMiddle/verifyAuth')

TagRouter.get('/admin/tag/list', verifyAuth, controller.getTagList)
TagRouter.delete('/admin/tag/del', verifyAuth, controller.delTag)

module.exports = TagRouter