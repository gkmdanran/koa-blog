const service = require('./service')
const response = require('../../util/response')
const getChatList = async (ctx) => {
    const { page, size, queryPeople, queryDate } = ctx.request.query
    const result = await service.getChatList(page, size, queryPeople, queryDate)
    return response.combineRes(ctx, result)
}
const delChat = async (ctx) => {
    const { ids } = ctx.request.body
    const result = await service.delChat(ids)
    return response.combineRes(ctx, result, ids, '删除成功', 200)
}
module.exports = {
    getChatList,
    delChat
}