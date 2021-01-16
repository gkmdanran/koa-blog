const connection=require('../app/database')
const uuid=require('node-uuid')
const list=async (searchQuery,manage_city_id)=>{
    const {name='',page=1,limit=10}=searchQuery
    
    var offset=(page-1)*limit
    
    const [result]=await connection.execute(`
    select  count(*) total from school s where s.name like '%${name}%' and (s.city_id=? or s.city_id-?=s.city_id-1)
    `,[manage_city_id,manage_city_id])
    var total=result[0].total

    const statement=`select s.id,s.name,s.number,s.createAt,c.class_name city_name,c1.class_name province_name from school s 
    left JOIN db_yhm_city c on s.city_id=c.class_id 
    left JOIN db_yhm_city c1 on s.province_id=c1.class_id 
    where s.name like '%${name}%' and (s.city_id=? or s.city_id-?=s.city_id-1) ORDER BY createAt limit ?,?`
    
    try {
        const [list]=await connection.execute(statement,[manage_city_id,manage_city_id,offset,limit])
        
        return {page,limit,total,list}
    } catch (error) {
        console.log(error)
        return false
    }
}
const deleteSchool=async(id)=>{
    const statement=`DELETE FROM school WHERE id=?;`
    try {
        const [result]=await connection.execute(statement,[id])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }
    
}
const add=async (school)=>{
    const {schoolName,province_id,city_id,number}=school
    const statement=`INSERT INTO school (id,name,province_id,city_id,number) VALUES (?,?,?,?,?)`
    try {
        const [result]=await connection.execute(statement,[uuid.v4(),schoolName,province_id,city_id,number])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}
const getSchool=async (name,number)=>{
    const statement=`select id,name schoolName,province_id,city_id,number from school where name=? and number=?`
    try {
        const [result]=await connection.execute(statement,[name,number])
       
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}
const edit=async (ctx)=>{
    const {schoolName,province_id,city_id,number,id}=ctx.request.body
    const statement=`UPDATE school SET name=?,province_id=?,city_id=?,number=? WHERE id=?`
    try {
        const [result]=await connection.execute(statement,[schoolName,province_id,city_id,number,id])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports={
    list,
    deleteSchool,
    add,
    getSchool,
    edit
}