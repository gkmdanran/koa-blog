const jwt = require('jsonwebtoken')
const response = require('../../util/response')
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
module.exports = {
    systemLogin,
}