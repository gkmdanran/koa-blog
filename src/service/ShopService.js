const connection=require('../app/database')
const uuid=require('node-uuid')
const list=async (searchQuery,manage_city_id)=>{
    const {goods_type='',status='',goods_name='',page=1,limit=10}=searchQuery
    console.log(searchQuery,manage_city_id)
    var offset=(page-1)*limit
    
    const [result]=await connection.execute(`
    select  count(*) total from shop sh 
    left join client_user cu 
    on sh.client_id=cu.id 
    where sh.goods_type like '%${goods_type}%' and
    sh.status like '%${status}%' and
    sh.goods_name like '%${goods_name}%' and
    (cu.city_id=? or cu.city_id-?=cu.city_id-1)
    `,[manage_city_id,manage_city_id])
    var total=result[0].total
    
    const statement=`
    select sh.id,sh.client_id,sh.contact_way,sh.contact_number,sh.goods_name,sh.goods_type,
    sh.goods_desc,sh.goods_price,sh.goods_pic,sh.remark,sh.createAt,sh.status,
    cu.city_id,cu.school_id,cu.username
    from shop sh left join client_user cu on sh.client_id=cu.id
    where sh.goods_type like '%${goods_type}%' and
    sh.status like '%${status}%' and
    sh.goods_name like '%${goods_name}%' and
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
    
    const statement=`UPDATE shop SET status=4 WHERE id=?`
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