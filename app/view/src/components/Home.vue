<template>
  <div>
    <Card class="card" v-for="post in posts" :key="post.id">
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
        <div class="galleria-content" v-if="post.video">
          <div>
            <video controls class="galleria-image">
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
          <Button label="&nbsp Like" @click="likePost(post)" icon="pi pi-heart" severity="secondary" text rounded
            aria-label="Like" />
          <Button label="&nbsp  Message" icon="pi pi-send" severity="secondary" text rounded aria-label="Message" />
        </div>
      </template>
    </Card>
  </div>
  <Toast />
  <!-- Save to collection popup -->
  <Dialog v-model:visible="showCollectionDialog" header="Add New Collection" :style="{ width: '45rem' }">
    <div class="dialog-content">
      <div>
        <div class="collections-grid">
          <div class="collection" v-for="collection in collections" :key="collection.id" @click="() => savePostToCollection(selectedPost, collection)">
            <div class="collection-images">
              <div class="image primary"
                :style="{ backgroundImage: collection.cvs.length > 0 ? 'url(' + collection.cvs[0].stillImage + ')' : '' }">
                <div v-if="collection.cvs.length === 0" class="placeholder"></div>
              </div>
              <div class="side-images">
                <div class="image secondary"
                  :style="{ backgroundImage: collection.cvs.length > 1 ? 'url(' + collection.cvs[1].stillImage + ')' : '' }">
                  <div v-if="collection.cvs.length < 2" class="placeholder"></div>
                </div>
                <div class="image secondary"
                  :style="{ backgroundImage: collection.cvs.length > 2 ? 'url(' + collection.cvs[2].stillImage + ')' : '' }">
                  <div v-if="collection.cvs.length < 3" class="placeholder"></div>
                </div>
              </div>
            </div>
            <div class="collection-info">
              <h3 class="collection-title">{{ collection.name }}</h3>
              <p class="collection-details">{{ collection.cvs.length }} Saved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast';
const toast = useToast();

// Test Data The images should come from db
import cat3 from '@/assets/cat3.jpg';
import cat1 from '@/assets/cat5.jpeg';
import garden1 from '@/assets/garden1.jpg';
import garden2 from '@/assets/garden2.jpg';
import video from '@/assets/vid1.mov';
import video2 from "@/assets/vid2.mov";
import test2 from '@/assets/test2.mp4';
import test3 from '@/assets/test3.mp4';
import person1 from '@/assets/wonyoung.png';
import person2 from '@/assets/person2.jpg';
import person3 from '@/assets/person4.png';

const showCollectionDialog = ref(false);
const selectedPost = ref(null);

// should get available collections from db, all posts should always be there
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

// Test data by Mate, all these should come from db
const posts = ref([
  {
    id: 1,
    firstname: "Wolfgang",
    lastname: "McClingelberry",
    title: 'Looking for a software developer job!',
    date: 'Needed for 22/04/2024, 16:00',
    description: "<strong>Professional Summary:</strong><br>" +
      "Hello! I'm Wolfgang McClingelberry, a creative and driven software developer eager to bring top-notch coding skills and innovative solutions to your tech team. My background in computer science and proficiency in multiple programming languages equip me with the tools to develop cutting-edge web and mobile applications.<br><br>" +
      "<strong>Skills and Expertise:</strong><br>" +
      "1. Strong proficiency in JavaScript, Python, and Java.<br>" +
      "2. Experienced in full-stack development, from concept through deployment.<br>" +
      "3. Skilled in cloud services such as AWS and Azure.<br>" +
      "4. Proficient in database management and integration.<br>" +
      "5. Excellent problem-solving skills and attention to detail.<br>" +
      "6. Adept at working in agile development environments.<br><br>" +
      "<strong>Key Achievements:</strong><br>" +
      "1. Led the development of a scalable e-commerce platform, increasing customer engagement by 40%.<br>" +
      "2. Successfully implemented a microservices architecture that improved system reliability by 25%.<br>" +
      "3. Developed several mobile apps that have been downloaded over 1,000,000 times.<br><br>" +
      "<strong>Commitment:</strong><br>" +
      "I am committed to continuous learning and staying on the cutting edge of technology. My goal is to apply my skills in a challenging environment that values innovation and a proactive approach to problem solving.<br><br>" +
      "<strong>Goals for the Future:</strong><br>" +
      "I look forward to contributing to a team where I can bring my unique insights and dedication to software excellence. Let’s collaborate to create technology solutions that are not only effective but transformative.<br><br>" +
      "<strong>Get in Touch:</strong><br>" +
      "If you're in need of a versatile software developer who is ready to tackle challenges and make a positive impact, please don’t hesitate to contact me. Together, we can drive the future of technology.<br>",    video: video,
  },
  {
    id: 4,
    firstname: "Bongo",
    lastname: "Crouch",
    title: 'Looking for farmer job in Wicklow',
    date: 'Needed for 25/04/2024, 07:00',
    description: "<strong>About me:</strong><br>" +
      "Hi! I'm Bongo Crouch, eager to apply my robust farming skills in Wicklow. With extensive experience in crop cultivation and livestock management, I am ready to contribute effectively to your farming operations.<br><br>" +
      "<strong>Key Qualifications:</strong><br>" +
      "1. Proficient in modern farming techniques and equipment.<br>" +
      "2. Experienced in both arable and livestock farming.<br>" +
      "3. Strong knowledge of sustainable agricultural practices.<br>" +
      "4. Capable of managing farm resources efficiently to maximize productivity.<br>" +
      "5. Excellent physical condition and stamina to handle demanding farm tasks.<br>" +
      "6. Committed to the principles of organic farming and animal welfare.<br><br>" +
      "<strong>Responsibilities I can handle:</strong><br>" +
      "1. Planting, tending, and harvesting crops.<br>" +
      "2. Feeding and managing livestock, ensuring their health and welfare.<br>" +
      "3. Maintaining farm equipment and structures.<br>" +
      "4. Implementing pest and disease control measures.<br>" +
      "5. Recording production data and managing supplies.<br><br>" +
      "<strong>Personal Commitment:</strong><br>" +
      "I thrive in the great outdoors and take pride in producing food that nourishes communities. I'm deeply committed to enhancing farm productivity while adhering to environmental and ethical standards.<br><br>" +
      "<strong>Looking Forward:</strong><br>" +
      "I'm keen to join a team where I can bring my skills to the forefront and grow alongside a dedicated group of agricultural professionals. Let's advance sustainable agriculture together!<br><br>" +
      "<strong>Contact Me:</strong><br>" +
      "If you are looking for a dedicated and skilled farmer in Wicklow, please reach out. I'm ready to start contributing from day one and help take your farming operations to new heights.<br>",
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
  },
  {
    id: 3,
    firstname: "Steve",
    lastname: "Lee",
    title: 'Backyard Cleanup Specialist Needed!',
    date: 'Needed for 14/04/2024',
    description: "<strong>Job Description:</strong><br>" +
      "Are you someone who loves transforming outdoor spaces from chaos to tranquility? We're on the hunt for a backyard cleanup specialist to tackle a project that's brimming with potential. If you have a knack for tidying up and creating inviting outdoor environments, this gig is for you!<br><br>" +
      "<strong>Responsibilities:</strong><br>" +
      "1. Clearing out debris, fallen branches, and other clutter from the backyard.<br>" +
      "2. Trimming overgrown vegetation, including bushes, hedges, and grass.<br>" +
      "3. Raking and disposing of leaves and other organic matter.<br>" +
      "4. Sweeping and power washing surfaces to remove dirt and grime.<br>" +
      "5. Organizing outdoor furniture, garden tools, and other items.<br><br>" +
      "<strong>Requirements:</strong><br>" +
      "1. Previous experience in yard cleanup or landscaping preferred.<br>" +
      "2. Physical fitness and ability to perform tasks that require bending, lifting, and manual labor.<br>" +
      "3. Attention to detail and a passion for creating neat and orderly outdoor spaces.<br>" +
      "4. Reliable transportation to access the job site.<br><br>" +
      "<strong>Compensation:</strong><br>" +
      "Let's discuss compensation based on the scope of the project and your expertise.<br><br>" +
      "If you're ready to roll up your sleeves and turn a neglected backyard into a backyard oasis, we want to hear from you! Please send us a brief overview of your relevant experience and why you're the perfect fit for this cleanup project. Let's transform this backyard together!",
    images: [
      {
        itemImageSrc: garden1,
        thumbnailImageSrc: garden1,
        alt: 'Description for Image 1',
        title: 'Title 1'
      },
      {
        itemImageSrc: garden2,
        thumbnailImageSrc: garden2,
        alt: 'Description for Image 2',
        title: 'Title 2'
      }
    ]
  }
]);

function likePost(post) {
  selectedPost.value = post;
  showCollectionDialog.value = true;
}

function savePostToCollection(post, collection) {
  // should save to db by sending post and collection info

  console.log(`Post ${post.title} saved to collection ${collection.name}`);
  showCollectionDialog.value = false;

  toast.add({ severity: 'success', summary: 'Saved', detail: `Post saved to ${collection.name}` });
}

</script>

<style scoped>
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
  border-radius: 25px;
}

.galleria-content {
  float: left;
  padding-right: 1rem;
  max-width: 30dvw;
  width: 100%;
  margin-bottom: 1rem;
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

/* Collections related */
.wallet-controls {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.wallet-control-button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  padding: 10px;
}

.collection {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.collection-title {
  cursor: pointer;
}

.collection:hover {
  transform: translateY(-5px);
}

.collection-images {
  display: flex;
  cursor: pointer;
}

.image {
  background-size: cover;
  background-position: center;
}

.primary {
  flex: 1;
  height: 10rem;
}

.side-images {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.image.secondary {
  flex: 1;
}

.placeholder {
  background-color: #ccc;
  height: 100%;
}

.collection-info {
  padding: 15px;
}

.collection-title {
  font-size: 1.2rem;
  margin: 0;
  color: #333;
}

.collection-details {
  font-size: 0.9rem;
  color: #666;
}

@media (max-width: 1200px) {
  .collections-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .collections-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .collections-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .collection {
    min-width: 45dvw;
  }
}

@media (max-width: 468px) {
  .collections-grid {
    grid-template-columns: repeat(1, 1fr);
  }

  .collection {
    min-width: 90dvw;
  }
}

@media (max-width: 764px) {
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