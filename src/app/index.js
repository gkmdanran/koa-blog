const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const useRoutes = require('./useRoutes')
const staticFiles = require('koa-static')
const path = require('path')
const app = new Koa()
app.use(cors());
app.use(bodyParser())
app.use(staticFiles(path.resolve(__dirname, '../../files')))
useRoutes(app)

module.exports = app
