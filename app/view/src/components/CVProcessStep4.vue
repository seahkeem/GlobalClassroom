<template>
    <h1 class="title">Add Your Video</h1>

    <div style="padding: 2rem;">
        <div class="center">
            <div class="image-preview-container">
                <div class="image-preview" v-if="previewImage">
                    <img :src="previewImage" alt="Video preview" class="rounded-preview">
                </div>
                <div v-if="isLoading" class="loading-overlay">
                    Uploading...
                    <ProgressSpinner />
                </div>
                <div class="default-image" v-else>
                    <img src="/src/assets/videoUpload.png" alt="Default Image" class="rounded-preview">
                </div>
            </div>

            <div class="file-input-container">
                <label for="fileInput" class="file-label">Choose File</label>
                <input id="fileInput" type="file" @change="handleFileInputChange" accept="video/*"
                    style="display: none">
            </div>
        </div>
    </div>

    <!-- Hidden video element for generating thumbnail -->
    <video ref="videoElement" style="display: none;"></video>
</template>

<script>
import { ref, onMounted } from 'vue';
import { storage } from '@/firebase.js';
import { ref as fireRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import { jwtDecode } from 'jwt-decode';

export default {
    setup(_, { emit }) {
        const previewImage = ref(null);
        const isLoading = ref(false);
        const videoUrl = ref("");
        const videoElement = ref(null);
        var username = 'username';

        const token = localStorage.getItem('token');
        var decoded = jwtDecode(token).username;

        if (token && decoded) {
            decoded = toTitleCase(decoded);
            username = decoded;
        }

        function toTitleCase(str) {
            return str.replace(/\b(\w)/g, function (match, capture) {
                return capture.toUpperCase();
            });
        }

        const handleFileInputChange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                const videoRef = fireRef(storage, `${username}.mp4`);
                isLoading.value = true;

                const objectUrl = URL.createObjectURL(file);
                videoElement.value.src = objectUrl;
                videoElement.value.load();

                videoElement.value.addEventListener('loadedmetadata', () => {
                    try {
                        captureThumbnail(file);
                    } catch (error) {
                        console.error("Error generating thumbnail: ", error);
                    }
                }, { once: true });
            
                try {
                    const snapshot = await uploadBytes(videoRef, file);
                    videoUrl.value = await getDownloadURL(snapshot.ref);
                    console.log(videoUrl.value);
                    emit('videoUploaded', videoUrl.value);
                } catch (error) {
                    console.error("Upload failed", error);
                } finally {
                    isLoading.value = false;
                }
            }
        };

        const captureThumbnail = (file) => {
            videoElement.value.currentTime = Math.min(5, videoElement.value.duration / 2);  // Attempt to capture a frame from the middle or at 5s
            videoElement.value.addEventListener('seeked', async () => {
                const canvas = document.createElement('canvas');
                canvas.width = videoElement.value.videoWidth;
                canvas.height = videoElement.value.videoHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);
                previewImage.value = canvas.toDataURL();

                const videoRef = fireRef(storage, `videos/${file.name}`);
                try {
                    const snapshot = await uploadBytes(videoRef, file);
                    const videoUrl = await getDownloadURL(snapshot.ref);
                    emit('videoUploaded', videoUrl);
                } catch (error) {
                    console.error("Upload failed", error);
                }
                isLoading.value = false;
                URL.revokeObjectURL(objectUrl);
            }, { once: true });
        };

        return {
            previewImage,
            isLoading,
            handleFileInputChange,
            videoElement
        };
    }
};
</script>

<style scoped>
.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
}

.center {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-preview-container {
    width: 300px;
    height: 300px;
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: 10px;
}

.image-preview {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.default-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.rounded-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
}

.file-input-container {
    text-align: center;
}

.file-label {
    display: inline-block;
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.file-label:hover {
    background-color: #45a049;
}

#fileInput {
    display: none;
}

.title {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
}
</style>
