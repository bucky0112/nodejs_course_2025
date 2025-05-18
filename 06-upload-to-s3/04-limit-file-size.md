Multer 還可以針對檔案大小做限制：

```js
const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB in bytes
  },
  fileFilter: (req, file, cb) => {
    // 只允許上傳圖片檔案
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(null, false)
    }
  }
})
```