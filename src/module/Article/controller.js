const service = require('./service')
const response = require('../../util/response')
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
    const { title, page, size ,tag} = ctx.request.query
    const result = await service.getArticle(page, size, title,tag)
    return response.combineRes(ctx, result)
}
const delArticle= async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.delArticle(id)
    return response.combineRes(ctx, result, id, '删除成功', 200)
}
module.exports = {
    addArticle,
    topArticle,
    hideArticle,
    getArticle,
    delArticle
}