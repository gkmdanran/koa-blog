const connection=require('../app/database')


const getCityList=async (name)=>{
    const statement=`select * from db_yhm_city where class_name LIKE '%${name}%' and class_type=2`
    try {
        const [list]=await connection.execute(statement)
        return {list}
    } catch (error) {
        console.log(error)
        return false
    }
}
const getProvinceList=async ()=>{
    const statement=`select * from db_yhm_city where class_type=1`
    try {
        const [list]=await connection.execute(statement)
        return {list}
    } catch (error) {
        console.log(error)
        return false
    }
}
const getCityListByParent=async (pid)=>{
    const statement=`select * from db_yhm_city where class_parent_id=?`
    try {
        const [list]=await connection.execute(statement,[pid])
        return {list}
    } catch (error) {
        console.log(error)
        return false
    }
}
module.exports={
    getCityList,
    getProvinceList,
    getCityListByParent
}