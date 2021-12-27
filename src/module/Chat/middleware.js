const response = require('../../util/response')

const verifyDel = async (ctx, next) => {
    const { ids } = ctx.request.body
    if(!ids.length>0)
        return response.errorRes(ctx,'id数组不能为空')
    await next()
}

module.exports = {
    verifyDel,
}