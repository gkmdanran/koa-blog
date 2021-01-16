const service=require('../service/SchoolService')
const {successRes,errorRes}=require('../app/result')
const list= async (ctx,next)=>{
    var searchQuery=ctx.request.query
    const result=await service.list(searchQuery,ctx.user.manage_city_id)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const deleteUser= async (ctx,next)=>{
    
    const {id}=ctx.request.body
    const result=await service.deleteSchool(id)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const add=async (ctx)=>{
    var isEmpty=false
    Object.keys(ctx.request.body).forEach((x)=>{
        if(!ctx.request.body[x]){
            isEmpty=true
        }
    });
    if(isEmpty)return ctx.body=errorRes('信息不全')
    
    const result=await service.add(ctx.request.body)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const detail=async (ctx)=>{
   
    const result=await service.getSchool(ctx.request.query.name,ctx.request.query.number)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const edit=async (ctx)=>{
    var isEmpty=false
    Object.keys(ctx.request.body).forEach((x)=>{
        if(!ctx.request.body[x]){
            isEmpty=true
        }
    });
    if(isEmpty)return ctx.body=errorRes('信息不全')
    const result=await service.edit(ctx)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
module.exports={
    list,
    deleteUser,
    add,
    detail,
    edit
}