const express = require('express')
require('dotenv').config()
const connectDB = require('./config/db')
const userRoutes = require('./routes/user')
const todosRoutes = require('./routes/todos')

connectDB()

const app = express()

app.use(express.json())
app.use('/api', userRoutes)
app.use('/api', todosRoutes)

app.listen(3000, () => {
  console.log('已運作在 http://localhost:3000')
})
