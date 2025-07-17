<template>
  <div class="header" :class="{ 'rounded-header': !collection.posts.length }">
    <h1>{{ collection.name }}</h1>
    <h4 v-if="!collection.posts.length" style="padding: 2rem;">No Posts Added</h4>
  </div>
  <Card class="card" v-for="post in collection.posts" :key="post.id" v-if="collection.posts.length">
    <template #header>
      <div style="display: flex; align-items: center;">
        <Avatar label="E" size="large" />
        <h3 style="padding-left: 1rem;" class="user-name">{{ post.firstname }} {{ post.lastname }}</h3>
      </div>
    </template>
    <template #content>
      <div class="title">
        <h2>{{ post.title }}</h2> <br>
        <h4>{{ post.date }}</h4>
      </div>
      <br><br>
      <div class="galleria-content" v-if="!post.video && post.images.length">
        <Galleria :value="post.images" :numVisible="3" containerStyle="max-width: 70dvh" :showThumbnails="false"
          :showIndicators="true" :changeItemOnIndicatorHover="true">
          <template #item="slotProps">
            <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" class="galleria-image" />
          </template>
        </Galleria>
      </div>
      <div v-if="post.video">
        <div class="video-content">
          <video class="video" controls>
            <source :src="post.video" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <br><br>
      </div>
      <div class="post-details">
        <div class="post-content">
          <p v-html="post.description" class="scroll-panel"></p>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="post-actions">
        <Button label="&nbsp Dislike" @click="dislikePost(post)" icon="pi pi-heart-full" severity="secondary" text rounded
          aria-label="Dislike" />
        <Button label="&nbsp  Apply" icon="pi pi-send" severity="secondary" text rounded aria-label="Apply" />
      </div>
    </template>
  </Card>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// test data
import video from '@/assets/vid1.mov';
import video2 from "@/assets/vid2.mov";
import cat3 from '@/assets/cat3.jpg';
import cat1 from '@/assets/cat1.jpg';

const route = useRoute()
const collection = ref(null)

const images = ref();
const PhotoService = {
  getData() {
    return [
      {
        itemImageSrc: cat3,
        thumbnailImageSrc: cat3,
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: cat1,
        thumbnailImageSrc: cat1,
        alt: 'Description for Image 2',
        title: 'Title 2'
      }
    ];
  },
  getImages() {
    return Promise.resolve(this.getData());
  }
};


onMounted(() => {
  const collectionId = route.params.id;
  collection.value = fetchCollectionById(collectionId);
  console.log(collection.value);

  PhotoService.getImages().then((data) => (images.value = data));
});

function fetchCollectionById(id) {
  // test  function to simulate fetching data/ should be from db
  return {
    id: id,
    name: 'Sample Collection',
    posts: [
      {
        id: 1,
        firstname: "Wolfgang",
        lastname: "McClingelberry",
        title: 'Looking for young and talented developers!',
        date: 'Needed for 22/04/2024, 16:00',
        description:
          "We're on the lookout for young, talented computer scientists who are eager to innovate and drive technological advancements. Our ideal candidates are recent graduates or current students in the field of computer science who possess a strong foundational understanding of programming, algorithms, and systems design. We value creativity, the ability to think critically about complex problems, and a passion for learning new technologies. If you're looking for an opportunity to apply your skills in real-world applications and work on cutting-edge projects that impact various industries, we encourage you to join our dynamic team. Together, we'll explore new possibilities, develop groundbreaking software, and revolutionize the way technologies enhance our lives.<br><br>",
        video: video,
      },
      {
        id: 4,
        firstname: "Bongo",
        lastname: "Crouch",
        title: 'Looking for farmers in Wicklow!',
        date: 'Needed for 25/04/2024, 07:00',
        description:
          "We are seeking dedicated farmers to join our agricultural team in Wicklow. Ideal candidates will have experience in farming or a strong interest in agriculture, with a particular focus on sustainable practices. We value individuals who are hardworking, detail-oriented, and passionate about cultivating high-quality produce and maintaining the health of our land. This role involves various farming duties, including planting, harvesting, crop management, and equipment operation. If you're ready to contribute to a thriving agricultural community and take part in nurturing the land in scenic Wicklow, we invite you to apply and grow with us.<br><br>",
        video: video2,
      },
      {
        id: 2,
        firstname: "Joe",
        lastname: "Alade",
        title: 'Looking for a cat sitter',
        date: 'Needed for 22/04/2024, 16:00',
        description: "<strong>Job Description:</strong><br>" +
          "Hey there! Are you someone who finds solace in the purrs of content kitties? We’re looking for a kind-hearted individual to pamper our two furry friends while we embark on a two-week adventure. If you're a cat whisperer who can make our fur babies feel like royalty, this gig is purr-fect for you!<br><br>" +
          "<strong>Responsibilities:</strong><br>" +
          "1. Feeding our cats with love and care, sticking to their meal schedules.<br>" +
          "2. Ensuring their water bowls are topped up for hydration.<br>" +
          "3. Keeping their litter boxes clean and cozy for their business.<br>" +
          "4. Engaging them in playful antics and cuddle sessions to keep their spirits high.<br>" +
          "5. If needed (though they're generally healthy fluff balls), administering any meds.<br>" +
          "6. Sharing daily snapshots or updates to assure us they're thriving.<br>" +
          "7. If you’re up for it, maybe water our plants and collect the mail (we’ll owe you big time!).<br><br>" +
          "<strong>Requirements:</strong><br>" +
          "1. A heart brimming with adoration for our furry pals.<br>" +
          "2. Past experience as a cat's confidant would be paw-some!<br>" +
          "3. Reliability that's as solid as a cat's nap schedule.<br>" +
          "4. Willingness to follow our feline friends' routines to the whisker.<br>" +
          "5. Your calendar should be clear for the whole two-week kitty cuddle fest.<br>" +
          "6. Access to transportation to whisk you to our home for kitty care.<br><br>" +
          "<strong>Compensation:</strong><br>" +
          "Let's chat about what feels fair based on your experience and the TLC you'll be giving our kitties.<br><br>" +
          "If you’re ready to dive into two weeks of purr-dise with our fur babies, drop us a line with a little about yourself and why you’re the cat’s meow for this job. References from fellow feline enthusiasts would make our whiskers twitch with excitement. Thanks a million!",
        images: [
          {
            itemImageSrc: cat3,
            thumbnailImageSrc: cat3,
            alt: 'Description for Image 1',
            title: 'Title 1'
          },
          {
            itemImageSrc: cat1,
            thumbnailImageSrc: cat1,
            alt: 'Description for Image 2',
            title: 'Title 2'
          }
        ]
      }
    ]
  }
}
</script>


<style scoped>
.header {
  background-color: rgba(255, 255, 255, 0.53);
  backdrop-filter: blur(5px);
  padding: 2rem;
  text-align: center;
  color: #454545;
  border-radius: 25px 25px 0px 0px;
}

.rounded-header {
  border-radius: 10px;
  min-height: 80dvh;
  max-width: 80dvw;
  margin: auto;
  box-shadow: 0 2px 2px 0 rgba(93, 93, 93, 0.2);
}

.title,
.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card {
  padding: 1rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  border-radius: 0px;
  border-bottom: 1px solid rgba(206, 206, 206, 0.753);
  background-color: rgba(255, 255, 255, 0.53);
  backdrop-filter: blur(5px);
}

.post-card {
  display: flex;
  flex-direction: row;
}

.galleria-image {
  width: 100%;
  height: 35vh;
  object-fit: cover;
}

.galleria-content {
  float: left;
  padding-right: 1rem;
  max-width: 30dvw;
  width: 100%;
  margin-bottom: 1rem;
}

.video-content {
  width: 20%;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  border-radius: 25px;
  overflow: hidden;
  margin: auto;
}

video {
  width: 100%;
  height: 40dvh;
  display: block;
  object-fit: cover;
}

.post-details {
  display: flex;
  flex-direction: column;
}

.post-content {
  margin-bottom: 1rem;
}

.post-actions {
  display: flex;
  justify-content: space-between;
}

.scroll-panel {
  max-height: 35vh;
  overflow-y: scroll;
}

.scroll-panel::-webkit-scrollbar {
  width: 6px;
}

.scroll-panel::-webkit-scrollbar-thumb {
  background-color: #ffffff;
  background-clip: padding-box;
  border: 2px solid transparent;
}

.scroll-panel::-webkit-scrollbar-track {
  background-color: #6d6d6d;
}


@media (max-width: 1024px) {
  .title {
    display: inline;
  }

  .galleria-content {
    float: none;
  }

  .galleria-content,
  .post-details {
    display: flex;
    justify-content: center;
    max-width: 100%;
  }

  .galleria-image {
    object-fit: cover;
    width: 100dvw;
    height: 35dvh;
  }

  .video-content {
    width: 100%;
    margin: auto;
  }

  .post-details {
    padding-top: 1rem;

  }
}
</style>