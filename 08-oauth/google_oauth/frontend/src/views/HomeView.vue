<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const user = ref(null);

onMounted(async () => {
  // 檢查 URL 參數中是不是有包含使用者資料（來自 Google OAuth redirect）
  if (route.query.user) {
    try {
      user.value = JSON.parse(decodeURIComponent(route.query.user));

      console.log(user.value)
      // 清除 URL
      router.replace({ path: '/home', query: {} });
    } catch (error) {
      console.error('解析使用者資料失敗:', error);
      router.push('/login');
    }
  } else {
    // 如果 URL 中沒有使用者資料，嘗試從後端取得
    try {
      const response = await fetch('http://localhost:3000/auth/user', {
        credentials: 'include' // 包含憑證
      });
      if (response.ok) {
        user.value = await response.json();
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('拿不到使用者資料:', error);
      router.push('/login');
    }
  }
});
</script>

<template>
  <div class="home-container">
    <div class="home-content">
      <h1>Welcome to Your Dashboard</h1>
      <div v-if="user" class="user-info">
        <img :src="user.profilePicture" alt="Profile" class="profile-picture" />
        <h2>{{ user.displayName }}</h2>
        <p>{{ user.email }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.home-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.user-info {
  margin: 2rem 0;
}

.profile-picture {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
}

h1 {
  color: #333;
  margin-bottom: 2rem;
}

h2 {
  color: #444;
  margin-bottom: 0.5rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.logout-btn {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c82333;
}
</style>
