const jwt = require('jsonwebtoken')
const response = require('../util/response')
const {
    SERCET_KEY
} = require('../app/config')
const verifyAuth = async (ctx, next) => {
    const authorization = ctx.headers.authorization || ''
    const token = authorization.replace('Bearer ', '')
    try {
        var result = jwt.verify(token, SERCET_KEY)
        ctx.user = result
        await next()
    } catch (err) {
        console.log(err)
        return ctx.body = response.errorRes('暂无权限，请登录后再操作！', '401')
    }
}
module.exports = verifyAuth