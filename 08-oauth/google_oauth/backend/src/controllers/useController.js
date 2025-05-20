const passport = require("passport")

const googleAuth = (req, res) => {
  passport.authenticate("google", { scope: ["email", "profile"] })(req, res)
}

const googleAuthCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user) => {
    if (err) return next(err)
    if (!user) return res.redirect("/auth/google") // or some error page

    // Redirect to frontend with user data
    const userData = encodeURIComponent(JSON.stringify(user))
    res.redirect(`http://localhost:5173/home?user=${userData}`)
  })(req, res, next)
}

module.exports = {
  googleAuth,
  googleAuthCallback
}
