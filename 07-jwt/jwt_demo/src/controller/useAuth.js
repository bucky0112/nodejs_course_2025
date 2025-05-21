const bcrypt = require('bcrypt') // 加密密碼
const db = require("../config/db")
const { usersTable } = require("../models/schema")
const { eq } = require('drizzle-orm')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SECRET_KEY = process.env.SECRET_KEY

const useRegister = async (req, res) => {
  try {
    const { username, password, email, age, phoneNumber } = req.body
    const hashedPassword = await bcrypt.hash(password, 10) // 對密碼進行加密處理

    await db.insert(usersTable).values({
      username,
      password: hashedPassword,
      email,
      age,
      phoneNumber
    })

    res.status(201).json({ message: '註冊成功' })
  } catch (err) {
    console.log("error")
    if (err.code === 'P2002') {
      return res.status(409).json({ message: '使用者已存在' })
    }

    res.status(500).json({ message: '伺服器錯誤' })
  }
}

const useLogin = async (req, res) => {
  try {
    const { username, password } = req.body

    const foundUsers = await db.select().from(usersTable).where(eq(usersTable.username, username))
    const user = foundUsers[0]

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: '帳號或密碼錯誤' })
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username
      },
      SECRET_KEY,
      {
        expiresIn: '5m' // 5m, 1d
      }
    )

    res.json({ token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: '伺服器錯誤' })
  }
}

const useGetProfile = (req, res) => {
  res.json({ user: req.user })
}

module.exports = {
  useRegister,
  useLogin,
  useGetProfile
}