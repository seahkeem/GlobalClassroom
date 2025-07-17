<template>
    <div class="gray-background">
        <TopBar></TopBar>
        <Card class="card-container">
            <template #header>
                <h3>History</h3>
            </template>
            <template #content>
                <History></History>
            </template>
        </Card>
        <Navbar></Navbar>
    </div>
</template>

<style scoped>
.card-container {
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.53);
    backdrop-filter: blur(5px);
    align-items: center;
}

.button-container {
    display: flex;
    justify-content: center;
    padding: 1rem;
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

@media (max-width: 767px) {
    .gray-background {
        padding-top: 0rem;
        padding-bottom: 0rem;
        padding-left: 0dvw;
        padding-right: 0dvw;
    }
}
</style>