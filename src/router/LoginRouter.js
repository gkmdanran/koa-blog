const Router=require('koa-router')
const LoginRouter=new Router()
const controller=require('../controller/LoginController')
const middle=require('../middleware/LoginMiddle')
LoginRouter.post('/login',middle.verifyLogin,controller.login)
LoginRouter.post('/checklogin',middle.verifyAuth,controller.checkLogin)
module.exports=LoginRouter