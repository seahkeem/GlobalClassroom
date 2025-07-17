<script setup>
import Collections from '@/components/Collections.vue';

</script>

<template>
    <div class="gray-background">
        <TopBar></TopBar>
        <Collections></Collections>
        <Navbar></Navbar>
    </div>
</template>

<style scoped>
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

@media (max-width: 1028px) {
    .gray-background {
        padding-top: 0rem;
        padding-bottom: 0rem;
        padding-left: 0dvw;
        padding-right: 0dvw;
    }
}
</style>