const connection = require('../app/database')
const pageQuery = async (page, size, query,) => {
    const statement = `${query} limit ${(page - 1) * size},${size}`
    let total = 0
    try {
        const [result] = await connection.execute(query)
        const [list] = await connection.execute(statement)
        total = result.length
        return {
            page,
            size,
            total,
            list
        }
    } catch (error) {
        console.log(error)
        return false
    }
}
const executeSql = async (sql, columns = []) => {
    try {
        const [result] = await connection.execute(sql, columns)
        return result
    } catch (error) {
        console.log('数据库执行错误', error)
        return false
    }
}
module.exports = {
    pageQuery,
    executeSql
}