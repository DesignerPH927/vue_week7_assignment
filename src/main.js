// npm 安裝套件
// 1. bootstrap √
// 2. animate.css √
// 3. fontawesome √ (無須install只要將 css、webfonts資料夾存入 assets內即可)
// 4. sweetallert2 √
// 5. axios √
// 6. vue-axios √
// 7. vue-loading-overlay v
// 8. vee-validate v
// 9. mitt v
// 10. CKeditor v
// 11. pinia v

// 將套件一一匯入 並 啟用 插件或元件
// Only import :
// 1. bootstrap v
// 2. animate.css v
// 3. fontawesome v
// 4. mitt v
// import and plugin
// 1 sweetalert2 v
// 2. axios v
// 3. vue-axios v
// 4. CKeditor v
// 5. pinia
// import and component
// 1. vue-loading-overlay
// 2. vee-validate

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// bootstrap
import '@/assets/all.scss'
// animate.css
import 'animate.css'
// fontawesome
import '@/assets/fontawesome/css/all.css'
// sweetalert2
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
// axios
import axios from 'axios'
// vue-axios
import VueAxios from 'vue-axios'
// ckeditor
import CKEditor from '@ckeditor/ckeditor5-vue'
// vue-loading-overlay
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
// vee-validate
import {
  Field, Form, ErrorMessage, defineRule, configure
} from 'vee-validate'
import AllRules from '@vee-validate/rules'
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'
import App from './App.vue'
import router from './router'
import { date, currency } from '@/methods/filters'

Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule])
})
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
})

setLocale('zh_TW')

const pinia = createPinia()
const app = createApp(App)
app.config.globalProperties.$filters = {
  date,
  currency
}
app.component('VueLoading', Loading)
app.component('VueForm', Form)
app.component('VueField', Field)
app.component('ErrorMessage', ErrorMessage)

app.use(pinia)
app.use(VueAxios, axios)
app.use(VueSweetalert2)
app.use(CKEditor)
app.use(router)
app.mount('#app')
