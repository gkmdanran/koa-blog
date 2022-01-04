const md5 = require('md5-node');
const service = require('./service')
const response = require('../../util/response')
const {
    SERCET_KEY
} = require('../../app/config')
const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (!username || !password)
        return response.errorRes(ctx, '请输入用户名或密码')
    const result = await service.getUser(username)
    if (result === false)
        return response.errorRes(ctx, '数据库错误')
    if (result.length === 0)
        return response.errorRes(ctx, '用户不存在')
    if (md5(md5(password) + SERCET_KEY) != result[0].password)
        return response.errorRes(ctx,'密码错误')
    ctx.user = result[0]
    await next()
}
const verifyPassword = async (ctx, next) => {
    const { oldPassword, newPassword } = ctx.request.body
    const {username}=ctx.user
    let reg=/^[a-zA-z0-9]{6,18}$/
    if (!reg.test(newPassword))
        return response.errorRes(ctx, '请输入6-18位的英文或数字')
    const result = await service.getUser(username)
    if (result === false)
        return response.errorRes(ctx, '数据库错误')
    if (md5(md5(oldPassword) + SERCET_KEY) != result[0].password)
        return response.errorRes(ctx,'旧密码错误')
    await next()
}
module.exports = {
    verifyLogin,
    verifyPassword
}