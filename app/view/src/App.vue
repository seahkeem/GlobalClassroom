<script setup>
import { RouterLink } from 'vue-router'
import HomeView from './views/HomeView.vue';
import Navbar from '@/components/Navbar.vue';
// import Likes from '@/components/Likes.vue';

</script>

<template>

<div id="app">
    <RouterView />
</div>

</template>

<style>
* {
    margin: 0%;
}
</style>
