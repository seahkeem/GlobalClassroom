<template>
  <div class="video-player-container">
    <div class="video-wrapper">
      <video ref="videoPlayer" class="video-player" width="640" height="360" controls>
        <source :src=videomp4 type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  videomp4: String,
});
</script>

<style scoped>


.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
}

.video-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.video-player-container video {
  object-fit: cover !important;
  border-radius:  25px 25px 0px 0px;
}

@media only screen and (max-width: 850px) {

}
</style>