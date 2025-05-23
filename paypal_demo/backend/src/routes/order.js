const express = require('express')
const router = express.Router()
const { payNewOrder, capturePaypalOrder } = require('../controllers/usePaypal')

router.post('/orders', payNewOrder) // 建立訂單
router.post('/orders/:orderID/capture', capturePaypalOrder) // 接收訂單

module.exports = router
