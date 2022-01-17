const database = require('../../util/database')
const getPhotoList = async (page, size) => {
    const sql = `select id,title,left(password,1) as password,count,tag,tagColor,cover,createAt from photo `
    return database.pageQuery(page, size, sql)
}
const getPhoto = async (title) => {
    const sql = `select * from photo where title=?`
    return database.executeSql(aql, [title])
}
const delPhoto = async (id) => {
    const sql = `delete from photo where id=?`
    return database.executeSql(sql, [id])
}
const addPhoto = async (id, title, password, tag, tagColor) => {
    let cover = ''
    const sql = `insert into tag (id,title,password,tag,tagcolor,cover) values(?,?,?,?,?,?)`
    return database.executeSql(sql, [id, title, password, tag, tagColor, cover])
}
module.exports = {
    getPhoto,
    getPhotoList,
    delPhoto,
    addPhoto
}