const Router = require('koa-router')
const ChatRouter = new Router()
const controller = require('./controller')
const middle = require('./middleware')
const verifyAuth = require('../../commonMiddle/verifyAuth')

ChatRouter.get('/admin/chat/list', verifyAuth, controller.getChatList)
ChatRouter.delete('/admin/chat/del', verifyAuth, middle.verifyDel, controller.delChat)

ChatRouter.get('/blog/chat/list', controller.getBlogChatList)
ChatRouter.post('/blog/chat/add', middle.verifyAdd, controller.addChat)
module.exports = ChatRouter