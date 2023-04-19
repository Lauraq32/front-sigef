import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsCallout from '@/components/DocsCallout'
import DocsExample from '@/components/DocsExample'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'
import VueNumberFormat from 'vue-number-format'
import { createPinia } from 'pinia';
import { loggedInfo } from "./utils/login-info-plugin";
import Vidle from 'v-idle-3'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";


const pinia = createPinia()
const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(pinia)
app.use(loggedInfo);
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('v-select', vSelect)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.use(VueSweetalert2)
app.use(SimpleTypeahead)
app.use(VueNumberFormat)
app.use(Vidle)

app.mount('#app')
