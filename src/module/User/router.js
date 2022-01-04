const Router = require('koa-router')
const UserRouter = new Router(({ prefix: '/admin/user' }))
const controller = require('./controller')
const middle = require('./middleware')
const verifyAuth = require('../../commonMiddle/verifyAuth')
UserRouter.post('/login', middle.verifyLogin, controller.systemLogin)
UserRouter.put('/password', verifyAuth, middle.verifyPassword, controller.changePassword)

module.exports = UserRouter