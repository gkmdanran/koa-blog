const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const staticFiles = require('koa-static')

const TagRouter = require('../module/Tag/router')
const UserRouter = require('../module/User/router')
const ChatRouter=require('../module/Chat/router')


const app = new Koa()
app.use(cors());
app.use(bodyParser())
app.use(staticFiles(path.resolve(__dirname, '../../uploads')))

app.use(TagRouter.routes())
app.use(UserRouter.routes())
app.use(ChatRouter.routes())

module.exports = app
