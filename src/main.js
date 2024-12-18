import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/routes'
import './assets/styles.css'

createApp(App).use(router).mount('#app')
