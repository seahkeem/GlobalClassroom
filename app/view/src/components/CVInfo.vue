<template>
    <div class="wrapper">
        <div class="header-container">
            <div>
                <h1>{{ username }}</h1>
                <h4 class="mbti">{{ mbti }}</h4>
            </div>
            <div class="speedDial">
                <SpeedDial :model="items" direction="down" showIcon="pi pi-ellipsis-v" hideIcon="pi pi-ellipsis-h" :tooltipOptions="{ position: 'left' }" />
            </div>
        </div>
    </div>
    <div class="video-container">
        <Video :videomp4="videoUrl"></Video>
    </div>
    <div class="work-experience-container">
        <h1>About me</h1>
        <ScrollPanel class="scroll-panel">
            {{ aboutMe }}
        </ScrollPanel>
    </div>
    <div class="work-experience-container">
        <h1>Work Experience</h1>
        <ScrollPanel class="scroll-panel">
            {{ workExperience }}
        </ScrollPanel>
    </div>

    <!-- Share CV Popup -->
    <Dialog v-model:visible="sharingDialogue" modal header="Share CV" :style="{ width: '25rem' }">
        <div class="center">
            <!-- qr code needs to be generated -->
            <img src="/src/assets/qr_placeholder.png" alt="QR Code" />
            <br> <br>
            <!-- @click the button should open sharing options -->
            <Button type="button" label="Share Link" severity="primary"></Button>
            <br>
        </div>
    </Dialog>
    <!-- Privacy Popup -->
    <Dialog v-model:visible="privacyDialogue" modal header="CV Privacy" :style="{ width: '25rem' }">
        <div class="center">
            <ToggleButton v-model="privacyChecked" onLabel="Private" offLabel="Public" onIcon="pi pi-lock"
                offIcon="pi pi-lock-open" class="w-9rem" aria-label="Do you confirm" />
        </div>
    </Dialog>
    
    <!-- Delete Popup -->
    <ConfirmDialog></ConfirmDialog>


</template>

<script setup>
import { ref } from 'vue';
import WorkExperience from '@/components/WorkExp.vue';
import Video from '@/components/Video.vue';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { jwtDecode } from 'jwt-decode'; 

const confirm = useConfirm();
const toast = useToast();

// the actual data needs to come from the db (from whatever the user put in the CV Process)
const aboutMe = `Hi there! I'm Joe, a proud resident of the stunning landscapes of Kerry, where the rolling green hills inspire my passion for farming. With roots deeply embedded in this rich agricultural region, I find joy in cultivating the land and nurturing life from seed to harvest. Whether it's tending to crops or caring for livestock, there's an undeniable connection to the earth that fuels my spirit. When I'm not knee-deep in soil, you'll likely find me exploring the countryside or sharing stories over a cup of tea. Farming isn't just a livelihood for me; it's a way of life that I cherish every day.`;
const workExperience = "Ever since I was knee-high, I've been mucking about in the dirt and loving every minute of it. Started out at Flynn's Orchards – just a stone's throw away from home in Wicklow. I got real good at figuring out what those apple and pear trees needed to thrive. Picking fruit at dawn, that's the kind of thing that teaches you to wait for the right moment. Next up was Green Hill Dairy. Not just your average farm, but a place that really cared about doing things right and kind. Got my hands dirty with the cows, learned the dance of the milking routine, and all about keeping the fields green and happy. Then there was a stint at Willow Creek, working with a bunch of smart folks trying to fix up tired old fields using nature's playbook. We did everything – mixing up what we planted, giving the land a break, and bringing back birds and bugs. Lately, I've been running the show at Harvest Bounty. It's a big veggie farm where every day is about getting those plants from tiny seeds to someone's dinner plate. It's a lot to keep track of, but I wouldn't have it any other way. ";

// should be videoURL from postgres db
const videoUrl = "https://firebasestorage.googleapis.com/v0/b/ucvme-131a0.appspot.com/o/videos%2FIMG_6426.mov?alt=media&token=3edfbcb4-cb57-4d5b-bc45-4c52a04b3502"
var username = 'username'; // Placeholder username
var mbti = 'INTP - Logician';

const token = localStorage.getItem('token');
var decoded = jwtDecode(token).username;

if (token && decoded) {
  decoded = toTitleCase(decoded);
  username = decoded;
}

function toTitleCase(str) {
  return str.replace(/\b(\w)/g, function(match, capture) {
    return capture.toUpperCase();
  });
}

//SpeedDial menu 
const sharingDialogue = ref(false);

const privacyDialogue = ref(false);
const privacyChecked = ref(false);

const deleteCV = () => {
    confirm.require({
        message: 'Do you want to delete your CV?',
        header: 'Danger Zone',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        rejectClass: 'p-button-secondary p-button-outlined',
        acceptClass: 'p-button-danger',
        accept: () => {
            toast.add({ severity: 'info', summary: 'Confirmed', detail: 'CV deleted', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};
const items = ref([
    {
        label: 'Edit CV',
        icon: 'pi pi-file-edit',
        command: () => {
            //edit cv menu opens
        }
    },
    {
        label: 'Share CV',
        icon: 'pi pi-share-alt',
        command: () => {
            sharingDialogue.value = true;
        }
    },
    {
        label: 'Privacy',
        icon: 'pi pi-lock',
        command: () => {
            privacyDialogue.value = true;
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            deleteCV();
        }
    },

])

</script>

<style lang="scss" scoped>
.wrapper{
    padding-left: 2rem;
    padding-right: 2rem;
    padding: 1rem;
}
.center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  padding-left: 0; /* Adjust this value as needed to align to the red line */
}

.mbti {
  margin-top: 0.5rem; /* Add space between the username and mbti */
}

.speedDial {
  margin-left: auto; /* This pushes the SpeedDial to the right */
}

.video-container {
    padding-top: 1rem;
}


.work-experience-container {
    padding: 2.5rem;
    border-radius:  25px 25px 25px 25px;
    background-color: #e3e3e367; //should be decided based on the colour the user picked
    margin-bottom: 1rem;
    margin-top: 1rem;
}

.scroll-panel {
    padding: 0.5rem;
    width: 100%;
    max-height: 50dvh;
    overflow: auto;
}

.scroll-panel::-webkit-scrollbar {
    width: 8px;
}

.scroll-panel::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    background-clip: padding-box;
    border: 2px solid transparent;
}

.scroll-panel::-webkit-scrollbar-track {
    background-color: #a8a8a8;
}

:deep(.p-speeddial-button) {
    background-color: #fbeee000;
    color: black;
    border-color: transparent;
}

:deep(.p-speeddial-action) {
    background-color: #ffffff;
}

@media (max-width: 767px) {

    .header-container {
        display: flex;
        flex-direction: column; /* Stack vertically */
        align-items: center; /* Center items horizontally */
        padding: 1rem;
        text-align: center; /* Align the text to the center for all child elements */
    }

    .mbti {
        margin-top: 0.5rem; /* Add space between the username and mbti */
    }

    .video-container {
        padding-top: 0rem;
        padding-bottom: 0.1rem;
        min-width: 90dvw;
    }

    :deep(.p-card .p-card-body) {
        padding: 0rem;
    }

    .work-experience-container {
        padding: 1.5rem;
    }

    .scroll-panel {
        width: 100%;
        max-height: 30dvh;
    }

}
</style>
