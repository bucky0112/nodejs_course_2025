# 如何從 S3 拿到全部的檔案列表？

```js
const { ListObjectsV2Command } = require("@aws-sdk/client-s3")

app.get("/files", async (req, res) => {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME
    })

    const data = await s3.send(command)

    const files = (data.Contents || []).map((item) => ({
      key: item.Key,
      url: `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${item.Key}`
    }))

    res.json(files)
  } catch (err) {
    console.error("List Files Error:", err)
    res.status(500).send("無法列出檔案")
  }
})
```