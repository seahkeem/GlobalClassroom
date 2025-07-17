<template>
  <div class="gray-background">
    <TopBarFirstTime />
    <Card class="card-container">
      <template #content>
        <SignUpForm @submit-form="handleSignUp" />
      </template>
    </Card>
    <Footer />
  </div>
</template>

<script setup>
import TopBarFirstTime from '@/components/topBarFirstTime.vue';
import SignUpForm from '@/components/SignUpForm.vue';
import Footer from '@/components/Footer.vue';

const handleSignUp = (credentials) => {
  console.log('Sign-up credentials:', credentials);
};
</script>

<style scoped>
.card-container {
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.53);
  backdrop-filter: blur(5px);
  align-items: center;
  max-width: 25dvw;
  margin: auto;
}

.gray-background {
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 20dvw;
  padding-right: 20dvw;
  background-color: #ededed98;
  background-image: url('@/assets/Pastel_13.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

@media (max-width: 1000px) {
  .card-container {
    max-width: 80dvw;
    margin: auto;
  }

  .gray-background {
    padding-left: 0dvw;
    padding-right: 0dvw;
  }
}
</style>