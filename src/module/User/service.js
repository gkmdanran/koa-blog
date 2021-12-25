const database = require('../../util/database')
const getUser = async (username) => {
    const sql = `select * from user where username=?`
    return database.executeSql(sql, [username])
}
module.exports = {
    getUser,
}