const service=require('../service/CityService')
const {successRes,errorRes}=require('../app/result')
const getCityList=async (ctx)=>{
    const {name}=ctx.request.query
    const result=await service.getCityList(name)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const getProvinceList=async (ctx)=>{
    const result=await service.getProvinceList()
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
const getCityListByParent=async (ctx)=>{
    const {pid}=ctx.request.query
    const result=await service.getCityListByParent(pid)
    if(result)
        return ctx.body=successRes(result)
    else 
        return ctx.body=errorRes('数据库异常',500)
}
module.exports={
    getCityList,
    getProvinceList,
    getCityListByParent
}