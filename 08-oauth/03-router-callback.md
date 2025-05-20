## 設定 Express 路由

```js
const express = require('express')
const router = express.Router()
const { googleAuth, googleAuthCallback } = require('../controllers/useController')

// /auth/google => 導向 Google 登入頁
router.get('/google', googleAuth)

// /auth/google/callback => Google 登入後導回來
router.get('/google/callback', googleAuthCallback)

module.exports = router
```