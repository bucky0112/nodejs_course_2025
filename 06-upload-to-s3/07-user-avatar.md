# 怎麼設計 schema 跟 S3 搭配？

```js
// User Schema
const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  avatar: {
    url: { type: String },  // S3 的完整 URL
    key: { type: String },  // S3 的檔案 key
    lastUpdated: { type: Date, default: Date.now }
  }
  // ... 其他欄位
});
```

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  avatar_url VARCHAR(255),
  avatar_key VARCHAR(255),
  avatar_last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  -- ... 其他欄位
);
```