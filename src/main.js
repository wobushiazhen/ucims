import { createApp } from 'vue'
import store from '@/stores'

import App from './App.vue'
import router from './router'

import './assets/base.css'
import 'normalize.css'
import '@/assets/font-icon/iconfont.css'

//持久化

const app = createApp(App)
app.use(store)

app.use(router)

app.mount('#app')
