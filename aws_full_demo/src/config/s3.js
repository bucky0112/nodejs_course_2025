const { S3Client } = require('@aws-sdk/client-s3')
require('dotenv').config()
const multer = require('multer')

const BUCKET_NAME = process.env.S3_BUCKET_NAME
const REGION = process.env.AWS_REGION
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
})

// multer 主要先將檔案儲存在本地端，再上傳到 S3
const upload = multer({
  dest: 'uploads/', // 自己設定的路徑
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: (req, file, cb) => {
    // 限制上傳檔案條件
    if (file.mimetype.startsWith('image/')) {
      // 限制只限圖片類型
      cb(null, true) // (錯誤訊息, 是否能上傳)
    } else {
      cb(new Error('只能上傳圖片'), false)
    }
  }
})

module.exports = { upload, s3 }
