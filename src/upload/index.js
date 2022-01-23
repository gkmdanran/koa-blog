const multer = require('@koa/multer');
const limits = {
    fields: 10,//非文件字段的数量
    fileSize: 10 * 1024 * 1024,//文件大小 单位 b
    files: 9//文件数量
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../files/photo')
    },
    filename: function (req, file, cb) {
        let fileArray = file.originalname.split('.')
        let fileExtension = fileArray[fileArray.length - 1]
        cb(null, fileArray[0] + '-' + Date.now() + '.' + fileExtension)
    }
})
const upload = multer({ storage, limits })

module.exports = { upload }