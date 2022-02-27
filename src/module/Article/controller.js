const service = require('./service')
const response = require('../../util/response')
const {
    APP_BASE, APP_PORT
} = require('../../app/config')
const addArticle = async (ctx) => {
    const { title, link, tagList, mdValue, description } = ctx.request.body
    let tagIds = []
    for (let tag of tagList) {
        tagIds.push(tag.id)
    }
    const result = await service.addArticle(title, link, tagIds, mdValue, description)
    return response.combineRes(ctx, result, null, '发布成功', 200)
}
const topArticle = async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.topArticle(id)
    return response.combineRes(ctx, result, id, '操作成功', 200)
}
const hideArticle = async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.hideArticle(id)
    return response.combineRes(ctx, result, id, '操作成功', 200)
}
const getArticle = async (ctx) => {
    const { title, page, size, tag } = ctx.request.query
    const result = await service.getArticle(page, size, title, tag)
    return response.combineRes(ctx, result)
}
const delArticle = async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.delArticle(id)
    return response.combineRes(ctx, result, id, '删除成功', 200)
}
const detailArticle = async (ctx) => {
    const { id } = ctx.request.query
    const result = await service.detailArticle(id)
    if (result === null) {
        return response.errorRes(ctx, '文章不存在')
    }
    return response.combineRes(ctx, result)
}
const detailBlogArticle = async (ctx) => {
    const { id } = ctx.request.query
    const result = await service.detailArticle(id, 'blog')
    if (result === null) {
        return response.errorRes(ctx, '文章不存在')
    }
    return response.combineRes(ctx, result)
}
const editArticle = async (ctx) => {
    const { id, title, link, tagList, mdValue, description } = ctx.request.body
    let tagIds = []
    for (let tag of tagList) {
        tagIds.push(tag.id)
    }
    const result = await service.editArticle(id, title, link, tagIds, mdValue, description)
    return response.combineRes(ctx, result, null, '发布成功', 200)
}
const uploadArticle = async (ctx) => {
    let url = `${APP_BASE}:${APP_PORT}/article/${ctx.file.filename}`
    let type = 0
    const result = await service.uploadArticle(url, type, ctx.file.filename)
    return response.combineRes(ctx, result, url, '上传成功', 200)
}
const addStar = async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.addStar(id)
    return response.combineRes(ctx, result, id, '点赞成功，感谢认可', 200)
}
const getMenuArticleList = async (ctx) => {
    const result = await service.getMenuArticleList()
    return response.combineRes(ctx, result)
}
const searchArticle = async (ctx) => {
    const { query } = ctx.request.query
    const result = await service.searchArticle(query)
    return response.combineRes(ctx, result)
}
const getArticleListBytag = async (ctx) => {
    const { id, page, size } = ctx.request.query
    const result = await service.getArticleListBytag(id, page, size)
    if (result == null) return response.errorRes(ctx)
    return response.combineRes(ctx, result)
}
const getHomeArtilceList = async (ctx) => {
    const { page, size } = ctx.request.query
    const result = await service.getHomeArtilceList(page, size)
    return response.combineRes(ctx, result)
}
const downloadArticle = async (ctx) => {
    const { id } = ctx.request.query
    const result = await service.downloadArticle(id)
    if (result == false) return response.errorRes(ctx, '数据库异常', 500)
    if (!result[0]) return response.errorRes(ctx, '文章不存在')
    let filename = encodeURIComponent(`${result[0].title}.md`)
    ctx.set('Content-disposition', 'attachment; filename=' + filename)
    ctx.set('Content-type', 'application/force-download')
    ctx.body = result[0].mdValue
}
module.exports = {
    addArticle,
    topArticle,
    hideArticle,
    getArticle,
    delArticle,
    detailArticle,
    editArticle,
    uploadArticle,
    addStar,
    getMenuArticleList,
    detailBlogArticle,
    searchArticle,
    getArticleListBytag,
    getHomeArtilceList,
    downloadArticle
}