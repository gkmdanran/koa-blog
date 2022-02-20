const service = require('./service')
const response = require('../../util/response')
const getTagList = async (ctx) => {
    const { query, page, size } = ctx.request.query
    const result = await service.getTagList(page, size, query)
    return response.combineRes(ctx, result)
}
const getBlogTagList = async (ctx) => {
    const result = await service.getBlogTagList()
    return response.combineRes(ctx, result)
}

const delTag = async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.delTag(id)
    return response.combineRes(ctx, result, id, '删除成功', 200)
}
const addTag = async (ctx) => {
    const { type, name } = ctx.request.body
    const result = await service.addTag(type, name)
    return response.combineRes(ctx, result, { type, name, id: result.insertId }, '添加成功', 200)
}
module.exports = {
    getTagList,
    getBlogTagList,
    delTag,
    addTag
}