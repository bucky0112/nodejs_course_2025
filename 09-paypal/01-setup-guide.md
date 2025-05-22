# PayPal 金流環境建立教學

## 1. 註冊開發者帳號
前往 [PayPal Developer](https://developer.paypal.com/) 註冊帳號。

## 2. 建立 Sandbox App
- 登入後點選 **"Apps & Credentials"**
- 在 Sandbox 區域點 **"Create App"**
- 選擇 App 類型（一般選擇 Merchant）
- 命名並建立

## 3. 取得憑證
App 建立後會看到：
- **Client ID**
- **Secret**

## 4. 建立 `.env` 檔案（後端用）
```env
PAYPAL_CLIENT_ID=你的ClientID
PAYPAL_CLIENT_SECRET=你的Secret
```

## 5. 注意事項
- 不要把 `.env` 上傳到 GitHub
- 測試階段使用 Sandbox 模式
