# Mongoose ODM

Mongoose 是一個 MongoDB 物件文件映射器 (ODM)，它提供了一個優雅的方式來操作 MongoDB 資料庫。通過 Mongoose，我們可以定義資料結構，實施型別限制，以及使用內建的驗證、查詢和 middleware 等功能。

## 為什麼使用 Mongoose？

相比直接使用 MongoDB 原生驅動，Mongoose 提供以下優勢：

1. **結構定義**：透過 Schema 定義資料結構，確保資料一致性。
2. **資料驗證**：內建豐富的驗證功能。
3. **middleware 支援**：可以在資料操作前後執行自定義邏輯。
4. **簡化查詢**：提供簡潔的 API 和鏈式查詢。
5. **類型轉換**：自動將資料轉換為適當的類型。

## 安裝 Mongoose

```bash
npm install mongoose
```

## 建立連接

```javascript
// configs/db.js
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () => {
  try {
    // 使用你的 MongoDB Atlas 連接字串
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
  }
}

module.exports = connectDB
```

## 定義 Schema 和模型

Mongoose 的核心概念是 Schema 和 Model：

```javascript
// models/User.js
// 定義使用者 Schema
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '請輸入使用者名稱'],
    trim: true,
    unique: true,
    minlength: [3, '使用者名稱至少需要3個字'],
    maxlength: [10, '使用者名稱最多只能10個字']
  },
  email: {
    type: String,
    required: [true, '請輸入email'],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '請輸入正確的email格式'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false // 查詢時預設不回傳此欄位
  },
  age: {
    type: Number,
    min: [0, '年齡不能為負數'],
    max: [120, '年齡不能超過 120']
  },
  
  // 嵌套物件
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: { type: String, default: '台灣' }
  },
  
  // 陣列
  hobbies: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// 建立 model
const User = mongoose.model('User', userSchema);

// 匯出 model
module.exports = User;
```

## 使用 Mongoose 模型進行 CRUD 操作

### 建立 CRUD API

```javascript
// routes/user.js
const express = require('express')
const router = express.Router()
const User = require('../models/User');

router.post('/users', async (req, res) => {
  try {
    const result = await User.create(req.body)
    res.status(201).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    })
  }
})

router.get('/users', async (req, res) => {
  try {
    const result = await User.find()
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    })
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const result = await User.findById(req.params.id)
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false, 
      data: err.message
    })
  }
})

router.put('/users/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    })
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      success: true,
      message: '刪除成功'
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    })
  }
})

module.exports = router
```

## Mongoose 最佳實踐

1. **使用環境變數管理連接**
   ```javascript
   // .env 文件
   MONGODB_URI=mongodb://localhost:27017/myapp
   
   // app.js
   require('dotenv').config();
   mongoose.connect(process.env.MONGODB_URI);
   ```

2. **結構化模型定義**
   - 將每個模型放在單獨的文件中
   - 使用明確的 Schema 定義
   - 使用合適的資料類型和驗證

3. **錯誤處理**
   - 始終使用 try/catch 處理 Promise
   - 針對不同類型的錯誤有特定的處理邏輯
