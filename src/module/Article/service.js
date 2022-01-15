const database = require('../../util/database')
const { v4: uuidv4 } = require('uuid');

const addArticle = async (title, link, tagIds, mdValue, description) => {
    let uuid = uuidv4()
    let str = ''
    for (let x of tagIds) {
        str += `(${x},'${uuid}'),`
    }
    str = str.substr(0, str.length - 1)
    const sql = `insert into article (id,title,description,mdValue,link) values(?,?,?,?,?)`
    await database.executeSql(sql, [uuid, title, description, mdValue, link])
    const sql2 = `insert into tag_article (tagid,articleid) values${str};`
    return database.executeSql(sql2)
}
const topArticle = async (id) => {
    const sql = `update article SET isTop = ABS(isTop - 1) WHERE id = ?`
    return database.executeSql(sql, [id])
}
const hideArticle = async (id) => {
    const sql = `update article SET isHide = ABS(isHide - 1) WHERE id = ?`
    return database.executeSql(sql, [id])
}
const getArticle = async (page, size, title, tag) => {
    const sql = `select createAt,left(description,100) as description,id,isHide,isTop,link,star,title from article where title like '%${title}%'`
    return database.pageQuery(page, size, sql)
}
const delArticle = async (id) => {
    const sql = `delete from article where id =?`
    await database.executeSql(sql, [id])
    const sql2 = `delete from tag_article where articleid =?`
    return database.executeSql(sql2, [id])
}
const detailArticle = async (id) => {
    const sql = `select link,title,description,mdValue from article where id=?`
    const res1 = await database.executeSql(sql, [id])
    const articleDetail = res1[0]
    const sql2 = `select tagid from tag_article where articleid=?`
    const res2 = await database.executeSql(sql2, [id])
    let str = ''
    for (let tag of res2) {
        str = str + "'" + tag.tagid + "'" + ','
    }
    str = str.substr(0, str.length - 1)
    const sql3 = `select id,name,type from tag where id in(${str})`
    const res3 = await database.executeSql(sql3)
    articleDetail['tagList'] = res3
    return articleDetail
}
const editArticle = async (id, title, link, tagIds, mdValue, description) => {
    let str2 = ''
    for (let x of tagIds) {
        str2 += `(${x},'${id}'),`
    }
    str2 = str2.substr(0, str2.length - 1)
    const sql1 = `delete from tag_article where articleid =?`
    if (!await database.executeSql(sql1, [id])) return false

    const sql2 = `insert into tag_article (tagid,articleid) values${str2};`
    if (!await database.executeSql(sql2)) return false

    const sql3 = `update article set title=?,link=?,mdValue=?,description=? where id=?`
    return database.executeSql(sql3, [title, description, mdValue, link, id])

}
module.exports = {
    addArticle,
    topArticle,
    hideArticle,
    getArticle,
    delArticle,
    detailArticle,
    editArticle
}