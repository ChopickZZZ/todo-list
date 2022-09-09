import { createApp } from 'vue'
import { createPinia } from 'pinia'
import focus from './plugins/focus'
import clickOutside from './plugins/clickOutside'
import App from './App.vue'
import './style.scss'

createApp(App)
	.use(createPinia())
	.use(focus)
	.use(clickOutside)
	.mount('#app')
