const Router=require('koa-router')
const LoseRouter=new Router({prefix:'/lose'})
const controller=require('../controller/LoseController')
const {verifyAuth}=require('../middleware/LoginMiddle')
LoseRouter.get('/list',verifyAuth,controller.list)
LoseRouter.post('/change',verifyAuth,controller.changeStatus)
module.exports=LoseRouter