# 在 Vue 中整合 PayPal 金流

## 1. 安裝 PayPal SDK
```bash
npm install @paypal/paypal-js
```

## 2. 載入並渲染 PayPal 按鈕

`App.vue`
```vue
<template>
  <div ref="paypalRef"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadScript } from '@paypal/paypal-js'

const paypalRef = ref(null)

onMounted(async () => {
  const paypal = await loadScript({
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: 'TWD',
    locale: 'zh_TW',
    components: 'buttons'
  })

  if (paypal?.Buttons) {
    paypal.Buttons({
      createOrder: async () => {
        const res = await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ cart: [] }) });
        const data = await res.json()
        return data.id
      },
      onApprove: async (data) => {
        const res = await fetch(`/api/orders/${data.orderID}/capture`, { method: 'POST' })
        const data2 = await res.json()
        console.log('付款成功:', data2)
      }
    }).render(paypalRef.value)
  }
})
</script>
```

## 3. 前端環境變數
在 `.env` 檔設定：
```
VITE_PAYPAL_CLIENT_ID=你的clientID
```
