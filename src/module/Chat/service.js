const database = require('../../util/database')

const getChatList = async (page, size) => {
    const sql = `select * from chat`
    return database.pageQuery(page, size, sql)
}
const delChat = async (id) => {
    const sql = `delete from chat where id=?`
    return database.executeSql(sql, [id])
}

module.exports = {
    getChatList,
    delChat
}