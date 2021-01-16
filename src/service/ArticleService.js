const connection=require('../app/database')
const list=async (searchQuery,manage_city_id)=>{
    const {title='',page=1,limit=10}=searchQuery
    var offset=(page-1)*limit
    console.log(searchQuery,manage_city_id)
    const [result]=await connection.execute(`select count(*) total from article 
    where title LIKE '%${title}%' and 
    (city_id=? or city_id-?=city_id-1)`,[manage_city_id,manage_city_id])
    var total=result[0].total
    console.log(total)
    const statement=`SELECT a.id,a.title,a.content,a.status,a.createAt,a.updateAt,s.username 
    from article a left join sys_user s on a.writer_id=s.id
    where a.title like '%${title}%' and
    (a.city_id=? or a.city_id-?=a.city_id-1) limit ?,?`
    try {
        const [list]=await connection.execute(statement,[manage_city_id,manage_city_id,offset,limit])
        return {page,limit,total,list}
    } catch (error) {
        console.log(error)
        return false
    }
}
const deleteArticle=async(id)=>{
    const statement=`DELETE FROM article WHERE id=?;`
    try {
        const [result]=await connection.execute(statement,[id])
        
        return result
    } catch (error) {
        console.log(error)
        return false
    }
}
const hideArticle=async(type,id)=>{
    const statement=`UPDATE article SET status=? WHERE id=?;`
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
    deleteArticle,
    hideArticle
}