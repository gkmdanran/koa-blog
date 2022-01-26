const service = require('./service')
const response = require('../../util/response')
const { v4: uuidv4 } = require('uuid');
const {
    APP_BASE, APP_PORT
} = require('../../app/config')
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
    return response.combineRes(ctx, result, null, '创建成功', 200)
}
const detailPhoto = async (ctx) => {
    const { id, page, size } = ctx.request.query
    const result = await service.detailPhoto(id, page, size)
    return response.combineRes(ctx, result)
}
const editPhoto = async (ctx) => {
    const { id, title, tag, password } = ctx.request.body
    const result = await service.editPhoto(id, title, tag, password)
    return response.combineRes(ctx, result, id, '编辑成功', 200)
}
const uploadPhoto = async (ctx) => {
    let picarr = []
    for (let i = 0; i < ctx.files.length; i++) {
        picarr.push({
            photoid: ctx.request.body.id,
            url: `${APP_BASE}:${APP_PORT}/photo/${ctx.files[i].filename}`
        })
    }
    const result = await service.uploadPhoto(picarr)
    return response.combineRes(ctx, result, result, '上传成功', 200)
}
const setCover = async (ctx) => {
    const { id, url } = ctx.request.body
    const result = await service.setCover(id, url)
    return response.combineRes(ctx, result, result, '设置成功', 200)
}
const delPictures = async (ctx) => {
    const { ids } = ctx.request.body
    const result = await service.delPictures(ids)
    return response.combineRes(ctx, result, result, '删除成功', 200)
}
module.exports = {
    getPhotoList,
    delPhoto,
    addPhoto,
    detailPhoto,
    editPhoto,
    uploadPhoto,
    setCover,
    delPictures
}