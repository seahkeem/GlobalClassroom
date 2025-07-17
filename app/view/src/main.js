import './assets/main.css'
// import 'primeicons/primeicons.css'
import '../node_modules/primeicons/primeicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-purple/theme.css'
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import VueTypes from 'vue-types';

import Button from "primevue/button"
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import FloatLabel from 'primevue/floatlabel';
import Card from 'primevue/card';
import Footer from './components/Footer.vue';
import TopBarFT from './components/topBarFirstTime.vue';
import TopBar from './components/TopBar.vue';
import History from './components/History.vue';
import Steps from 'primevue/steps';
import InputMask from 'primevue/inputmask';
import Stepper from 'primevue/stepper';
import StepperPanel from 'primevue/stepperpanel';
import Chips from 'primevue/chips';
import Calendar from 'primevue/calendar';
import Divider from 'primevue/divider';
import ScrollPanel from 'primevue/scrollpanel';
import Navbar from './components/Navbar.vue';
import SpeedDial from 'primevue/speeddial';
import Dialog from 'primevue/dialog';
import ToggleButton from 'primevue/togglebutton';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import Sidebar from 'primevue/sidebar';
import Galleria from 'primevue/galleria';
import Avatar from 'primevue/avatar';
import Checkbox from 'primevue/checkbox';
import AddPost from './components/AddPost.vue';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import ProgressSpinner from 'primevue/progressspinner';

const app = createApp(App)

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dropdown', Dropdown);
app.component('FloatLabel', FloatLabel);
app.component('Card', Card);
app.component('Footer', Footer);
app.component('TopBarFT', TopBarFT);
app.component('Steps', Steps);
app.component('Stepper', Stepper);
app.component('StepperPanel', StepperPanel);
app.component('InputMask', InputMask);
app.component('Chips', Chips);
app.component('Calendar', Calendar);
app.component('Divider', Divider);
app.component('ScrollPanel', ScrollPanel);
app.component('Navbar', Navbar);
app.component('SpeedDial', SpeedDial);
app.component('Dialog', Dialog);
app.component('ToggleButton', ToggleButton);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Toast', Toast);
app.component('TopBar', TopBar);
app.component('Sidebar', Sidebar);
app.component('Galleria', Galleria);
app.component('Avatar', Avatar);
app.component('Checkbox', Checkbox);
app.component('AddPost', AddPost);
app.component('TabView', TabView);
app.component('TabPanel', TabPanel);
app.component('History', History);
app.component('ProgressSpinner ', ProgressSpinner );

app.use(router)
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);

app.mount('#app')