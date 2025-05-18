# Node.js 中的密鑰管理

在 Node.js 應用程式中，密鑰（Secret Key）的管理是安全性的重要組成部分。本文將介紹如何產生和管理密鑰，特別是在 JWT 應用中的使用。

## 生成密鑰的方法

### 1. 使用 crypto 模組

Node.js 內建的 `crypto` 模組提供了產生安全隨機字串的方法：

```javascript
const crypto = require('crypto');

// 產生 64 位元組的隨機字串
const secretKey = crypto.randomBytes(64).toString('hex');
console.log(secretKey);
```

### 2. 使用環境變數

在實際應用中，密鑰應該存儲在環境變數中，而不是直接寫在程式碼中：

```javascript
// .env 文件
SECRET_KEY=your_generated_secret_key

// 在程式碼中使用
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;
```

## 密鑰管理最佳實踐

1. **不要寫死**
   - 不要在程式碼中直接寫入密鑰
   - 使用環境變數或配置檔案

2. **定期更換**
   - 定期更換密鑰
   - 實施密鑰輪換機制

3. **不同環境使用不同密鑰**
   - 開發環境
   - 測試環境
   - 生產環境

4. **密鑰長度**
   - 建議至少 32 位元組（256 位）

## 在 JWT 中使用密鑰

```javascript
const jwt = require('jsonwebtoken');

// 使用密鑰簽署 JWT
const token = jwt.sign(
  { userId: '123' },
  process.env.SECRET_KEY,
  { expiresIn: '1h' }
);

// 驗證 JWT
jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
  if (err) {
    // 處理錯誤
  }
  // 使用解碼後的資料
});
```