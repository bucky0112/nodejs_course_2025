# 使用 Express 建立 PayPal 金流 API

## 1. 安裝必要套件
```bash
npm install express body-parser @paypal/paypal-server-sdk dotenv cors
```

## 2. 建立 Express Server
`index.js`
```js
import express from "express";
import "dotenv/config";
import { Client, Environment, OrdersController, CheckoutPaymentIntent } from "@paypal/paypal-server-sdk";
import bodyParser from "body-parser";
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET,
  },
  environment: Environment.Sandbox,
});

const ordersController = new OrdersController(client);

app.post("/api/orders", async (req, res) => {
  const request = {
    body: {
      intent: CheckoutPaymentIntent.Capture,
      purchaseUnits: [{
        amount: {
          currencyCode: "TWD",
          value: "100.00",
        },
      }],
    },
    prefer: "return=minimal",
  };
  const { body } = await ordersController.createOrder(request);
  res.json(JSON.parse(body));
});

app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  const { body } = await ordersController.captureOrder({ id: orderID, prefer: "return=minimal" });
  res.json(JSON.parse(body));
});

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
```

## 3. 測試 API 可使用 Postman 或前端呼叫
