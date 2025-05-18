如果想限制上傳檔案的類型，例如只限圖片的話，可以使用 Multer 來處理。

## 原本沒限制的使用

```js
const upload = multer({ dest: "uploads/" })
```

## 加上檔案類型限制

```js
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    // 只允許上傳圖片檔案
    if (file.mimetype.startsWith("image/")) {
      cb(null, true)
    } else {
      cb(new Error("只允許上傳圖片檔案"), false)
    }
  }
})
```

甚至可以加上圖片類型的限制：

- "image/png" 或 "image/jpeg" 等等...
