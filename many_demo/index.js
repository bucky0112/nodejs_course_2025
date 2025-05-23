const express = require("express")
const app = express()
const usersRouter = require("./src/routes/users")
const postsRouter = require("./src/routes/posts")
const likesRouter = require("./src/routes/likes")

app.use(express.json())
app.use("/users", usersRouter)
app.use("/posts", postsRouter)
app.use("/likes", likesRouter)

app.listen(3000, () => {
  console.log("Server is running on port 3000")
})
