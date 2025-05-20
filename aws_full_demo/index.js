const express = require('express')
require('dotenv').config()
const {
  S3Client,
  PutObjectCommand,
  CreateBucketCommand,
  DeleteObjectCommand,
  DeleteBucketCommand,
  paginateListObjectsV2,
  GetObjectCommand,
  ListObjectsV2Command
} = require('@aws-sdk/client-s3')
const multer = require('multer')
const fs = require('fs')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')

const app = express()

const BUCKET_NAME = process.env.S3_BUCKET_NAME
const REGION = process.env.AWS_REGION
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY

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

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY
  }
})

app.post('/upload', upload.single('image'), async (req, res) => {
  // 使用者上傳檔案
  const file = req.file

  if (!file) {
    return res.status(400).send('沒有上傳檔案')
  }

  const fileKey = `${Date.now()}-${file.originalname}` // 使用時間戳記 + 原始檔案名稱
  const fileStream = fs.createReadStream(file.path) // 從本地暫存資料夾讀取檔案

  //   設定上傳到 S3 的參數
  const uploadParams = {
    Bucket: BUCKET_NAME, // 設定上傳到哪個 bucket
    Key: fileKey, // S3 的檔案名稱
    Body: fileStream, // 上傳的內容
    ContentType: file.mimetype // 上傳的檔案類型
  }

  try {
    await s3.send(new PutObjectCommand(uploadParams))
    fs.unlinkSync(file.path) // 刪除暫存檔案

    // 生成預簽名 URL
    const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey
    })

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }) // 一小時 / 3600 秒

    const publicUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileKey}`

    res.json({
      message: '上傳成功',
      imageUrl: signedUrl,
      publicUrl
    })
  } catch (err) {
    console.error('S3 Upload Error:', err)
    res.status(500).send('上傳失敗')
  }
})

app.get("/files", async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: BUCKET_NAME
    })

    const data = await s3.send(command)

    const files = (data.Contents || []).map((item) => ({
      key: item.Key,
      url: `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${item.Key}`
    }))

    res.json(files)
  } catch (err) {
    console.error("List Files Error:", err)
    res.status(500).send("無法列出檔案")
  }
})

app.delete("/files/:key", async (req, res) => {
  const { key } = req.params

  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    })

    await s3.send(command)

    res.json({ message: `檔案已刪除: ${key}` })
  } catch (err) {
    console.error("Delete Error:", err)
    res.status(500).send("刪除失敗")
  }
})

app.listen(3000, () => {
  console.log('已運作在 http://localhost:3000')
})
