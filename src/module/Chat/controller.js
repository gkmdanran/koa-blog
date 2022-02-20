const service = require('./service')
const response = require('../../util/response')
const getChatList = async (ctx) => {
    const { page, size, queryPeople, queryDate } = ctx.request.query
    const result = await service.getChatList(page, size, queryPeople, queryDate)
    return response.combineRes(ctx, result)
}
const getBlogChatList = async (ctx) => {
    const { page, size, } = ctx.request.query
    const result = await service.getBlogChatList(page, size)
    return response.combineRes(ctx, result)
}
const delChat = async (ctx) => {
    const { ids } = ctx.request.body
    const result = await service.delChat(ids)
    return response.combineRes(ctx, result, ids, '删除成功', 200)
}
const addChat = async (ctx) => {
    const { chatName, chatContent, chatWay, chatNumber } = ctx.request.body
    let newChatWay = `${chatWay}:${chatNumber}`
    const result = await service.addChat(chatName, chatContent, newChatWay)
    return response.combineRes(ctx, result, result, '评论成功,谢谢您~', 200)
}
module.exports = {
    getChatList,
    getBlogChatList,
    delChat,
    addChat
}