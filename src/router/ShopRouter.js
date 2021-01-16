const Router=require('koa-router')
const ShopRouter=new Router({prefix:'/shop'})
const controller=require('../controller/ShopController')
const {verifyAuth}=require('../middleware/LoginMiddle')
ShopRouter.get('/list',verifyAuth,controller.list)
ShopRouter.post('/change',verifyAuth,controller.changeStatus)
module.exports=ShopRouter