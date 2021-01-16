const service=require('../service/ClientService')
const {successRes,errorRes}=require('../app/result')
const list= async (ctx,next)=>{
    var searchQuery=ctx.request.query
    const result=await service.list(searchQuery,ctx.user.manage_city_id)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const changeActive=async(ctx)=>{
    
    const result=await service.changeActive(ctx.request.body.id,ctx.request.body.type)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
module.exports={
    list,
    changeActive
}