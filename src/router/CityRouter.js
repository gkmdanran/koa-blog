const Router=require('koa-router')
const CityRouter=new Router()
const controller=require('../controller/CityController')
const middle=require('../middleware/LoginMiddle')
CityRouter.get('/city',middle.verifyAuth,controller.getCityList)
CityRouter.get('/province',middle.verifyAuth,controller.getProvinceList)
CityRouter.get('/citypid',middle.verifyAuth,controller.getCityListByParent)
module.exports=CityRouter