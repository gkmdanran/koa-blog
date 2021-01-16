const connection=require('../app/database')

const getCount=async (sql)=>{
    const statement=`${sql}`
    try {
        const [result]=await connection.execute(statement)
        return result[0].total
    } catch (error) {
        console.log(error)
        return false
    }
    
}
module.exports={
    getCount
}