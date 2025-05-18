# MongoDB 介紹

MongoDB 是一個開源的文件導向（document-oriented）資料庫，屬於 NoSQL 資料庫的一種。它使用類似 JSON 的文件結構（稱為 BSON）來儲存資料，非常適合處理半結構化或非結構化的資料。

## MongoDB 的主要特點

1. **文件導向**：資料以 BSON 文件格式儲存，比傳統的表格結構更靈活。
2. **無模式**：集合（collections）不需要預先定義欄位結構，每個文件可以有不同的欄位。
3. **高擴展性**：支援水平擴展（sharding）和複製（replication）。
4. **高性能**：內建索引，支援快速查詢。
5. **原生支援 JavaScript**：可以使用 JavaScript 進行查詢和資料操作。

## 基本概念對比

| SQL 術語     | MongoDB 術語 |
|-------------|-------------|
| 資料庫 (Database) | 資料庫 (Database) |
| 資料表 (Table) | 集合 (Collection) |
| 記錄 (Row) | 文件 (Document) |
| 欄位 (Column) | 欄位 (Field) |
| 主鍵 (Primary Key) | ObjectId (_id) |
| 聯結 (Join) | 嵌入文件或引用 |

## MongoDB 文件結構範例

```javascript
{
   _id: ObjectId("60a1f2e9d5a4c63e84c1c610"),
   name: "王小明",
   age: 25,
   email: "wang@example.com",
   address: {
      city: "台北",
      zip: "10617"
   },
   hobbies: ["閱讀", "旅行", "攝影"]
}
```

## 為什麼選擇 MongoDB？

- **靈活性**：沒有固定的資料結構，非常適合快速原型開發和需求經常變化的專案。
- **易用性**：與 JavaScript 自然整合，對前端開發者友好。