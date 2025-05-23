const express = require('express')
const app = express()
const route = require("./src/routes/order")
const bodyParser = require('body-parser')
const cors = require("cors")

app.use(cors())
app.use(bodyParser.json())
// app.use(express.json())
app.use('/api', route)

app.listen(3000, () => {
  console.log('已運作在 http://localhost:3000')
})
