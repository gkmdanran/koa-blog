const database = require('../../util/database')

const getChatList = async (page, size, queryPeople, queryDate) => {
    const sql = `select * from chat where chatName like '%${queryPeople}%' and DATE_FORMAT(createAt,'%Y-%m-%d') like '%${queryDate}%'`
    return database.pageQuery(page, size, sql)
}
const delChat = async (ids) => {
    let str = ''
    for (var i = 0; i < ids.length; i++) {
        str += "'" + ids[i] + "'" + ','
    }
    str = str.substr(0, str.length - 1)
    const sql = `delete from chat where id in (${str})`
    return database.executeSql(sql)
}

module.exports = {
    getChatList,
    delChat
}