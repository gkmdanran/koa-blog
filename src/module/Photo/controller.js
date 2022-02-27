const service = require('./service')
const response = require('../../util/response')
const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')
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
    if (result == undefined) {
        return response.errorRes(ctx, '相册不存在')
    }
    return response.combineRes(ctx, result)
}
const editPhoto = async (ctx) => {
    const { id, title, tag, password } = ctx.request.body
    const result = await service.editPhoto(id, title, tag, password)
    return response.combineRes(ctx, result, id, '编辑成功', 200)
}
const uploadPhoto = async (ctx) => {
    let picarr = []
    for (let file of ctx.files) {
        let fileArray = file.filename.split('.')
        let fileExtension = fileArray[fileArray.length - 1]
        let previewFilename = `${fileArray[0]}-small.${fileExtension}`
        let destPath = path.join(file.destination, previewFilename)
        Jimp.read(file.path).then(img=>{
            img.resize(320,Jimp.AUTO).write(destPath)
        })
        picarr.push({
            photoid: ctx.request.body.id,
            url: `${APP_BASE}:${APP_PORT}/photo/${file.filename}`,
            previewUrl: `${APP_BASE}:${APP_PORT}/photo/${previewFilename}`,
            filename: file.filename
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
    const { pics } = ctx.request.body
    let ids = []
    for (let i = 0; i < pics.length; i++) {
        let fileArray = pics[i].filename.split('.')
        let fileExtension = fileArray[fileArray.length - 1]
        let previewFilename = `${fileArray[0]}-small.${fileExtension}`
        fs.unlinkSync(path.resolve(__dirname, `../../../files/photo/${pics[i].filename}`))
        fs.unlinkSync(path.resolve(__dirname, `../../../files/photo/${previewFilename}`))
        ids.push(pics[i].id)
    }
    const result = await service.delPictures(ids)
    return response.combineRes(ctx, result, result, '删除成功', 200)
}
const checkPhotoPassword = async (ctx) => {
    const { id, password } = ctx.request.body
    const result = await service.checkPhotoPassword(id)
    if (result[0] && password == result[0].password) {
        response.successRes(ctx)
    } else {
        response.errorRes(ctx)
    }
}
module.exports = {
    getPhotoList,
    delPhoto,
    addPhoto,
    detailPhoto,
    editPhoto,
    uploadPhoto,
    setCover,
    delPictures,
    checkPhotoPassword
}