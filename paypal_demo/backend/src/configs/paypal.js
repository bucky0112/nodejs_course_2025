const { Client, Environment } = require("@paypal/paypal-server-sdk")
require("dotenv").config()

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env

console.log({ PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET })

const paypalClient = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET
  },
  environment: Environment.Sandbox // 測試環境
})

module.exports = paypalClient
