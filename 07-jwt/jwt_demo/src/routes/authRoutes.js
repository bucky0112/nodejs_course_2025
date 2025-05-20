const express = require('express')
const router = express.Router()
const { useRegister, useLogin, useGetProfile } = require('../controller/useAuth')
const { validateRegister, authenticateToken } = require('../middleware/validateRegister')

// 註冊
router.post('/register', validateRegister, useRegister)

// 登入
router.post('/login', useLogin)

// 取得個人資料
router.get('/profile', authenticateToken, useGetProfile)

module.exports = router
