const connection=require('../app/database')
const uuid=require('node-uuid')
const list=async (searchQuery,manage_city_id)=>{
    const {type='',status='',goods_name='',page=1,limit=10}=searchQuery
    console.log(searchQuery,manage_city_id)
    var offset=(page-1)*limit
    
    const [result]=await connection.execute(`
    select  count(*) total from lose l 
    left join client_user cu 
    on l.client_id=cu.id 
    where l.type like '%${type}%' and
    l.status like '%${status}%' and
    l.goods_name like '%${goods_name}%' and
    (cu.city_id=? or cu.city_id-?=cu.city_id-1)
    `,[manage_city_id,manage_city_id])
    var total=result[0].total
    console.log(total)
    const statement=`select l.id,l.client_id,l.contact_way,l.contact_number,l.goods_name,
    l.goods_type,l.goods_desc,l.goods_pic,l.remark,l.type,l.createAt,l.status,cu.city_id,cu.school_id,cu.username
    from lose l 
    left join client_user cu 
    on l.client_id=cu.id 
    where l.type like '%${type}%' and
    l.status like '%${status}%' and
    l.goods_name like '%${goods_name}%' and
    (cu.city_id=? or cu.city_id-?=cu.city_id-1) ORDER BY createAt limit ?,?`
    
    try {
        const [list]=await connection.execute(statement,[manage_city_id,manage_city_id,offset,limit])
        
        return {page,limit,total,list}
    } catch (error) {
        console.log(error)
        return false
    }
}
const changeStatus=async(id)=>{
    
    const statement=`UPDATE lose SET status=1 WHERE id=?`
    try {
        const [result]=await connection.execute(statement,[id])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports={
    list,
    changeStatus
}