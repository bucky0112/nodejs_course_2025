const { pgTable, serial, varchar, integer, timestamp, primaryKey } = require("drizzle-orm/pg-core")

const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 20 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { precision: 0 }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 0 }).defaultNow()
})

const followsTable = pgTable(
  "follows",
  {
    followerId: integer("follower_id").references(() => usersTable.id),
    followingId: integer("following_id").references(() => usersTable.id),
    createdAt: timestamp("created_at", { precision: 0 }).defaultNow()
  },
  (table) => ({
    pk: primaryKey(table.followerId, table.followingId)
  })
)

const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  imageUrl: varchar("image_url", { length: 255 }).notNull(), // 圖片連結
  caption: varchar("caption", { length: 255 }), // 圖片描述
  createdAt: timestamp("created_at", { precision: 0 }).defaultNow(),
  updatedAt: timestamp("updated_at", { precision: 0 }).defaultNow()
})

const likesTable = pgTable(
  "likes",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => usersTable.id),
    postId: integer("post_id")
      .notNull()
      .references(() => postsTable.id),
    createdAt: timestamp("created_at", { precision: 0 }).defaultNow()
  },
  (table) => ({
    pk: primaryKey(table.userId, table.postId)
  })
)

const commentsTable = pgTable("comments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  postId: integer("post_id")
    .notNull()
    .references(() => postsTable.id),
  text: varchar("text", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { precision: 0 }).defaultNow()
})

module.exports = {
  usersTable,
  followsTable,
  postsTable,
  likesTable,
  commentsTable
}
