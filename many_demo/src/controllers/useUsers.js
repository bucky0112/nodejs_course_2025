const db = require("../configs/db")
const { eq } = require("drizzle-orm")
const { usersTable } = require("../models/schema")

const getUsers = async (req, res) => {
  const users = await db.select().from(usersTable)
  res.status(200).json(users)
}

const getUserById = async (req, res) => {
  const { id } = req.params
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id))
  res.status(200).json(user)
}

const createUser = async (req, res) => {
  const { username, email, password } = req.body
  const user = await db.insert(usersTable).values({ username, email, password })
  res.status(201).json(user)
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { email, password } = req.body
  const user = await db.update(usersTable).set({ email, password }).where(eq(usersTable.id, id))
  res.status(200).json(user)
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  const user = await db.delete(usersTable).where(eq(usersTable.id, id))
  res.status(200).json(user)
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}