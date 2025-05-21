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