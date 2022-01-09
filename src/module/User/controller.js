const jwt = require('jsonwebtoken')
const md5 = require('md5-node');
const response = require('../../util/response')
const service = require('./service')
const {
    SERCET_KEY
} = require('../../app/config')
const systemLogin = async (ctx) => {
    const { id, username } = ctx.user
    const token = jwt.sign({ id, username }, SERCET_KEY, {
        expiresIn: 60 * 60 * 6
    })
    return response.successRes(ctx, {
        id, username, token
    }, '登录成功')
}
const changePassword = async (ctx) => {
    const { newPassword } = ctx.request.body
    const { username } = ctx.user
    let mdPassword = md5(md5(newPassword) + SERCET_KEY)
    const result = await service.changePassword(username, mdPassword)
    return response.combineRes(ctx, result, username)
}
module.exports = {
    systemLogin,
    changePassword
}