const passport = require('passport')
const User = require('../models/schema')

// 第一步：導向 Google 登入頁
const googleAuth = (req, res) => {
  passport.authenticate('google', { scope: ['email', 'profile'] })(req, res)
}

// 第二步：Google 認證完成後回來這邊
const googleAuthCallback = async (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user) => {
    if (err) return next(err)
    if (!user) return res.redirect('/auth/google') // 沒登入成功就導回去
    console.log('user 資料:', user)

    try {
      const userData = await User.findOneAndUpdate(
        { googleId: user.id },
        {
          googleId: user.id,
          displayName: user.displayName,
          email: user.emails[0].value,
          profilePicture: user.photos[0].value,
          lastLogin: new Date()
        },
        {
          upsert: true, // 找不到就建立新的
          new: true // 回傳更新後的資料
        }
      )

      // 登入成功：把 user 資料傳到前端
      const userDataString = encodeURIComponent(JSON.stringify(userData))
      res.redirect(`http://localhost:5173/home?user=${userDataString}`)
    } catch (err) {
      console.error('寫入失敗')
    }
  })(req, res, next)
}

module.exports = {
  googleAuth,
  googleAuthCallback
}
