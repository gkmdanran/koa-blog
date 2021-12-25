const service = require('./service')
const response = require('../../util/response')
const getChatList = async (ctx) => {
    const { page, size } = ctx.request.query
    const result = await service.getChatList(page, size)
    response.combineRes(ctx, result)
}
const delChat = async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.delChat(id)
    response.combineRes(ctx, result, id, '删除成功', 200)
}
module.exports = {
    getChatList,
    delChat
}