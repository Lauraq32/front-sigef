<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer fluid class="p-1">
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
  <SessionManager/>
  <ToastStack />
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import ToastStack from '@/components/ToastStack.vue'
import SessionManager from '@/components/SessionManager.vue'

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
    ToastStack,
    SessionManager
  },
}
</script>
