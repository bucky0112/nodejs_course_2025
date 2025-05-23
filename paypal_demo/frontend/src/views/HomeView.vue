<script setup>
import { ref, onMounted } from 'vue'
import { loadScript } from '@paypal/paypal-js'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const paypalButtonContainer = ref(null) // 接收來自 paypal 的資料並長出 button
const API_URL = import.meta.env.VITE_API_URL
const PAYPAL_API_URL = `${API_URL}/api/orders`

onMounted(async () => {
  const paypal = await loadScript({
    'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency: 'TWD',
    locale: 'zh_TW',
    components: 'buttons'
  })

  if (paypal?.Buttons) {
    paypal.Buttons({
      fundingSource: paypal.FUNDING.CARD,
      createOrder: async () => {
        const res = await axios.post(PAYPAL_API_URL, {
          cart: [
            {
              id: "A001",
              quantity: 1
            }
          ]
        })
        return res.data.id
      },
      onApprove: async (data) => {
        const captureData = await axios.post(`${PAYPAL_API_URL}/${data.orderID}/capture`)
        console.log('付款成功:', captureData)
        router.push('/about')
      }
    }).render(paypalButtonContainer.value)
  }
})
</script>

<template>
  <main>
    <div ref="paypalButtonContainer"></div>
  </main>
</template>
