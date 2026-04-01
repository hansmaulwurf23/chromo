import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SvgIcon from "vue3-icon"
import App from './App.vue'
import router from "@/router";

const app = createApp(App)
app.component("svg-icon", SvgIcon);
app.use(router)
app.use(createPinia())
app.mount('#app')
