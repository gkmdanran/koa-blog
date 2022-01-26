const response = require('../../util/response')
const service = require('./service')
const verifyAdd = async (ctx, next) => {
    const { title, tag, password } = ctx.request.body
    const result = await service.getPhoto(title)
    if (result === false)
        return response.errorRes(ctx, '数据库错误')
    if (ctx.url == '/admin/photo/edit' && result[0] && ctx.request.body.id != result[0].id)
        return response.errorRes(ctx, '相册名不能重复')
    if (ctx.url == '/admin/photo/add' && result.length >= 1)
        return response.errorRes(ctx, '相册名不能重复')
    if (tag.length > 2)
        return response.errorRes(ctx, '标签名最多两个字')
    let reg = /^[a-zA-z0-9]{4,10}$/
    if (password && !reg.test(password))
        return response.errorRes(ctx, '密码请输入4-10位的英文或数字')
    await next()
}
const verifydel = async (ctx, next) => {
    const result=await service.getPicList(ctx.request.body.id)
    if(result.length>0)
    return response.errorRes(ctx, '相册下存在照片，不能直接删除')
    await next()
}

module.exports = {
    verifyAdd,
    verifydel
}