const express = require('express')
const authRouter = require('./src/routes/authRoutes')

const app = express()
app.use(express.json())

app.use('/auth', authRouter)

app.listen(3000, () => {
  console.log('Server running on port 3000')
})
