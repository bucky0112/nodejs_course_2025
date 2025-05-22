const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectDB = async () => {
  try {
    // 使用你的 MongoDB Atlas 連接字串
    const conn = await mongoose.connect(process.env.MONGODB_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(`Error: ${err.message}`)
  }
}

module.exports = connectDB