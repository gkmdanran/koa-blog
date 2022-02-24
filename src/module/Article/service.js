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
    if (!await database.executeSql(sql, [uuid, title, description, mdValue, link])) return false
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
    const sql = `
            select 
                article.createAt,
                left(article.description,100) as description,
                article.id,
                article.isHide,
                article.isTop,
                article.link,
                article.star,
                article.title 
            from article 
            left join 
                tag_article 
            on 
                article.id=tag_article.articleid 
            where 
                article.title like '%${title}%' 
            ${tag == '' ? '' : `and tag_article.tagid = ${tag}`}
            group by article.id
            order by 
                article.createAt desc
        `
    let res = await database.pageQuery(page, size, sql)
    if (!res) return false
    let articleList = res.list
    for (let i = 0; i < articleList.length; i++) {
        const sql2 = `select tag.name,tag.type from tag_article left join tag on tag.id=tag_article.tagid where tag_article.articleid like '%${articleList[i].id}%'`
        const tagList = await database.executeSql(sql2)
        if (!tagList) return false
        articleList[i]['tag'] = tagList
    }
    return {
        list: articleList,
        total: res.total,
        page: res.page,
        size: res.size
    }
}
const delArticle = async (id) => {
    const sql1 = `delete from article where id =?`
    if (!await database.executeSql(sql1, [id])) return false
    const sql2 = `delete from tag_article where articleid =?`
    return database.executeSql(sql2, [id])
}
const detailArticle = async (id, type) => {
    let sql1 = ''
    if (type == 'blog') {
        sql1 = `select id,link,title,description,mdValue,createAt,star from article where id=? and isHide=0`
    } else {
        sql1 = `select id,link,title,description,mdValue,createAt,star from article where id=?`
    }
    const res1 = await database.executeSql(sql1, [id])
    if (!res1) return false

    const articleDetail = res1[0]
    if (!articleDetail) return null

    const sql2 = `select tagid from tag_article where articleid=?`
    const res2 = await database.executeSql(sql2, [id])
    if (!res2) return false

    let str = ''
    for (let tag of res2) {
        str = str + "'" + tag.tagid + "'" + ','
    }
    str = str.substr(0, str.length - 1)
    const sql3 = `select id,name,type from tag where id in(${str})`
    const res3 = await database.executeSql(sql3)
    if (!res3) return false
    articleDetail['tagList'] = res3
    return articleDetail
}
const editArticle = async (id, title, link, tagIds, mdValue, description) => {
    let str = ''
    for (let x of tagIds) {
        str += `(${x},'${id}'),`
    }
    str = str.substr(0, str.length - 1)
    const sql1 = `delete from tag_article where articleid =?`
    if (!await database.executeSql(sql1, [id])) return false

    const sql2 = `insert into tag_article (tagid,articleid) values${str};`
    if (!await database.executeSql(sql2)) return false

    const sql3 = `update article set title=?,link=?,mdValue=?,description=? where id=?`
    return database.executeSql(sql3, [title, link, mdValue, description, id])

}
const uploadArticle = async (url, type, filename) => {
    const sql = `insert into filelist (url,type,filename) values(?,?,?)`
    return database.executeSql(sql, [url, type, filename])
}
const addStar = async (id) => {
    const sql = `update article set star=star+1 where id =?`
    return database.executeSql(sql, [id])
}
const getMenuArticleList = async () => {
    const sql = `select id,title from article where isHide=0 order by createAt desc`
    return database.executeSql(sql)
}
const searchArticle = async (query) => {
    const sql = `select id,title from article where (title like '%${query}%' or description like '%${query}%') and isHide=0`
    return database.executeSql(sql)
}
const getArticleListBytag = async (id, page, size) => {
    const sql = `
            select 
                article.createAt,
                left(article.description,200) as description,
                article.id,
                article.isHide,
                article.link,
                article.star,
                article.title 
            from article 
            left join 
                tag_article 
            on 
                article.id=tag_article.articleid 
            where 
                article.isHide=0
            and 
                tag_article.tagid=${id}
            order by 
                article.createAt desc
        `
    let res = await database.pageQuery(page, size, sql)
    console.log(res)
    if (!res) return false
    let articleList = res.list
    for (let i = 0; i < articleList.length; i++) {
        const sql2 = `select tag.name,tag.type from tag_article left join tag on tag.id=tag_article.tagid where tag_article.articleid like '%${articleList[i].id}%'`
        const tagList = await database.executeSql(sql2)
        if (!tagList) return false
        articleList[i]['tag'] = tagList
    }
    const sql3 = `select * from tag where id=?`
    const tag = await database.executeSql(sql3,[id])
    if (!tag) return false
    return {
        tag: tag[0],
        list: articleList,
        total: res.total,
        page: res.page,
        size: res.size
    }
}
const getHomeArtilceList = async (page, size) => {
    const sql = `
            select 
                article.createAt,
                left(article.description,200) as description,
                article.id,
                article.isHide,
                article.isTop,
                article.link,
                article.star,
                article.title 
            from article 
            left join 
                tag_article 
            on 
                article.id=tag_article.articleid 
            where 
                isHide=0
            group by article.id
            order by 
                article.createAt desc,
                article.isTop desc
        `
    let res = await database.pageQuery(page, size, sql)
    if (!res) return false
    let articleList = res.list
    for (let i = 0; i < articleList.length; i++) {
        const sql2 = `select tag.name,tag.type from tag_article left join tag on tag.id=tag_article.tagid where tag_article.articleid like '%${articleList[i].id}%'`
        const tagList = await database.executeSql(sql2)
        if (!tagList) return false
        articleList[i]['tag'] = tagList
    }
    return {
        list: articleList,
        total: res.total,
        page: res.page,
        size: res.size
    }
}
module.exports = {
    addStar,
    addArticle,
    topArticle,
    hideArticle,
    getArticle,
    delArticle,
    detailArticle,
    editArticle,
    uploadArticle,
    getMenuArticleList,
    searchArticle,
    getArticleListBytag,
    getHomeArtilceList
}