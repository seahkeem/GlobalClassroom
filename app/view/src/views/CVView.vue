<template>
  <div class="gray-background">
    <TopBar></TopBar>
    <Card class="card-container">
      <template #content>
        <CVInfo></CVInfo>
        <div class="button-container">
          <button class="button-74" role="button"> <i class="pi pi-envelope"></i> Contact!</button>
          <button class="button-74" role="button"> <i class="pi pi-heart"></i> Save CV</button>
        </div>
      </template>
    </Card>
  </div>
  <Navbar></Navbar>
</template>

<script setup>
import CVInfo from '@/components/CVInfo.vue';

</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.53);
  backdrop-filter: blur(5px);
  margin-top: 25px;
}

.button-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.button-74 {
  background-color: #ffffff;
  border: 2px solid #1E2828;
  border-radius: 30px;
  box-shadow: #1E2828 4px 4px 0 0;
  color: #1E2828;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  padding: 0 1rem;
  line-height: 50px;
  touch-action: manipulation;
  margin: 0 10px;
}

.button-74:hover {
  background-color: transparent;
}

.button-74:active {
  box-shadow: #1E2828 2px 2px 0 0;
  transform: translate(2px, 2px);
}

.gray-background {
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 20dvw;
  padding-right: 20dvw;
  background-color: #ededed98;
  background-image: url('@/assets/Pastel_11.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

@media (max-width: 767px) {
  .gray-background {
    padding-top: 0rem;
    padding-bottom: 0rem;
    padding-left: 0dvw;
    padding-right: 0dvw;
  }

  .button-74 {
    padding: 0.2rem;
    font-size: 18px;

  }
}
</style>
