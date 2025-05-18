# MongoDB 安裝與設定

在開始使用 MongoDB 之前，我們需要先安裝並設定好 MongoDB 環境。本章節將介紹如何在不同平台上安裝 MongoDB，以及如何進行基本設定。

## 安裝 MongoDB

### 下載安裝包

1. 訪問 MongoDB 官方網站 (https://www.mongodb.com/try/download/community)
2. 選擇你的作業系統和版本
3. 下載並安裝

## 啟動 MongoDB 服務

**Mac (Homebrew 安裝):**
```bash
brew services start mongodb-community
```

**Windows:**
MongoDB 通常作為服務安裝，會自動啟動。你也可以從服務控制台手動啟動。

## 驗證安裝

要驗證 MongoDB 是否正確安裝和運行，可以使用 MongoDB Shell：

```bash
# 連接到 MongoDB
mongosh

如果連接成功，你會看到 MongoDB Shell 界面，表示安裝成功。

## MongoDB Compass - 圖形化管理工具

MongoDB Compass 是一個官方提供的圖形化管理工具：

1. [MongoDB Compass 下載頁面](https://www.mongodb.com/try/download/compass)
2. 選擇你的作業系統並下載
3. 安裝並啟動
4. 連接到你的 MongoDB 伺服器 (預設為 mongodb://localhost:27017)

## MongoDB Atlas - 雲服務

如果你不想在本機安裝 MongoDB，可以使用 MongoDB Atlas，這是 MongoDB 官方提供的雲服務：

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

## 在 Node.js 中連接 MongoDB

在下一章詳細介紹如何在 Node.js 應用中連接和使用 MongoDB，但這裡是一個簡單的連接範例：

```javascript
const { MongoClient } = require('mongodb');

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB_URI)
    await client.connect()
    console.log('MongoDB 連接成功')
  } catch (err) {
    console.error(`Error: ${err.message}`)
  }
}
```
