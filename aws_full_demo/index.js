const express = require('express')
const useRouter = require('./src/routes/useRoutes')

const app = express()

app.use(express.json())

app.use('/user', useRouter)

app.listen(3000, () => {
  console.log('已運作在 http://localhost:3000')
})


// /express_project
//   - /src
//   - /routes // API 路徑
//   - /config // 連線設定，例如資料庫
//   - /controllers // 操作邏輯，例如 API 怎麼操作
//   - /models  // 存資料庫的 schema
//   - /middlewares // 存放 middlewares  
//   - index.js // 主要執行的檔案