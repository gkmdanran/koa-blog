const service=require('../service/SystemUserService')
const {successRes,errorRes}=require('../app/result')
const md5 = require('md5-node');
const {
    SERCET_KEY
}=require('../app/config')
const verifyAddUser=async (ctx,next)=>{
    const result=await service.getUser(ctx.request.body.username)
    if(result.length!==0)
        return ctx.body=errorRes('用户已存在')
    else if(result===false){
        
        return ctx.body=errorRes('数据库异常',500)
    }
        
    await next()
}
const verifyPassword=async (ctx,next)=>{
    const result=await service.getUser(ctx.request.body.username)
    if(result[0].password!=md5(md5(ctx.request.body.oldpassword)+SERCET_KEY))
        return ctx.body=errorRes('旧密码错误')
    else if(result===false){
        return ctx.body=errorRes('数据库异常',500)
    }
        
    await next()
}
module.exports={
    verifyAddUser,
    verifyPassword
}