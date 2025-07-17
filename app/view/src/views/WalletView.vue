<template>
    <div class="gray-background">
        <TopBar></TopBar>
        <Card class="card-container">
            <template #header>
                <h3>Saved CVs</h3>
            </template>
            <template #content>
                <Wallet :collections="collections" @add-collection="handleNewCollection"
                    @update-collection="handleUpdateCollection" @delete-collection="handleDeleteCollection">
                </Wallet>
            </template>
        </Card>
        <Navbar></Navbar>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Wallet from '@/components/Wallet.vue';

//test data imports
import test2 from '@/assets/test2.mp4';
import test3 from '@/assets/test3.mp4';

import person1 from '@/assets/wonyoung.png';
import person2 from '@/assets/person2.jpg';
import person3 from '@/assets/person4.png';

// funcs to handle emits from Wallet
const handleNewCollection = (collectionName) => {
    const newCollection = {
        id: Date.now(),
        name: collectionName,
        cvs: [],
    };
    collections.value.push(newCollection);
};

const handleUpdateCollection = ({ id, name }) => {
    const collectionIndex = collections.value.findIndex(c => c.id === id);
    if (collectionIndex !== -1) {
        collections.value[collectionIndex].name = name;
    }
};

const handleDeleteCollection = (id) => {
    collections.value = collections.value.filter(c => c.id !== id);
};

// Test data 
// this should be any CVs that were saved/liked by the user
const allCVs = ref([
    {
        id: 'cv1',
        name: 'Erica Lee',
        video: test2,
        stillImage: person1,
        workExperience: [
            {
                jobTitle: 'Hairstylist',
                startDate: '2020-01',
                endDate: '2021-12',
                description: 'Hairstyle.',
                memory: 'A client once gave me a tip',
                referencePhone: '000000'
            },
        ],
    },
    {
        id: 'cv2',
        name: 'John Doe',
        video: test2,
        stillImage: person2,
        workExperience: [
            {
                jobTitle: 'Gardener',
                startDate: '2020-01',
                endDate: '2021-12',
                description: 'Maintained and beautified gardens.',
                memory: 'A client once...',
                referencePhone: '000000'
            },
        ],
    },
    {
        id: 'cv3',
        name: 'Amanda Doe',
        video: test3,
        stillImage: person3,
        workExperience: [
            {
                jobTitle: 'Pet Sitter',
                startDate: '2020-01',
                endDate: '2021-12',
                description: 'Taking care of cats and dogs',
                memory: 'A client once...',
                referencePhone: '000000'
            },
        ],
    },
]);

const allCVsCollection = {
    id: 0,
    name: 'All CVs',
    cvs: allCVs,
};

// this should be the collections made by the user with added cvs to it
const collections = ref([
    {
        id: 1,
        name: 'Gardening CVs',
        cvs: [
            {
                id: 'cv1',
                name: 'Erica Lee',
                video: test2,
                stillImage: person1,
                workExperience: [
                    {
                        jobTitle: 'Hairstylist',
                        startDate: '2020-01',
                        endDate: '2021-12',
                        description: 'Hairstyle.',
                        memory: 'A client once gave me a tip',
                        referencePhone: '000000'
                    },
                ],
            },
            {
                id: 'cv2',
                name: 'John Doe',
                video: test2,
                stillImage: person2,
                workExperience: [
                    {
                        jobTitle: 'Gardener',
                        startDate: '2020-01',
                        endDate: '2021-12',
                        description: 'Maintained and beautified gardens.',
                        memory: 'A client once...',
                        referencePhone: '000000'
                    },
                ],
            }
        ]
    },
    {
        id: 2,
        name: 'Pet Sitter CVs',
        cvs: [
            {
                id: 'cv1',
                name: 'Erica Lee',
                video: test2,
                stillImage: person1,
                workExperience: [
                    {
                        jobTitle: 'Hairstylist',
                        startDate: '2020-01',
                        endDate: '2021-12',
                        description: 'Hairstyle.',
                        memory: 'A client once gave me a tip',
                        referencePhone: '000000'
                    },
                ],
            },
            {
                id: 'cv2',
                name: 'John Doe',
                video: test2,
                stillImage: person2,
                workExperience: [
                    {
                        jobTitle: 'Gardener',
                        startDate: '2020-01',
                        endDate: '2021-12',
                        description: 'Maintained and beautified gardens.',
                        memory: 'A client once...',
                        referencePhone: '000000'
                    },
                ],
            },
            {
                id: 'cv3',
                name: 'Amanda Doe',
                video: test3,
                stillImage: person3,
                workExperience: [
                    {
                        jobTitle: 'Pet Sitter',
                        startDate: '2020-01',
                        endDate: '2021-12',
                        description: 'Taking care of cats and dogs',
                        memory: 'A client once...',
                        referencePhone: '000000'
                    },
                ],
            }
        ]
    },
    {
        id: 3,
        name: 'Artist CVs',
        cvs: [
            {
                id: 'cv1',
                name: 'Erica Lee',
                video: test2,
                stillImage: person1,
                workExperience: [
                    {
                        jobTitle: 'Hairstylist',
                        startDate: '2020-01',
                        endDate: '2021-12',
                        description: 'Hairstyle.',
                        memory: 'A client once gave me a tip',
                        referencePhone: '000000'
                    },
                ],
            },
        ]
    },
    {
        id: 4,
        name: 'Musician CVs',
        cvs: [
        ]
    }

]);

onMounted(() => {
    collections.value.unshift(allCVsCollection);
});

</script>

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