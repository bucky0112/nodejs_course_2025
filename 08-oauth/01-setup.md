## 安裝套件


```bash
npm install express passport passport-google-oauth20 dotenv cookie-parser cors
npm install --save-dev nodemon
```

| 套件                        | 用途                           |
| ------------------------- | ---------------------------- |
| `express`                 | 建立 Web 伺服器                   |
| `passport`                | 核心認證框架                       |
| `passport-google-oauth20` | Google OAuth 的策略             |
| `dotenv`                  | 載入 `.env` 檔的環境變數（拿來放 secret） |
| `cookie-parser` | 如果你未來要用 session、或用 cookie 儲存 token，這就超有用 |
| `cors`          | 前後端分離時，讓前端可以請求 API（開發時基本必裝）              |
