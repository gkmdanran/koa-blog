const service=require('../service/SchoolService')
const {successRes,errorRes}=require('../app/result')
const verifyAddSchool=async (ctx,next)=>{
    const result=await service.getSchool(ctx.request.body.schoolName,ctx.request.body.number)
    if(result.length!==0)
        return ctx.body=errorRes('学校已经存在')
    else if(result===false){
        
        return ctx.body=errorRes('数据库异常',500)
    }
        
    await next()
}
const verifyEditSchool=async (ctx,next)=>{
    const result=await service.getSchool(ctx.request.body.schoolName,ctx.request.body.number)
    if(result.length!==0&&ctx.request.body.id!==result[0].id)
        return ctx.body=errorRes('学校已经存在')
    else if(result===false){
        
        return ctx.body=errorRes('数据库异常',500)
    }
        
    await next()
}
module.exports={
    verifyAddSchool,
    verifyEditSchool
}