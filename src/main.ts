import './assets/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import SvgIcon from "vue3-icon"
import App from './App.vue'

const app = createApp(App)
app.component("svg-icon", SvgIcon);
app.use(createPinia())
app.mount('#app')
