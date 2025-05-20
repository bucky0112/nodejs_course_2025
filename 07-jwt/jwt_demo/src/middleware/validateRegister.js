const { z } = require('zod')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

// zod 定義註冊 schema
const registerSchema = z.object({
  username: z
    .string()
    .min(3, '使用者名稱至少需要3個字元')
    .max(20, '使用者名稱不能超過20個字元'),
  password: z.string().min(8, '密碼至少需要8個字元'),
  email: z.string().email('請輸入正確的email'),
  age: z.number().min(13, '年齡必須大於13歲').optional(),
  phoneNumber: z.string().regex(/^09\d{2}-?\d{3}-?\d{3}$/)
})

// 驗證註冊 middleware
const validateRegister = (req, res, next) => {
  try {
    registerSchema.parse(req.body)
    next()
  } catch (error) {
    // zod 錯誤格式化
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message
    }))

    res.status(400).json({
      error: '驗證錯誤',
      details: formattedErrors
    })
  }
}

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: '沒提供 token' })
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'token 無效' })
    }

    req.user = user
    next()
  })
}

module.exports = {
  validateRegister,
  authenticateToken
}