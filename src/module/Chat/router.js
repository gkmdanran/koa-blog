const Router = require('koa-router')
const ChatRouter = new Router()
const controller = require('./controller')
const verifyAuth = require('../../commonMiddle/verifyAuth')

ChatRouter.get('/admin/chat/list', verifyAuth, controller.getChatList)
ChatRouter.delete('/admin/chat/del', verifyAuth, controller.delChat)

module.exports = ChatRouter