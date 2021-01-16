const app=require('./app')
const {APP_PORT}=require('./app/config')

require('./app/database')



app.listen(APP_PORT,()=>{
    console.log(`${APP_PORT}服务器启动成功...`)
}) 
