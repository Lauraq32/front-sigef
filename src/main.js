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
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyBCY4JHXUrKZXfa1GWF68WOSJFTiPsQADU',
  authDomain: 'sigef-522f9.firebaseapp.com',
  projectId: 'sigef-522f9',
  storageBucket: 'sigef-522f9.appspot.com',
  messagingSenderId: '598584810015',
  appId: '1:598584810015:web:ef595086e43ffb9850132a',
}

const pinia = createPinia()
const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(pinia)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsCallout', DocsCallout)
app.component('DocsExample', DocsExample)
app.use(VueSweetalert2)
app.use(SimpleTypeahead)
app.use(VueNumberFormat, { prefix: '', decimal: '.', thousand: ',' })
app.use = initializeApp(firebaseConfig)

app.mount('#app')
