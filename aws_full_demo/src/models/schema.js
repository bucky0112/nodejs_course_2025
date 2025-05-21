const { pgTable, serial, varchar, timestamp } = require('drizzle-orm/pg-core')

const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  avatar_url: varchar('avatar_url', { length: 255 }),
  avatar_key: varchar('avatar_key', { length: 255 }),
  avatar_last_updated: timestamp('avatar_last_updated').defaultNow()
})

module.exports = {
  usersTable
}
