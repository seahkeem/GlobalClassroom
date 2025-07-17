<template>

    <h1 class="title">Pick a Colour Scheme</h1>
    <div class="center">
        <div class="cube-grid">
            <!-- Cube 1 -->
            <div class="cube" @click="selectCube('blue')" :class="{ 'selected': selectedColor === 'blue' }">
                <div class="face front" style="background: #6580E1;"></div>
                <div class="face top" style="background: #93AAFC;"></div>
                <div class="face left" style="background: #BDCBFD;"></div>
            </div>
            <!-- Cube 2 -->
            <div class="cube" @click="selectCube('purple')" :class="{ 'selected': selectedColor === 'purple' }">
                <div class="face front" style="background: #8865E1;"></div>
                <div class="face top" style="background: #B193FC;"></div>
                <div class="face left" style="background: #CFBDFD;"></div>
            </div>
            <!-- Cube 3 -->
            <div class="cube" @click="selectCube('green')" :class="{ 'selected': selectedColor === 'green' }">
                <div class="face front" style="background: #80E165;"></div>
                <div class="face top" style="background: #AAFC93;"></div>
                <div class="face left" style="background: #CBFDBD;"></div>
            </div>
            <!-- Cube 4 -->

            <div class="cube" @click="selectCube('pink')" :class="{ 'selected': selectedColor === 'pink' }">
                <div class="face front" style="background: #E165BE;"></div>
                <div class="face top" style="background: #FC93DE;"></div>
                <div class="face left" style="background: #FDBDEB;"></div>
            </div>
            <!-- Cube 5 -->
            <div class="cube" @click="selectCube('white')" :class="{ 'selected': selectedColor === 'white' }">
                <div class="face front" style="background: #B3B3B3;"></div>
                <div class="face top" style="background: #D9D9D9;"></div>
                <div class="face left" style="background: #FFFFFF;"></div>
            </div>
            <!-- Cube 6 -->
            <div class="cube" @click="selectCube('yellow')" :class="{ 'selected': selectedColor === 'yellow' }">
                <div class="face front" style="background: #E1C665;"></div>
                <div class="face top" style="background: #FCE593;"></div>
                <div class="face left" style="background: #FDEFBD;"></div>
            </div>
            <!-- Cube 7 -->
            <div class="cube" @click="selectCube('orange')" :class="{ 'selected': selectedColor === 'orange' }">
                <div class="face front" style="background: #E18865;"></div>
                <div class="face top" style="background: #FCB193;"></div>
                <div class="face left" style="background: #FDCFBD;"></div>
            </div>
            <!-- Cube 8 -->
            <div class="cube" @click="selectCube('red')" :class="{ 'selected': selectedColor === 'red' }">
                <div class="face front" style="background: #E16580;"></div>
                <div class="face top" style="background: #FC93AA;"></div>
                <div class="face left" style="background: #FDBDCB;"></div>
            </div>
            <!-- Cube 9 -->
            <div class="cube" @click="selectCube('cyan')" :class="{ 'selected': selectedColor === 'cyan' }">
                <div class="face front" style="background: #65BEE1;"></div>
                <div class="face top" style="background: #93DEFC;"></div>
                <div class="face left" style="background: #BDEBFD;"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const selectedColor = ref(null);

const emit = defineEmits(['update:selectedColor']);

const selectCube = (color) => {
    if (selectedColor.value === color) {
        selectedColor.value = null;
    } else {
        selectedColor.value = color;
        emit('update:selectedColor', selectedColor.value);
    }
};
</script>

<style scoped>
.cube.selected {
    border: 7px solid #ffffff;
}

.center {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
}

.cube-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 5rem;
    margin: 4rem;
}

.cube {
    position: relative;
    width: 80px;
    height: 80px;
    transform-style: preserve-3d;
    transform: rotateX(-30deg) rotateY(45deg);
    transition: transform 1.5s ease-in-out;
}

.face {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: #ffffff;
}

.front {
    transform: translateZ(40px);
}

.top {
    transform: rotateX(90deg) translateZ(40px);
}

.left {
    transform: rotateY(-90deg) translateZ(40px);
}

.cube:hover {
    transform: rotateX(0deg) rotateY(0deg);
}

@media only screen and (max-width: 768px) {
    .cube-grid {
        gap: 3.5rem;
        margin: 2rem;
    }

    .cube {
        width: 40px;
        height: 40px;
    }

    .front {
        transform: translateZ(20px);
    }

    .top {
        transform: rotateX(90deg) translateZ(20px);
    }

    .left {
        transform: rotateY(-90deg) translateZ(20px);
    }

    .center {
        margin-left: 0%;
    }

}
</style>