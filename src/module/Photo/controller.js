const service = require('./service')
const response = require('../../util/response')
const { v4: uuidv4 } = require('uuid');
const getPhotoList = async (ctx) => {
    const { page, size } = ctx.request.query
    const result = await service.getPhotoList(page, size)
    return response.combineRes(ctx, result)
}
const delPhoto = async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.delPhoto(id)
    return response.combineRes(ctx, result, id, '删除成功！')
}
const addPhoto = async (ctx) => {
    const { title, tag, password } = ctx.request.body
    let id = uuidv4()
    colorList = ['#9cdcfe', '#4ec9b0', '#c586c0', '#a673a2', '#b5cea8', '#4fc1ff']
    let random = Math.floor(Math.random() * 6);
    let tagColor = colorList[random]
    const result = await service.addPhoto(id, title, password, tag, tagColor)
    return response.combineRes(ctx, result, null, '发布成功', 200)
}
module.exports = {
    getPhotoList,
    delPhoto,
    addPhoto
}