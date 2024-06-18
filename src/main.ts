import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { pinia } from './store' // Importa la instancia de Pinia desde `stores/index.ts`
import 'swiper/swiper-bundle.css'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
