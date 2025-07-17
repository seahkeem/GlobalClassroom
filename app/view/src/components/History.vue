<template>
    <div class="history-page">
        <div v-for="post in posts" :key="post.id" class="post-panel">
            <div class="post-header">
                <div>
                    <h4>{{ post.title }}</h4>
                    <h5>{{ post.date }}</h5>
                </div>
                <div>
                    <Button type="button" icon="pi pi-times"
                        style="background-color: transparent; border: none; color: black;"></Button>
                </div>

            </div>
            <hr class="divider" />
        </div>
    </div>
</template>

<style scoped>
.history-page {
    padding: 20px;
}

.post-panel {
    margin-bottom: 20px;
}

.post-header {
    width: 50dvw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.divider {
    border-top: 1px solid #ccc;
    margin-top: 10px;
}

@media (max-width: 766px) {
    .post-header {
        width: 90dvw;
    }
}
</style>

<script setup>
import { ref } from 'vue'

// Test Data The images should come from db
import cat3 from '@/assets/cat3.jpg';
import cat1 from '@/assets/cat5.jpeg';
import garden1 from '@/assets/garden1.jpg';
import garden2 from '@/assets/garden2.jpg';
import video from '@/assets/vid1.mov';
import video2 from "@/assets/vid2.mov";

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
            "If you're in need of a versatile software developer who is ready to tackle challenges and make a positive impact, please don’t hesitate to contact me. Together, we can drive the future of technology.<br>", video: video,
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
</script>
