const service=require('../service/ArticleService')
const {successRes,errorRes}=require('../app/result')
const list= async (ctx,next)=>{
    var searchQuery=ctx.request.query
    const result=await service.list(searchQuery,ctx.user.manage_city_id)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const deleteArticle= async (ctx,next)=>{
    
    
    const {id}=ctx.request.body
    
    const result=await service.deleteArticle(id)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const hideArticle= async (ctx,next)=>{
    
    
    const {id,type}=ctx.request.body
    
    const result=await service.hideArticle(type,id)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
module.exports={
    list,
    deleteArticle,
    hideArticle
}