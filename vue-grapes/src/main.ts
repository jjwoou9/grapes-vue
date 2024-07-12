import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import router from './router'
import App from './App.vue'
// import './assets/index.css'
// import '@/assets/main.css';

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n({
    // i18n 옵션 설정
})

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
