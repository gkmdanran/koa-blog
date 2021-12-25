const service = require('./service')
const response = require('../../util/response')
const getTagList = async (ctx) => {
    const { query, page, size } = ctx.request.query
    const result = await service.getTagList(page, size, query)
    response.combineRes(ctx, result)
}
const delTag = async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.delTag(id)
    response.combineRes(ctx, result,id,'删除成功',200)
}
module.exports = {
    getTagList,
    delTag
}