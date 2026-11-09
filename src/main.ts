import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import './assets/styles/tokens.css'
import './assets/styles/base.css'
import './assets/styles/typography.css'
import './assets/styles/utilities.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const head = createHead()

app.use(router)
app.use(head)

app.mount('#app')
