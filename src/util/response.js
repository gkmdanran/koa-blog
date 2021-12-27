function successRes(ctx, data = null, msg = '', code = 200) {
    return ctx.body = {
        code,
        msg,
        data,
    }
}
function errorRes(ctx, msg = 'error', code = 0) {
    return ctx.body = {
        code,
        msg,
        data: null
    }
}
/*
result:数据库执行结果，false则数据库执行错误
response:相应的data内容
msg:返回信息
code:状态码
*/
function combineRes(ctx, result, response = null, msg = '', code = 200) {
    if (result === false) {
        return errorRes(ctx, '数据库异常', 500)
    }
    else {
        return successRes(ctx, response ? response : result, msg, code)
    }
}
module.exports = {
    successRes,
    errorRes,
    combineRes
}