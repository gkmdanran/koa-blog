const database = require('../../util/database')
const getPhotoList = async (page, size) => {
    const sql = `select id,title,left(password,1) as password,tag,tagColor,cover,createAt,(select count(*) from picture where photoid=photo.id) as count from photo order by createAt desc`
    return database.pageQuery(page, size, sql)
}
const getPhoto = async (title) => {
    const sql = `select * from photo where title=?`
    return database.executeSql(sql, [title])
}
const delPhoto = async (id) => {
    const sql = `delete from photo where id=?`
    return database.executeSql(sql, [id])
}
const addPhoto = async (id, title, password, tag, tagColor) => {
    let cover = ''
    const sql = `insert into photo (id,title,password,tag,tagcolor,cover) values(?,?,?,?,?,?)`
    return database.executeSql(sql, [id, title, password, tag, tagColor, cover])
}
const detailPhoto = async (id, page, size) => {
    const sql1 = `select id,url,previewUrl,filename,createAt from picture where photoid='${id}' order by createAt desc`
    const picList = await database.pageQuery(page, size, sql1)
    if (!picList) return false
    const sql2 = `select id,title,tag,password from photo where id=?`
    const result = await database.executeSql(sql2, [id])
    if (!result) return false
    result[0]['pictures'] = picList
    return result[0]
}
const editPhoto = async (id, title, tag, password) => {
    const sql = `update photo set title=?,tag=?,password=? where id=?`
    return database.executeSql(sql, [title, tag, password, id])
}
const uploadPhoto = async (picarr) => {
    let str = ''
    for (let x of picarr) {
        str += `('${x.photoid}','${x.url}','${x.previewUrl}','${x.filename}'),`
    }
    str = str.substr(0, str.length - 1)
    const sql = `insert into picture (photoid,url,previewUrl,filename) values${str};`
    return database.executeSql(sql)
}
const getPicList = (id) => {
    const sql = `select * from picture where photoid=?`
    return database.executeSql(sql, [id])
}
const setCover = async (id, url) => {
    const sql = `update photo set cover=? where id=?`
    return database.executeSql(sql, [url, id])
}
const delPictures = async (ids) => {
    let str = ''
    for (var i = 0; i < ids.length; i++) {
        str += "'" + ids[i] + "'" + ','
    }
    str = str.substr(0, str.length - 1)
    const sql = `delete from picture where id in (${str})`
    return database.executeSql(sql)
}
module.exports = {
    getPhoto,
    getPhotoList,
    delPhoto,
    addPhoto,
    detailPhoto,
    editPhoto,
    uploadPhoto,
    getPicList,
    setCover,
    delPictures
}