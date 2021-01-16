const jwt=require('jsonwebtoken')

const {successRes,errorRes}=require('../app/result')
const login=async (ctx)=>{
    const {id,username,role,manage_city_id}=ctx.user
        
    const token=jwt.sign({id,username,manage_city_id},SERCET_KEY,{
        expiresIn:60*60*24 
    })
    
    return ctx.body=successRes({
        id,username,role,manage_city_id,token
    })
}
module.exports={
    login
}