const database = require('../../util/database')
const getUser = async (username) => {
    const sql = `select * from user where username=?`
    return database.executeSql(sql, [username])
}
const changePassword = async (username, password) => {
    const sql = `UPDATE user SET password=? where username=?`
    return database.executeSql(sql, [password, username])
}
module.exports = {
    getUser,
    changePassword
}