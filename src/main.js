import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

// 使用繁體中文語言包
import locale from 'element-plus/lib/locale/lang/zh-tw'

import router from './router'
import store from './store'

import 'app-plugin/assets/fonts/icomoon/style.css'
import 'app-plugin/assets/fonts/el-icon/style.css'
import '@css/style.sass'

const app = createApp(App)

// 引入 element-plus 的 icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router).use(store).use(ElementPlus, { locale }).mount('#app')

import { createPanelComponent } from 'app-plugin/store/modules/panels'
createPanelComponent(app)