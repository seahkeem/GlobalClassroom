<template>
  <nav class="navbar">
    <div class="d-flex">
      <RouterLink to="/">
        <i class="pi pi-home"  style="color: black; font-size: 1.5rem"></i>
      </RouterLink>
      <RouterLink to="/wallet">
        <i class="pi pi-wallet" style="color: black; font-size: 1.5rem"></i>
      </RouterLink>
      <RouterLink to="/addpost">
        <i class="pi pi-plus" style="color: black; font-size: 1.5rem"></i>
      </RouterLink>
      <RouterLink to="/history">
        <i class="pi pi-history" style="color: black; font-size: 1.5rem"></i>
      </RouterLink>
      <RouterLink to="/CVUsername">
        <i class="pi pi-user" style="color: black; font-size: 1.5rem"></i>
      </RouterLink>
    </div>
  </nav>
</template>

<script>
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  }
}
</script>

<style scoped>
.d-flex {
  display: flex;
  justify-content: space-between;
}

.navbar {
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1030;
  padding: 0.5rem 20%;
  background-color: white;
  border-top: 1px solid #eaeaea;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);

}

@media only screen and (max-width: 800px) {
  .navbar {
  padding: 0.5rem 10%;
  }
}
</style>