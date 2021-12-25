const md5 = require('md5-node');
const service = require('./service')
const response = require('../../util/response')
const {
    SERCET_KEY
} = require('../../app/config')
const verifyLogin = async (ctx, next) => {
    const { username, password } = ctx.request.body
    if (!username || !password)
        return ctx.body = response.errorRes('请输入用户名或密码')
    const result = await service.getUser(username)

    if (result == false)
        return ctx.body = response.errorRes('数据库错误', 500)
    
    if (result.length == 0)
        return ctx.body = response.errorRes('用户不存在')

    // if (md5(md5(password) + SERCET_KEY) != result[0].password)
    //     return ctx.body = response.errorRes('密码错误')
    if (password != result[0].password)
        return ctx.body = response.errorRes('密码错误')
    ctx.user = result[0]
    await next()
}

module.exports = {
    verifyLogin,
}