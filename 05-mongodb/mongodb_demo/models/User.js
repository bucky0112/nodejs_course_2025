const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, '請輸入使用者名稱'],
    trim: true,
    unique: true,
    minlength: [3, '使用者名稱至少需要3個字'],
    maxlength: [10, '使用者名稱最多只能10個字']
  },
  email: {
    type: String,
    required: [true, '請輸入email'],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      '請輸入正確的email格式'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false // 查詢時預設不回傳此欄位
  },
  age: {
    type: Number,
    min: [0, '年齡不能為負數'],
    max: [120, '年齡不能超過 120']
  },
  
  // 嵌套物件
  address: {
    street: String,
    city: String,
    zipCode: String,
    country: { type: String, default: '台灣' }
  },
  
  // 陣列
  hobbies: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

// 建立 model
const User = mongoose.model('User', userSchema);

// 匯出 model
module.exports = User;