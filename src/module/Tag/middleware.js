const response = require('../../util/response')
const service = require('./service')
const verifyAdd = async (ctx, next) => {
    const { name } = ctx.request.body
    const result = await service.getTagList(1, 999999, name)
    if (result === false)
        return response.errorRes(ctx, '数据库错误')
    if (result.list.length >= 1)
        return response.errorRes(ctx, '标签已存在')
    await next()
}
const verifyDel = async (ctx, next) => {
    const { id } = ctx.request.body
    const result = await service.verifyDel(id)
    if (result === false)
        return response.errorRes(ctx, '数据库错误')
    if (result.length >= 1)
        return response.errorRes(ctx, '标签下存在文章不能删除')
    await next()
}

module.exports = {
    verifyAdd,
    verifyDel
}