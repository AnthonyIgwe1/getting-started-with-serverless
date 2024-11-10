import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'

axios.defaults.baseURL = " https://rt1tdvcy37.execute-api.us-east-1.amazonaws.com/v1/"

createApp(App).use(router).mount('#app')
