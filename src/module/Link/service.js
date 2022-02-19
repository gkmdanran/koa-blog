const database = require('../../util/database')
const getLinkList = async (title, description, page, size) => {
    const sql = `select * from link where title like '%${title}%' and description like '%${description}%' order by createAt desc`
    return database.pageQuery(page, size, sql)
}
const delLink = async (id) => {
    const sql = `delete from link where id=?`
    return database.executeSql(sql, [id])
}
const addLink = async (title, description, href) => {
    const sql = `insert into link (title,description,href) values(?,?,?)`
    return database.executeSql(sql, [title, description, href])
}
const detailLink = async (id) => {
    const sql = `select * from link where id=?`
    return database.executeSql(sql, [id])
}
const editLink = async (id, title, description, href) => {
    const sql = `update link set title=?,description=?,href=? where id=?`
    return database.executeSql(sql, [title, description, href, id])
}

module.exports = {
    getLinkList,
    delLink,
    addLink,
    detailLink,
    editLink
}