<template>
    <TabView>
        <TabPanel header="Self Promotion">
            <div class="form-container">
                <div class="form-item">
                    <input placeholder="Title" v-model="title" />
                </div>
                <br>
                <div>
                    <div class="form-item">
                        <select v-model="selectedCategory">
                            <option v-for="type in categories" :value="type.code" :key="type.code">{{ type.name }}
                            </option>
                        </select>
                    </div>
                    <br>
                    <div class="form-item">
                        <Calendar placeholder="Date" v-model="jobDate" />
                    </div>
                    <br>
                    <div class="form-item">
                        <textarea placeholder="Description" v-model="description" style="min-height: 5rem;" />
                    </div>
                    <br>
                    <div class="pictures-container">
                        <div v-for="(picture, index) in media" :key="index" class="picture-preview">
                            <img :src="picture.url" class="image-preview" />
                            <Button icon="pi pi-times" class="remove-picture-button" @click="removeMedia(index)" />
                        </div>
                        <Button icon="pi pi-plus" class="add-picture-button" @click="() => mediaInput.click()" />
                    </div>
                    <input type="file" ref="mediaInput" hidden @change="handleMediaUpload" accept="image/*" />
                </div>
                <br>
                <Button label="Post" class="post-button" @click="post" />
            </div>
        </TabPanel>
        
    </TabView>
</template>

<script setup>
import { ref } from 'vue';
import { ref as storageRef, deleteObject, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase.js';
import { jwtDecode } from 'jwt-decode';

const categories = ref([
    { name: 'Tech', code: 'TECH' },
    { name: 'Healthcare', code: 'HC' },
    { name: 'Education', code: 'EDU' },
    { name: 'Construction', code: 'CONS' },
    { name: 'Finance', code: 'FIN' }
]);

const title = ref('');
const selectedCategory = ref('TECH');
const jobDate = ref(null);
const description = ref('');
const media = ref([]);
const video = ref({});
const mediaInput = ref(null);
const videoInput = ref(null);


const token = localStorage.getItem('token');
if (!token) {
    throw new Error('No token found');
}
// var decoded = jwtDecode(token).username;

// if (token && decoded) {
//     decoded = toTitleCase(decoded);
//     username = decoded;
// }

// function toTitleCase(str) {
//     return str.replace(/\b(\w)/g, function (match, capture) {
//         return capture.toUpperCase();
//     });
// }

async function handleMediaUpload(event) {
    const files = event.target.files;
    if (!files.length) return;

    const now = Date.now();

    // Extracting email from the JWT token
    const decodedToken = jwtDecode(token);
    const email = decodedToken.email; // Assuming the email is stored in the token's 'email' field

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${email}JobPost${now + i}.png`; // Using email instead of username
        const fileRef = storageRef(storage, fileName);

        try {
            const snapshot = await uploadBytes(fileRef, file);
            const url = await getDownloadURL(snapshot.ref);
            media.value.push({ file, url, fileName });
            console.log(media.value[media.value.length - 1].url);
        } catch (error) {
            console.error("Error uploading file: ", error);
        }
    }
}
function removeMedia(index) {
    const fileToDelete = media.value[index];
    const fileRef = storageRef(storage, fileToDelete.fileName); 
    deleteObject(fileRef)
        .then(() => {
            console.log("File deleted successfully");
            media.value.splice(index, 1);
        })
        .catch((error) => {
            console.error("Error removing file: ", error);
        });
}

// video not working atm
function handleVideoUpload(event) {
    const files = event.target.files;
    if (!files.length || video.value.url) return;

    const file = files[0];
    const url = URL.createObjectURL(file);
    video.value = { file, url };
}

function removeVideo() {
    URL.revokeObjectURL(video.value.url);
    video.value = {};
}

function post() {
    console.log('Token:', token);
    const postData = {
        job_post_title: title.value,
        job_post_category: selectedCategory.value,
        job_post_date: jobDate.value,
        job_post_description: description.value,
        job_post_image: media.value.map(item => item.url), // Extracting URLs from media array
        // profile_email: email.value
    };

    fetch('/addpost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to post data');
            }
            console.log('Post successful');
            title.value = '';
            selectedCategory.value = 'TECH';
            jobDate.value = null;
            description.value = '';
            media.value = [];
            video.value = {};
        })
        .catch(error => {
            console.error('Error posting data:', error.message);
        });
}

</script>

<style scoped>
:deep(.p-tabview-panels) {
    background: transparent !important;
}

.post-heading {
    padding-bottom: 1rem
}

.form-item input,
.form-item select,
.form-item textarea {
    width: 100%;
    padding: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    font-size: 1rem;
    color: #333;
    outline: none;
}

.form-item input:hover,
.form-item select:hover,
.form-item textarea:hover {
    border-color: #888;
}

.form-item input:focus,
.form-item select:focus,
.form-item textarea:focus {
    border-color: #0056b3;
    box-shadow: 0 0 5px rgba(0, 86, 179, 0.25);
}

.pictures-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}

.picture-preview {
    position: relative;
    width: 10rem;
    height: 10rem;
    margin: 0.2rem;
}

.image-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.video-preview {
    width: 100%;
    max-height: 300px;
    object-fit: cover;
}

.remove-picture-button,
.remove-video-button {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.add-picture-button,
.add-video-button {
    width: 10rem;
    height: 10rem;
    border: 2px dashed #ccc;
    border-radius: 8px;
    background-color: rgb(220, 220, 220);
}

.post-button {
    display: flex;
    margin: auto;
    width: 40dvw;
}


@media (max-width: 1100px) {
    .form-container {
        padding: 0;
        max-width: 100%;
    }

    .pictures-container {
        gap: 0.5rem;
    }
}

@media (max-width: 767px) {

    .form-item input,
    .form-item select,
    .form-item textarea {
        padding: 0.5rem;
        font-size: 0.9rem;
    }
}
</style>