<template>
    <div class="work-experience">
        <h3 style="float: right; padding-left: 1rem;"> {{ startDate }} - {{ endDate }}</h3>
        <h3>{{ jobTitle }}</h3>
        <br>
        <p>{{ description }}</p>
        <br>
        <hr class="solid">
    </div>
</template>

<script setup>

defineProps({
    jobTitle: String,
    description: String,
    startDate: String,
    endDate: String
})

</script>

<style scoped>
.work-experience {
    padding: 1rem;
}

hr.solid {
    border-top: 1px solid #ffffff32;
    border-radius: 25px;
    max-width: 20%;
}
</style>