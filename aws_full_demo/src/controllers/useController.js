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
const { upload, s3 } = require('../config/s3')
const fs = require('fs')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const db = require('../config/db')
const { usersTable } = require('../models/schema')
const { eq } = require('drizzle-orm')

const BUCKET_NAME = process.env.S3_BUCKET_NAME
const REGION = process.env.AWS_REGION

// 對應拿全部檔案的 API
const getFiles = async (req, res) => {
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
    console.error('List Files Error:', err)
    res.status(500).send('無法列出檔案')
  }
}

// 使用者上傳檔案
const uploadFile = async (req, res) => {
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
    /* const command = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey
    })

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }) // 一小時 / 3600 秒 */

    const publicUrl = `https://${BUCKET_NAME}.s3.${REGION}.amazonaws.com/${fileKey}`

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, req.body.username))

    if (!user) {
      return res.status(404).json({ message: '找不到使用者' })
    }

    const updatedUser = await db
      .update(usersTable)
      .set({
        avatar_url: publicUrl,
        avatar_key: fileKey,
        avatar_last_updated: new Date()
      })
      .where(eq(usersTable.username, req.body.username))
      .returning()

    res.json({
      message: '上傳成功',
      // imageUrl: signedUrl,
      // publicUrl
      user: updatedUser
    })
  } catch (err) {
    console.error('S3 Upload Error:', err)
    res.status(500).send('上傳失敗')
  }
}

// 刪除檔案
const deleteFile = async (req, res) => {
  const { key } = req.params

  try {
    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key
    })

    await s3.send(command)

    res.json({ message: `檔案已刪除: ${key}` })
  } catch (err) {
    console.error('Delete Error:', err)
    res.status(500).send('刪除失敗')
  }
}

// 新增用戶
const createUser = async (req, res) => {
  console.log(req.body)
  try {
    await db.insert(usersTable).values({
      username: req.body.username,
      email: req.body.email
    })

    res.status(201).json({ message: '新增成功' })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

module.exports = {
  deleteFile,
  uploadFile,
  getFiles,
  createUser
}
