const Router = require('koa-router')
const LinkRouter = new Router()
const controller = require('./controller')
const middle = require('./middleware')
const verifyAuth = require('../../commonMiddle/verifyAuth')

LinkRouter.get('/admin/link/list', verifyAuth, controller.getLinkList)
LinkRouter.delete('/admin/link/del', verifyAuth, controller.delLink)
LinkRouter.post('/admin/link/add', verifyAuth, controller.addLink)
LinkRouter.get('/admin/link/detail', verifyAuth, controller.detailLink)
LinkRouter.put('/admin/link/edit', verifyAuth, controller.editLink)

LinkRouter.get('/blog/link/list', controller.getLinkList)
module.exports = LinkRouter