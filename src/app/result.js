const successRes=(data=null,msg='success',code=200)=>{
    return {
        code,
        msg,
        data,
    }
}
const errorRes=(msg='error',code=0,)=>{
    return {
        code,
        msg,
        data:null
    }
}
module.exports={
    successRes,
    errorRes
}