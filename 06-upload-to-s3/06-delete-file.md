# 怎麼從 S3 刪除檔案？

```js
const { DeleteObjectCommand } = require("@aws-sdk/client-s3")

app.delete("/files/:key", async (req, res) => {
  const { key } = req.params

  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key
    })

    await s3.send(command)

    res.json({ message: `檔案已刪除: ${key}` })
  } catch (err) {
    console.error("Delete Error:", err)
    res.status(500).send("刪除失敗")
  }
})
```