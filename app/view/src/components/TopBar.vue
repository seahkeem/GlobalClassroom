<template>
  <br>
  <div class="navbar">
    <!-- Hamburger Menu Icon -->
    <div class="hamburger-menu" @click="toggleMenu">
      <i class="pi pi-bars"></i>
    </div>

    <!-- Search Bar -->
    <div class="search-container">
      <i class="pi pi-search search-icon"></i>
      <input type="text" placeholder="Search for users or jobs...">
    </div>

  </div>
  <!-- Sidebar Menu -->
  <Sidebar v-model:visible="visible" position="left">
    <div class="sidebar-logo">
      <img @click="goToHomePage" style="  max-width: 10rem; height: auto; cursor: pointer;"
        src="/src/assets/UCVME_logo-removebg-preview.png" alt="UCVME Logo" class="logo-img" />
    </div>

    <ul class="sidebar-links">
      <li><a href="javascript:void(0)" @click="goToHistoryPage">
          <i class="pi pi-history"></i>
          History</a>
      </li>
      <li><a href="javascript:void(0)" @click="goToSettingsPage">
          <i class="pi pi-cog"></i>
          Settings</a>
      </li>
      <li><a href="javascript:void(0)" @click="goToHelpPage">
          <i class="pi pi-question-circle"></i>
          Help Centre</a>
      </li>
    </ul>

    <div class="user-panel">
      <div>
        @{{ username }}
      </div>
      <button class="sign-out-btn" @click="signOut">
        <i class="pi pi-sign-out"></i>
      </button>
    </div>

  </Sidebar>
  <br>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode';
import { NULL } from 'sass';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const visible = ref(false);
const router = useRouter();
const token = localStorage.getItem('token');
var decoded = jwtDecode(token).username;
var username = 'username'; // Placeholder username

if (token && decoded) {
  decoded = toTitleCase(decoded);
  username = decoded;
}

const toggleMenu = () => {
  visible.value = !visible.value;
};

/*
const handleScroll = () => {
  if (window.scrollY > 0) {
    navbarBackground.value = 'white';
    border.value = '1px solid #ccc';
  } else {
    navbarBackground.value = 'transparent';
    border.value = 'none';
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});*/

// routing
const goToHistoryPage = () => {
  router.push({ name: 'HistoryView' });
  visible.value = false;
};
const goToSettingsPage = () => {
  router.push({ name: 'SettingView' });
  visible.value = false;
};

const goToHelpPage = () => {
  router.push({ name: 'HelpView' });
  visible.value = false;
};

const goToHomePage = () => {
  router.push({ name: 'Home' });
  visible.value = false;
};

const signOut = () => {
  // Delete the users cookie which persists their log in
  localStorage.removeItem('token');

  // Route them to log in
  router.push({ name: 'Login' });
}

function toTitleCase(str) {
  return str.replace(/\b(\w)/g, function (match, capture) {
    return capture.toUpperCase();
  });
}

</script>

<style scoped>
.navbar {
  display: flex;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: transparent;
  border-bottom: none;
}

.hamburger-menu {
  cursor: pointer;
  font-size: 30px;
}

.search-container {
  position: relative;
  flex-grow: 1;
  max-width: 500px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.search-container input {
  width: 100%;
  padding: 10px 10px 10px 40px;
  border-radius: 25px;
  border: 1px solid #ccc;
  outline: none;
}

.sidebar-logo {
  text-align: center;
  margin-bottom: 20px;
}


.sidebar-links li {
  list-style-type: none;
  margin: 5px 0;
}

.sidebar-links li a {
  display: block;
  padding: 10px;
  color: black;
  text-decoration: none;
  transition: background-color 0.3s;
}

.sidebar-links li a:hover {
  background-color: #f6f6f6;
}

.user-panel {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2.5rem;
}

.sign-out-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.sign-out-btn .pi {
  font-size: 1.5em;
}

@media (max-width: 767px) {
  .search-container {
    max-width: 70dvw;

  }

  .hamburger-menu {
    padding-left: 10px;
  }
}
</style>