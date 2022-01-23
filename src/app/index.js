const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const useRoutes = require('./useRoutes')

const app = new Koa()
app.use(cors());
app.use(bodyParser())
useRoutes(app)

module.exports = app
