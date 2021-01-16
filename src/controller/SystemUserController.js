const service=require('../service/SystemUserService')
const {successRes,errorRes}=require('../app/result')

const list= async (ctx,next)=>{
    var searchQuery=ctx.request.query
    const result=await service.list(searchQuery)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const deleteUser= async (ctx,next)=>{
    
    
    const {id,username}=ctx.request.body
    if(username==='admin')
        return ctx.body=errorRes('admin不能删除')
    const result=await service.deleteUser(id)
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
    if(ctx.request.query.username=='admin')return ctx.body=errorRes('admin不能随意修改')
    const result=await service.getUser(ctx.request.query.username)
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
const changePasssword=async (ctx)=>{
    
    const result=await service.changePasssword(ctx)
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
    edit,
    changePasssword
}