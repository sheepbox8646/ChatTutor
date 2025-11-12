import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'virtual:uno.css'
import router from './router'
import '@dsl/theme-default/styles/main.css'
import '@dsl/form'
import '@dsl/widget'
import '@dsl/canvas'
import '@dsl/math'
import { block } from '@dsl/layout'
import { registerPrefab } from '@dsl/renderer-core'

registerPrefab('block', block)


createApp(App).use(router).mount('#app')
