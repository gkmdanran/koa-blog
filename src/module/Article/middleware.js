const response = require('../../util/response')
const service = require('./service')
const verifyAdd = async (ctx, next) => {
    const { title, tagList, mdValue } = ctx.request.body
    if (!title)
        return response.errorRes(ctx, '标题不能为空')
    else if (tagList.length <= 0 || tagList.length > 3)
        return response.errorRes(ctx, '请选择1-3个标签')
    else if (!mdValue)
        return response.errorRes(ctx, '内容不能为空')

    await next()
}


module.exports = {
    verifyAdd,

}