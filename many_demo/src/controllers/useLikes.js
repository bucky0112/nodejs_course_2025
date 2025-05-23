const db = require("../configs/db")
const { eq, count } = require("drizzle-orm")
const { likesTable } = require("../models/schema")

const createLike = async (req, res) => {
  const { id } = req.params
  const { userId } = req.body
  const like = await db.insert(likesTable).values({ userId, postId: id })
  res.status(201).json(like)
}

const deleteLike = async (req, res) => {
  const { id } = req.params
  const { userId } = req.body
  const like = await db.delete(likesTable).where(eq(likesTable.userId, userId))
  res.status(200).json(like)
}

const getLikes = async (req, res) => {
  const { id } = req.params
  // const likes = await db.select().from(likesTable).where(eq(likesTable.postId, id))
  // 使用 count 計算總數
  const likes = await db.select({ count: count() }).from(likesTable).where(eq(likesTable.postId, id))
  // SELECT COUNT(*) FROM likes WHERE post_id = id;
  res.status(200).json(likes)
}

module.exports = {
  createLike,
  deleteLike,
  getLikes
}
