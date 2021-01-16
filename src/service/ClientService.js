const connection=require('../app/database')
const uuid=require('node-uuid')
const md5 = require('md5-node');
const list=async (searchQuery,manage_city_id)=>{
    const {username='',page=1,limit=10,realname='',nickname=''}=searchQuery
    var offset=(page-1)*limit
    console.log(searchQuery,manage_city_id)
    const [result]=await connection.execute(`select count(*) total from client_user 
    where username LIKE '%${username}%' and 
    nickname LIKE '%${nickname}%' and 
    realname LIKE '%${realname}%' and 
    (city_id=? or city_id-?=city_id-1)`,[manage_city_id,manage_city_id])
    var total=result[0].total
    console.log(total)
    const statement=`select cu.id,cu.username,cu.photo,cu.nickname,cu.city_id,cu.school_id,
    cu.college,cu.clazz,cu.studentnum,cu.sex,cu.phone,cu.realname,
    cu.cardnum,cu.is_active,cu.createAt,ci.class_name city_name,s.name school_name 
    from client_user cu 
    left JOIN  db_yhm_city ci on cu.city_id=ci.class_id
    LEFT JOIN school s on cu.school_id=s.id
    where cu.username like '%${username}%' and 
    cu.nickname like '%${nickname}%' and 
    cu.realname like '%${realname}%' and 
    (cu.city_id=? or cu.city_id-?=cu.city_id-1) limit ?,?`
    try {
        const [list]=await connection.execute(statement,[manage_city_id,manage_city_id,offset,limit])
        return {page,limit,total,list}
    } catch (error) {
        console.log(error)
        return false
    }
}
const changeActive=async(id,type)=>{
    
    const statement=`UPDATE client_user SET is_active=? WHERE id=?`
    try {
        const [result]=await connection.execute(statement,[type,id])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }

}
module.exports={
    list,
    changeActive
}