const TagRouter = require('../module/Tag/router')
const UserRouter = require('../module/User/router')
const ChatRouter = require('../module/Chat/router')
const ArticleRouter = require('../module/Article/router')
const PhotoRouter = require('../module/Photo/router')
const LinkRouter = require('../module/Link/router')
function useRoutes(app) {
    app.use(TagRouter.routes())
    app.use(UserRouter.routes())
    app.use(ChatRouter.routes())
    app.use(ArticleRouter.routes())
    app.use(PhotoRouter.routes())
    app.use(LinkRouter.routes())
}

module.exports=useRoutes