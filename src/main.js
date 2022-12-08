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
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBpA9qEEBOCRCuZXPVA4wk5nYWZeuHkEoY",
  authDomain: "sigefmunicipal-e0d77.firebaseapp.com",
  projectId: "sigefmunicipal-e0d77",
  storageBucket: "sigefmunicipal-e0d77.appspot.com",
  messagingSenderId: "886633955815",
  appId: "1:886633955815:web:12a23effd11c360a72bd42"
};


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
app.use = initializeApp(firebaseConfig);

app.mount('#app')
