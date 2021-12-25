const database = require('../../util/database')

const getTagList = async (page, size, query) => {
    const sql = `select * from tag where name like '%${query}%'`
    return database.pageQuery(page, size, sql)
}
const delTag = async (id) => {
    const sql = `delete from tag where id=?`
    return database.executeSql(sql, [id])
}

module.exports = {
    getTagList,
    delTag
}