const Router=require('koa-router')
const UploadRouter=new Router({prefix:'/upload'})
const multer=require('koa-multer')
const middle=require('../middleware/LoginMiddle')
const path=require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(__dirname,'../../uploads/article'))
    },
    filename: function (req, file, cb) {
      var singfileArray = file.originalname.split('.');
      var fileExtension = singfileArray[singfileArray.length - 1];
      cb(null, singfileArray[0] + '-' + Date.now() + "." + fileExtension);
     
    }
  })
  
var upload = multer({
    storage: storage
})
UploadRouter.post("/articleupload",middle.verifyAuth,upload.single('image'),async(ctx,next)=>{
   
    const file=ctx.req.file
    file.url=`http://localhost:8888/article/${file.filename}`
    ctx.body=ctx.req.file
})
module.exports=UploadRouter
