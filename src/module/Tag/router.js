const Router = require('koa-router')
const TagRouter = new Router()
const controller = require('./controller')
const middle = require('./middleware')
const verifyAuth = require('../../commonMiddle/verifyAuth')

TagRouter.get('/admin/tag/list', verifyAuth, controller.getTagList)
TagRouter.delete('/admin/tag/del', verifyAuth, middle.verifyDel, controller.delTag)
TagRouter.post('/admin/tag/add', verifyAuth, middle.verifyAdd, controller.addTag)

module.exports = TagRouter