const connection=require('../app/database')
const uuid=require('node-uuid')
const md5 = require('md5-node');
const {
    SERCET_KEY
}=require('../app/config')
const list=async (searchQuery)=>{
    const {username='',page=1,limit=10}=searchQuery
    var offset=(page-1)*limit

    const [result]=await connection.execute(`select count(*) total from sys_user where username LIKE '%${username}%'`)
    var total=result[0].total

    const statement=`select u.id,u.username,u.phone,u.role,u.createAt,u.manage_city_id,c.class_name city_name from sys_user u left JOIN db_yhm_city c on u.manage_city_id=c.class_id  
                    where username  LIKE '%${username}%' ORDER BY createAt limit ?,?`
    try {
        const [list]=await connection.execute(statement,[offset,limit])
        return {page,limit,total,list}
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteUser=async(id)=>{
    const statement=`DELETE FROM sys_user WHERE id=?;`
    try {
        const [result]=await connection.execute(statement,[id])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }
    
}

const add=async (user)=>{
    const {username,password,phone,manage_city_id}=user
    const statement=`INSERT INTO sys_user (id,username,password,phone,manage_city_id,role) VALUES (?,?,?,?,?,1)`
    try {
        const [result]=await connection.execute(statement,[uuid.v4(),username,md5(md5(password)+SERCET_KEY),phone,manage_city_id])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}

const getUser=async (username)=>{
    const statement=`select id,username,phone,manage_city_id,role,password from sys_user where username=?`
    try {
        const [result]=await connection.execute(statement,[username])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}
const edit=async (ctx)=>{
    const {phone,manage_city_id,id}=ctx.request.body
    const statement=`UPDATE sys_user SET phone=?,manage_city_id=? WHERE id=?`
    try {
        const [result]=await connection.execute(statement,[phone,manage_city_id,id])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}
const changePasssword=async (ctx)=>{
    const {newpassword,username}=ctx.request.body
    const statement=`UPDATE sys_user SET password=? WHERE username=?`
    try {
        const [result]=await connection.execute(statement,[md5(md5(newpassword)+SERCET_KEY),username])
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports={
    list,
    deleteUser,
    add,
    getUser,
    edit,
    changePasssword
}