import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import store from "./store/inedx"

import "./index.css";

const app = createApp(App)
// const pinia = createPinia()

app.use(store)
app.use(router)
app.mount('#app')

