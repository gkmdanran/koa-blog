const response = require('../../util/response')

const verifyDel = async (ctx, next) => {
    const { ids } = ctx.request.body
    if (!ids.length > 0)
        return response.errorRes(ctx, 'id数组不能为空')
    await next()
}
const verifyAdd = async (ctx, next) => {
    const { chatName, chatContent, chatNumber } = ctx.request.body
    if (!chatName || chatName.length > 10)
        return response.errorRes(ctx, '昵称不能为空或昵称不合法')
    if (!chatContent || chatContent.length > 100)
        return response.errorRes(ctx, '内容不能为空或内容不合法')
    if (chatNumber.length > 30)
        return response.errorRes(ctx, '号码不合法')
    await next()
}

module.exports = {
    verifyDel,
    verifyAdd,
}