const Router = require('koa-router')
const ArticleRouter = new Router()
const controller = require('./controller')
const middle = require('./middleware')
const verifyAuth = require('../../commonMiddle/verifyAuth')
ArticleRouter.post('/admin/article/add', verifyAuth, middle.verifyAdd, controller.addArticle)
ArticleRouter.get('/admin/article/list', verifyAuth, controller.getArticle)
ArticleRouter.post('/admin/article/top', verifyAuth, controller.topArticle)
ArticleRouter.post('/admin/article/hide', verifyAuth, controller.hideArticle)
ArticleRouter.delete('/admin/article/del', verifyAuth, controller.delArticle)
ArticleRouter.get('/admin/article/detail', verifyAuth, controller.detailArticle)
module.exports = ArticleRouter


