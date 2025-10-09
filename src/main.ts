import { createApp } from 'vue';
// import './style.css';
import App from './App.vue';
import 'gridstack/dist/gridstack.min.css';
import {createPinia} from "pinia";

const app = createApp(App)
app.use(createPinia());
app.mount('#app');
