const dotenv = require("dotenv");
const { defineConfig } = require('drizzle-kit');

dotenv.config();

module.exports = defineConfig({
  out: './drizzle',
  schema: './db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL
  }
});