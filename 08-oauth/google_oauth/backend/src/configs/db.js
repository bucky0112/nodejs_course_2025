const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI)
    console.log(`已連接成功：${db.connection.host}`)
  } catch (err) {
    console.error(`連線失敗，失敗原因：${err.message}`)
  }
}

module.exports = connectDB