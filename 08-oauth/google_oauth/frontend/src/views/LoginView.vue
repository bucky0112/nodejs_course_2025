<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleGoogleLogin = () => {
  window.location.href = 'http://localhost:3000/auth/google';
};

onMounted(() => {
  // 檢查是否已登入
  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/check', {
        credentials: 'include' // 包含憑證
      });
      if (response.ok) {
        router.push('/home');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };
  checkAuth();
});
</script>

<template>
  <div class="login-container">
    <div class="login-box">
      <h1>Welcome</h1>
      <p>Please sign in to continue</p>
      <button @click="handleGoogleLogin" class="google-btn">
        <img src="https://www.google.com/favicon.ico" alt="Google" />
        Sign in with Google
      </button>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  margin-bottom: 1rem;
  color: #333;
}

p {
  margin-bottom: 2rem;
  color: #666;
}

.google-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 24px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.google-btn:hover {
  background-color: #f8f8f8;
}

.google-btn img {
  width: 18px;
  height: 18px;
}
</style> 