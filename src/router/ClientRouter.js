const Router=require('koa-router')
const ClientRouter=new Router({prefix:'/client'})
const controller=require('../controller/ClientController')
const middle=require('../middleware/LoginMiddle')
ClientRouter.get('/list',middle.verifyAuth,controller.list)
ClientRouter.post('/change',middle.verifyAuth,controller.changeActive)
module.exports=ClientRouter