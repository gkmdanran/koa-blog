const Router = require('koa-router')
const UserRouter = new Router(({ prefix: '/admin/user' }))
const controller = require('./controller')
const middle = require('./middleware')
UserRouter.post('/login', middle.verifyLogin, controller.systemLogin)

module.exports = UserRouter