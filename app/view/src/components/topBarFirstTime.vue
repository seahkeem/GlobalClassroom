<template>
  <header class="top-bar">
    <div class="logo">
      <img src="/src/assets/UCVME_logo-removebg-preview.png" alt="UCVME Logo" class="logo-img" @click="goToLoginPage" />
    </div>
    <div class="language-switch">
      <i class="pi pi-globe" style="font-size: 1.7rem"></i>
    </div>
  </header>
</template>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.logo-img {
  width: 12rem;
  height: auto;
  cursor: pointer;
}
</style>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const visible = ref(false);
const router = useRouter();
const goToLoginPage = () => {
  router.push({ name: 'Login' });
  visible.value = false;
};
</script>