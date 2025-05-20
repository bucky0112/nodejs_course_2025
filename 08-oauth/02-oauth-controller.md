## 設定 Google OAuth 的 Controller

這段處理 Google 登入的主要流程：

```js
const passport = require("passport")

// 第一步：導向 Google 登入頁
const googleAuth = (req, res) => {
  passport.authenticate("google", { scope: ["email", "profile"] })(req, res)
}

// 第二步：Google 認證完成後回來這邊
const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err) return next(err)
    if (!user) return res.redirect("/auth/google") // 沒登入成功就導回去

    // 登入成功：把 user 資料傳到前端
    const userData = encodeURIComponent(JSON.stringify(user))
    res.redirect(`http://localhost:5173/home?user=${userData}`)
  })(req, res, next)
}

module.exports = {
  googleAuth,
  googleAuthCallback
}
```

## 補充說明-A

以下的這一段：

```js
const googleAuth = (req, res) => {
  passport.authenticate("google", { scope: ["email", "profile"] })(req, res)
}
```

等同於下面這樣：

```js
const middleware = passport.authenticate("google", {
  scope: ["email", "profile"]
})
middleware(req, res)
```

等同於是立刻執行那個 middleware 函式，把 req 和 res 傳進去，其實是「立即執行一個回傳 middleware 的函式」

## 補充說明-B

**什麼是 encodeURIComponent？**

簡單來說，encodeURIComponent 是幫你「把字串變成網址安全的格式」。

當你要把一些資料（像是 JSON、中文、特殊符號）加到網址裡（query string），就需要先轉碼，避免錯亂或爆錯。

假設你這樣 redirect:

```js
res.redirect(`http://localhost:5173/home?user=${JSON.stringify(user)}`)
```

網址可能會變成這樣：
```js
http://localhost:5173/home?user={"name":"Tom & Jerry","email":"a@b.com"}
```

使用 包起來處理會變成：

```js
http://localhost:5173/home?user=%7B%22name%22%3A%22Tom%20%26%20Jerry%22%2C%22email%22%3A%22a%40b.com%22%7D
```