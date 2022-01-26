const Router = require('koa-router')
const PhotoRouter = new Router()
const controller = require('./controller')
const middle = require('./middleware')
const { upload } = require('../../upload/index')
const verifyAuth = require('../../commonMiddle/verifyAuth')
PhotoRouter.get('/admin/photo/list', verifyAuth, controller.getPhotoList)
PhotoRouter.delete('/admin/photo/del', verifyAuth, middle.verifydel, controller.delPhoto)
PhotoRouter.post('/admin/photo/add', verifyAuth, middle.verifyAdd, controller.addPhoto)
PhotoRouter.get('/admin/photo/detail', verifyAuth, controller.detailPhoto)
PhotoRouter.put('/admin/photo/edit', verifyAuth, middle.verifyAdd, controller.editPhoto)
PhotoRouter.post('/admin/photo/upload', verifyAuth, upload.array('files', 9), controller.uploadPhoto)
PhotoRouter.put('/admin/photo/cover', verifyAuth,  controller.setCover)
PhotoRouter.delete('/admin/photo/delpic', verifyAuth,  controller.delPictures)
module.exports = PhotoRouter