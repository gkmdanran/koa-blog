function successRes(data = null, msg = '', code = 200) {
    return {
        code,
        msg,
        data,
    }
}
function errorRes(msg = 'error', code = 0) {
    return {
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
function combineRes(ctx, result, response=null, msg = '', code = 200) {
    if (result)
        return ctx.body = successRes(response ? response : result, msg, code)
    else
        return ctx.body = errorRes('数据库异常', 500)
}
module.exports = {
    successRes,
    errorRes,
    combineRes
}