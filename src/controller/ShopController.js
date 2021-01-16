const service=require('../service/ShopService')
const {successRes,errorRes}=require('../app/result')
const list= async (ctx,next)=>{
    var searchQuery=ctx.request.query
    const result=await service.list(searchQuery,ctx.user.manage_city_id)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const changeStatus=async(ctx)=>{
    
    const result=await service.changeStatus(ctx.request.body.id)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
module.exports={
    list,
    changeStatus
}