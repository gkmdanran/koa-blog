const Router = require('koa-router')
const PhotoRouter = new Router()
const controller = require('./controller')
const middle = require('./middleware')
const verifyAuth = require('../../commonMiddle/verifyAuth')

PhotoRouter.get('/admin/photo/list', verifyAuth, controller.getPhotoList)
PhotoRouter.delete('/admin/photo/del', verifyAuth, middle.verifydel, controller.delPhoto)
PhotoRouter.post('/admin/photo/add', verifyAuth, middle.verifyAdd, controller.addPhoto)
module.exports = PhotoRouter