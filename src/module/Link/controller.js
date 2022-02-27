const service = require('./service')
const response = require('../../util/response')
const getLinkList = async (ctx) => {
    const {title='',description='',page,size } = ctx.request.query
    const result = await service.getLinkList(title,description,page,size )
    return response.combineRes(ctx, result)
}
const delLink = async (ctx) => {
    const { id } = ctx.request.body
    const result = await service.delLink(id)
    return response.combineRes(ctx, result, id, '删除成功', 200)
}
const addLink = async (ctx) => {
    const { title,href,description } = ctx.request.body
    const result = await service.addLink(title,description,href)
    return response.combineRes(ctx, result, result, '添加成功', 200)
}
const detailLink = async (ctx) => {
    const { id } = ctx.request.query
    const result = await service.detailLink(id)
    
    return response.combineRes(ctx, result,result[0])
}
const editLink = async (ctx) => {
    const { id,title,description,href } = ctx.request.body
    const result = await service.editLink(id,title,description,href)
    return response.combineRes(ctx, result, id, '编辑成功', 200)
}

module.exports = {
    getLinkList,
    delLink,
    addLink,
    detailLink,
    editLink
}