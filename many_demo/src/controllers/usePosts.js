const db = require("../configs/db")
const { eq } = require("drizzle-orm")
const { postsTable } = require("../models/schema")

const createPost = async (req, res) => {
  const { userId, imageUrl, caption } = req.body
  const post = await db.insert(postsTable).values({ userId, imageUrl, caption })
  res.status(201).json(post)
}

const getPostById = async (req, res) => {
  const { id } = req.params
  const post = await db.select().from(postsTable).where(eq(postsTable.id, id))
  res.status(200).json(post)
}

const getPostsByUserId = async (req, res) => {
  const { id } = req.params
  console.log(id)
  const posts = await db.select().from(postsTable).where(eq(postsTable.userId, id))
  res.status(200).json(posts)
}

const updatePost = async (req, res) => {
  const { id } = req.params
  const { imageUrl, caption } = req.body
  const post = await db.update(postsTable).set({ imageUrl, caption }).where(eq(postsTable.id, id))
  res.status(200).json(post)
}

const deletePost = async (req, res) => {
  const { id } = req.params
  const post = await db.delete(postsTable).where(eq(postsTable.id, id))
  res.status(200).json(post)
}

module.exports = {
  createPost,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost
}
