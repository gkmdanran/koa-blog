const database = require('../../util/database')

const getTagList = async (page, size, query) => {
    const sql = `select tag.id,tag.name,tag.type,COUNT(tag_article.tagid) as count from tag left join tag_article on tag.id = tag_article.tagid where tag.name like '%${query}%' group by tag.id order by tag.id desc`
    return database.pageQuery(page, size, sql)
}
const delTag = async (id) => {
    const sql = `delete from tag where id=?`
    return database.executeSql(sql, [id])
}
const addTag = async (type, name) => {
    const sql = `insert into tag (type,name) values(?,?)`
    return database.executeSql(sql, [type, name])
}
const verifyDel = async (id) => {
    const sql = 'select * from tag_article where tagid=?'
    return database.executeSql(sql, [id])
}

module.exports = {
    getTagList,
    delTag,
    addTag,
    verifyDel
}