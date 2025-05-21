const express = require('express')
const router = express.Router()
const {
  deleteFile,
  uploadFile,
  getFiles,
  createUser
} = require('../controllers/useController')
const { upload } = require('../config/s3')

// 上傳檔案
router.post('/upload', upload.single('image'), uploadFile)

// 拿全部檔案
router.get('/files', getFiles)

// 刪除某一個檔案
router.delete('/files/:key', deleteFile)

// 新增 user
router.post('/createuser', createUser)

module.exports = router
