const multer = require('koa-multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../../files')
    },
    filename: function (req, file, cb) {
        let fileArray = file.originalname.split('.')
        let fileExtension = fileArray[fileArray.length - 1]
        cb(null, fileArray[0] + '-' + Date.now() + '.' + fileExtension)
    }
})
const upload = multer({ storage: storage })

module.exports = { upload }