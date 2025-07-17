<template>
    <div class="gray-background">
        <TopBarFT></TopBarFT>
        <Card>
            <template #content>
                <div class="pyro">
                    <div class="before"></div>
                    <div class="complete-container">
                        <h1>You are all set up!</h1>
                        <img src="@/assets/Celebration-amico.svg" alt="Congratulations Image"
                            class="congratulations-image">
                        <Button @click="goToHomePage">Go to Home Page</Button>
                    </div>
                    <div class="after"></div>
                </div>
            </template>
        </Card>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const goToHomePage = () => {
    router.push({ name: 'Home' });
};

</script>

<style lang="scss" scoped>
.p-card {
    background-color: rgba(255, 255, 255, 0.53);
    backdrop-filter: blur(5px);
    padding: 1rem;
}

.p-button {
    padding: 1rem;
    border-radius: 25px;
}

.gray-background {
    padding: 1rem;
    background-color: #ededed98;
    background-image: url('@/assets/Pastel_11.png');
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 100vh;
}

.complete-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.congratulations-image {
    max-width: 60dvw;
}




// Credits to Heather Allem ( Wilcox ) https://codepen.io/hmaw/pen/qBEMLxV for the firework animation
$particles: 50;
$width: 500;
$height: 500;

// Create the explosion...
$box-shadow: (
);
$box-shadow2: (
);

@for $i from 0 through $particles {
    $box-shadow: $box-shadow,
        random($width) - calc($width / 2) + px random($height) - calc($height / 1.2) + px hsl(random(360), 100%, 50%);
    $box-shadow2: $box-shadow2, 0 0 #fff
}

@mixin keyframes ($animationName) {
    @-webkit-keyframes #{$animationName} {
        @content;
    }

    @-moz-keyframes #{$animationName} {
        @content;
    }

    @-o-keyframes #{$animationName} {
        @content;
    }

    @-ms-keyframes #{$animationName} {
        @content;
    }

    @keyframes #{$animationName} {
        @content;
    }
}

@mixin animation-delay ($settings) {
    -moz-animation-delay: $settings;
    -webkit-animation-delay: $settings;
    -o-animation-delay: $settings;
    -ms-animation-delay: $settings;
    animation-delay: $settings;
}

@mixin animation-duration ($settings) {
    -moz-animation-duration: $settings;
    -webkit-animation-duration: $settings;
    -o-animation-duration: $settings;
    -ms-animation-duration: $settings;
    animation-duration: $settings;
}

@mixin animation ($settings) {
    -moz-animation: $settings;
    -webkit-animation: $settings;
    -o-animation: $settings;
    -ms-animation: $settings;
    animation: $settings;
}

@mixin transform ($settings) {
    transform: $settings;
    -moz-transform: $settings;
    -webkit-transform: $settings;
    -o-transform: $settings;
    -ms-transform: $settings;
}

body {
    margin: 0;
    padding: 0;
    background: #000;
    overflow: hidden;
}

.pyro {
    position: relative;
}

.pyro>.before,
.pyro>.after {
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    box-shadow: $box-shadow2;
    @include animation((1s bang ease-out infinite backwards, 1s gravity ease-in infinite backwards, 5s position linear infinite backwards));
}

.pyro>.after {
    @include animation-delay((1.25s, 1.25s, 1.25s));
    @include animation-duration((1.25s, 1.25s, 6.25s));
}

@include keyframes(bang) {
    to {
        box-shadow: $box-shadow;
    }
}

@include keyframes(gravity) {
    to {
        @include transform(translateY(200px));
        opacity: 0;
    }
}

@include keyframes(position) {

    0%,
    19.9% {
        top: 10%;
    }

    20%,
    39.9% {
        top: 40%;
        left: 30%;
    }

    40%,
    59.9% {
        top: 20%;
        left: 70%;
    }

    60%,
    79.9% {
        top: 30%;
        left: 20%;
    }

    80%,
    99.9% {
        top: 30%;
        left: 80%;
    }
}
</style>