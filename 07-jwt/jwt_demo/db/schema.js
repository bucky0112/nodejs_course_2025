const { pgTable, serial, varchar, integer, timestamp } = require('drizzle-orm/pg-core');

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 20 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { precision: 0 }).defaultNow(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  age: integer('age'),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
});

module.exports = {
  users
};