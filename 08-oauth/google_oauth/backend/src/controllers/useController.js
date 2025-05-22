const passport = require("passport")
const User = require("../models/schema")

// 第一步：導向 Google 登入頁
const googleAuth = (req, res) => {
  passport.authenticate("google", { scope: ["email", "profile"] })(req, res)
}

// 第二步：Google 認證完成後回來這邊
const googleAuthCallback = async (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err) return next(err)
    if (!user) return res.redirect("/auth/google") // 沒登入成功就導回去

    console.log("user", user)

    // // 登入成功：把 user 資料傳到前端
    // const userData = encodeURIComponent(JSON.stringify(user))
    // res.redirect(`http://localhost:5173/home?user=${userData}`)

    try {
      const userData = await User.findOneAndUpdate(
        { googleId: user.id },
        {
          googleId: user.id,
          displayName: user.displayName,
          firstName: user.name.givenName,
          lastName: user.name.familyName,
          email: user.emails[0].value,
          emailVerified: user.emails[0].verified,
          profilePicture: user.photos[0].value,
          lastLogin: new Date()
        },
        { 
          upsert: true,  // 如果找不到就建立新用戶
          new: true      // 回傳更新後的資料
        }
      )

      // 登入成功：把 user 資料傳到前端
      const userDataString = encodeURIComponent(JSON.stringify(userData))
      res.redirect(`http://localhost:5173/home?user=${userDataString}`)
    } catch (error) {
      console.error("Error saving user data:", error)
      return next(error)
    }
  })(req, res, next)
}

module.exports = {
  googleAuth,
  googleAuthCallback
}