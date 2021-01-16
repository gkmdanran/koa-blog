const Router=require('koa-router')
const ArticleRouter=new Router({prefix:'/article'})
const controller=require('../controller/ArticleController')
const middle=require('../middleware/LoginMiddle')
ArticleRouter.get('/list',middle.verifyAuth,controller.list)
ArticleRouter.post('/delete',middle.verifyAuth,controller.deleteArticle)
ArticleRouter.post('/hide',middle.verifyAuth,controller.hideArticle)
module.exports=ArticleRouter