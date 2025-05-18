# 什麼是 bcrypt？

bcrypt 是一個專門用於密碼雜湊的函式庫，它使用 Blowfish 加密演算法，並加入了 salt（鹽值）來增加密碼的安全性。在 Node.js 中，我們通常使用 `bcrypt` 套件來實現密碼的雜湊和驗證。

## bcrypt 的主要特點

1. **自動加鹽（Automatic Salting）**
   - 每次雜湊都會自動生成隨機的鹽值
   - 相同的密碼每次雜湊的結果都不同

2. **可調整的工作因子（Work Factor）**
   - 可以調整雜湊的複雜度
   - 隨著硬體性能提升，可以增加工作因子
   - 越高的工作因子 = 雜湊越慢 = 破解更困難
   - 太高會拖慢系統效能，太低則容易被暴力破解

3. **單向雜湊（One-way Hashing）**
   - 無法從雜湊值反推出原始密碼
   - 只能通過比對來驗證密碼

## 在 Node.js 中使用 bcrypt

### 安裝

```bash
npm install bcrypt
```

### 密碼雜湊

```javascript
const bcrypt = require('bcrypt');

// 雜湊密碼
async function hashPassword(password) {
  const saltRounds = 10; // 工作因子，代表著 bcrypt 需要 2¹⁰ 次加密循環（也就是 1024 次）
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
```

### 密碼驗證

```javascript
const bcrypt = require('bcrypt');

// 驗證密碼
async function verifyPassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
```

## 實際應用範例

```javascript
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// 註冊路由
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 雜湊密碼
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // 儲存用戶資料（包含雜湊後的密碼）
    await saveUser(username, hashedPassword);
    
    res.status(201).json({ message: '註冊成功' });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

// 登入路由
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // 從資料庫獲取用戶
    const user = await getUser(username);
    
    // 驗證密碼
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: '密碼錯誤' });
    }
    
    res.json({ message: '登入成功' });
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
});
```

## 安全建議

1. **工作因子選擇**
   - 開發環境可以使用較低的工作因子（如 10）
   - 生產環境建議使用較高的工作因子（如 12 或更高）

2. **錯誤處理**
   - 妥善處理雜湊過程中的錯誤
   - 不要暴露詳細的錯誤資訊

3. **密碼策略**
   - 實施強密碼策略
   - 定期要求用戶更改密碼

4. **資料庫安全**
   - 確保資料庫中的密碼欄位足夠長
   - 使用適當的資料庫加密
