const Router = require('koa-router')
const ArticleRouter = new Router()
const controller = require('./controller')
const middle = require('./middleware')
const { articleUpload } = require('../../upload/index')
const verifyAuth = require('../../commonMiddle/verifyAuth')
ArticleRouter.post('/admin/article/add', verifyAuth, middle.verifyAdd, controller.addArticle)
ArticleRouter.get('/admin/article/list', verifyAuth, controller.getArticle)
ArticleRouter.post('/admin/article/top', verifyAuth, controller.topArticle)
ArticleRouter.post('/admin/article/hide', verifyAuth, controller.hideArticle)
ArticleRouter.delete('/admin/article/del', verifyAuth, controller.delArticle)
ArticleRouter.get('/admin/article/detail', verifyAuth, controller.detailArticle)
ArticleRouter.put('/admin/article/edit', verifyAuth, middle.verifyAdd, controller.editArticle)
ArticleRouter.post('/admin/article/upload', verifyAuth, articleUpload.single('file'), controller.uploadArticle)

ArticleRouter.get('/blog/article/detail', controller.detailBlogArticle)
ArticleRouter.post('/blog/article/star', controller.addStar)
ArticleRouter.get('/blog/article/list', controller.getBlogArticleList)
ArticleRouter.get('/blog/article/search', controller.searchArticle)
module.exports = ArticleRouter


