<template>
  <div class="gray-background">
    <TopBarFT></TopBarFT>
    <div class="centered">
      <Stepper linear>
        <!-- Step 1 -->
        <StepperPanel>
          <!-- Step 1 Header -->
          <template #header>
            <Button>
              <i class="pi pi-user" />
            </Button>
          </template>
          <!-- Step 1 Content -->
          <template #content="{ nextCallback }">
            <div class="space">
              <CVProcessStep1 @update:firstName="updateFirstName" @update:lastName="updateLastName"
                @update:phone="updatePhone" @update:email="updateEmail" @update:country="updateCountry"
                :selectedCountry="selectedCountry"></CVProcessStep1>
            </div>
            <div class="buttons">
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
            </div>
          </template>
        </StepperPanel>

        <!-- Step 2 -->
        <StepperPanel>
          <!-- Step 2 Header -->
          <template #header>
            <Button>
              <i class="pi pi-palette" />
            </Button>
          </template>
          <!-- Step 2 Content -->
          <template #content="{ prevCallback, nextCallback }">
            <div class="space">
              <CVProcessStep2 @update:selectedColor="logCubeColor"></CVProcessStep2>
            </div>
            <div class="buttons">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
            </div>
          </template>
        </StepperPanel>

        <!-- Step 3 -->
        <StepperPanel>
          <!-- Step 3 Header -->
          <template #header>
            <Button>
              <i class="pi pi-star" />
            </Button>
          </template>
          <!-- Step 3 Content -->
          <template #content="{ prevCallback, nextCallback }">
            <div class="space">
              <CVProcessStep3 @update:mbti="updateMBTI" :selectedPersonality="selectedPersonality"
                @update:aboutYou="updateAbout"></CVProcessStep3>
            </div>
            <div class="buttons">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="nextCallback" />
            </div>
          </template>
        </StepperPanel>

        <!-- Step 4 -->
        <StepperPanel>
          <!-- Step 4 Header -->
          <template #header>
            <Button>
              <i class="pi pi-video" />
            </Button>
          </template>
          <!-- Step 4 Content -->
          <template #content="{ prevCallback }">
            <div class="space">
              <CVProcessStep4 @videoUploaded="handleVideoData"></CVProcessStep4>
            </div>
            <div class="buttons">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="prevCallback" />
              <Button label="Complete" @click="completeCV"></Button>
            </div>
          </template>
        </StepperPanel>

      </Stepper>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CVProcessStep1 from '@/components/CVProcessStep1.vue';
import CVProcessStep2 from '@/components/CVProcessStep2.vue';
import CVProcessStep3 from '@/components/CVProcessStep3.vue';
import CVProcessStep4 from '@/components/CVProcessStep4.vue';

export default {
  setup() {
    const router = useRouter();

    // Define your reactive data properties
    const firstName = ref("");
    const lastName = ref("");
    const phone = ref("");
    const email = ref("");
    const selectedCountry = ref("");
    const selectedColor = ref(null);
    const selectedPersonality = ref("");
    const about = ref("");
    const videoData = ref("");

    // Define methods to update the reactive data properties
    const updateFirstName = (value) => { firstName.value = value; };
    const updateLastName = (value) => { lastName.value = value; };
    const updatePhone = (value) => { phone.value = value; };
    const updateEmail = (value) => { email.value = value; };
    const updateCountry = (value) => { selectedCountry.value = value; };
    const logCubeColor = (color) => { selectedColor.value = color; };
    const updateMBTI = (value) => { selectedPersonality.value = value; };
    const updateAbout = (value) => { about.value = value; };
    const handleVideoData = (videoUrl) => {
      videoData.value = videoUrl;
      console.log("Received video URL:", videoData.value);
    };

    // Method to send data to the server
    const sendDataToDatabase = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from local storage
        if (!token) {
          throw new Error('No token found');
        }

        const formData = {
          cv_firstname: firstName.value,
          cv_lastname: lastName.value,
          cv_phonenumber: phone.value,
          cv_email: email.value,
          cv_country: selectedCountry.value,
          cv_colour: selectedColor.value,
          cv_mbti: selectedPersonality.value,
          cv_about: about.value,
          cv_video: videoData.value,
          // profile_email: email.value // Include profile_email in the form data
        };

        const response = await fetch('/cvprocess', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send data to server');
        }

        router.push({ name: 'CVComplete' });
      } catch (error) {
        console.error('Error sending data to server:', error);
      }
    };

    // Method to complete the CV process
    const completeCV = async () => {
      try {
        await sendDataToDatabase();
      } catch (error) {
        console.error('Error while completing CV:', error);
      }
    };

    // Return the reactive data properties and methods
    return {
      firstName,
      lastName,
      phone,
      email,
      selectedCountry,
      selectedColor,
      updateFirstName,
      updateLastName,
      updatePhone,
      updateEmail,
      updateCountry,
      handleVideoData,
      logCubeColor,
      selectedPersonality,
      about,
      videoData,
      updateMBTI,
      updateAbout,
      completeCV,
    }
  },
  components: {
    CVProcessStep1,
    CVProcessStep2,
    CVProcessStep3,
    CVProcessStep4,
  }
}
</script>

<style scoped>
.gray-background {
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 20dvw;
  padding-right: 20dvw;
  background-color: #ededed98;
  background-image: url('@/assets/Pastel_9.png');
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.space {
  padding: 1rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

:deep .p-stepper .p-stepper-panels {
  width: 100dvh;
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.703);
  border-radius: 30px;
}

.p-button {
  background-image: linear-gradient(to right, #B993D6 0%, #8CA6DB 51%, #B993D6 100%);
  margin: 10px;
  padding: 15px 35px;
  background-size: 200% auto;
  color: white;
  border-radius: 50px;
}

@media only screen and (max-width: 1200px) {
  .p-stepper .p-stepper-panels {
    width: 75%;
    padding: 1rem;
  }
}

@media only screen and (max-width: 768px) {
  :deep .p-stepper .p-stepper-panels {
    width: 100%;
    padding: 1rem;
  }

  .p-button {
    margin: 5px;
    padding: 15px 15px;
  }

  .centered {
    align-items: normal;
  }

  .gray-background {
    padding-left: 0dvw;
    padding-right: 0dvw;
  }
}
</style>
