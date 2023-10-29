import './assets/main.css'
import '@/style/common.less'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia.use(persist))
app.use(router)

app.mount('#app')
