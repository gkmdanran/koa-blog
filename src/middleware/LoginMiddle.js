const jwt=require('jsonwebtoken')
const {getUser}=require('../service/SystemUserService')
const md5 = require('md5-node');
const {successRes,errorRes}=require('../app/result')
const {
    SERCET_KEY
}=require('../app/config')
const verifyLogin=async (ctx,next)=>{
    const {username,password}=ctx.request.body
    if(!username||!password)
        return ctx.body=errorRes('请输入用户名或密码')
    const result=await getUser(username)
   
    if(result.length==0)
        return ctx.body=errorRes('用户不存在')
    if(result==false)
        return ctx.body=errorRes('数据库错误',500)
    
    if(md5(md5(password)+SERCET_KEY)!=result[0].password)
        return ctx.body=errorRes('密码错误')
    ctx.user=result[0]

    await next()
}
const verifyAuth=async (ctx,next)=>{
    
    const authorization=ctx.headers.authorization||''
    const token=authorization.replace('Bearer ','')
    
    try {
        var result=jwt.verify(token,SERCET_KEY)
        ctx.user=result
        
        await next()
    } catch (err) {
        console.log(err)
        return ctx.body=errorRes('您无权限',401)
        
    }
    
    
}
module.exports={
    verifyLogin,
    verifyAuth
}