const mysql=require('mysql2')
const {
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_ROOT,
    MYSQL_PASSWORD
}=require('./config')
const connections=mysql.createPool({
    host:MYSQL_HOST,
    port:MYSQL_PORT,
    database:MYSQL_DATABASE,
    user:MYSQL_ROOT,
    password:MYSQL_PASSWORD
})
connections.getConnection((err,conn)=>{
    conn.connect((err)=>{
        if(err)
            console.log('连接数据库失败:',err)
        else
            console.log('连接数据库成功...')
    })
})
module.exports=connections.promise()