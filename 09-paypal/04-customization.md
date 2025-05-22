# PayPal 金流按鈕自訂教學

## ✅ 僅顯示信用卡付款按鈕
```js
paypal.Buttons({
  fundingSource: paypal.FUNDING.CARD,
  createOrder: ...,
  onApprove: ...
}).render('#card-button')
```

## 🌍 設定語言與幣別
```js
loadScript({
  'client-id': '你的ID',
  currency: 'TWD',
  locale: 'zh_TW',
  components: 'buttons'
})
```

## 🧠 檢查付款方式可用性
```js
import { getFundingEligibility } from '@paypal/paypal-js'

const eligibility = await getFundingEligibility()

console.log(eligibility.card.eligible) // true / false
```
