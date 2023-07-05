<template>
  <div>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light position-relative">
      <AppHeader />
      <div class="body flex-grow-1 px-3">
        <CContainer fluid class="p-1">
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
      <AppLoadingIndicator :isVisible="loadingStore.visible"/>
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
import AppLoadingIndicator from '@/components/AppLoadingIndicator.vue'
import { useLoadingStore } from '@/store/loading'
import { onRequestInterceptedCallback } from '@/Api/http-common';

export default {
  name: 'DefaultLayout',
  components: {
    AppFooter,
    AppHeader,
    AppSidebar,
    CContainer,
    ToastStack,
    SessionManager,
    AppLoadingIndicator
  },
  setup() {
    const loadingStore = useLoadingStore();

    return {
      loadingStore
    }
  },
  methods: {
    onRequestIntercepted(direction) {
      direction === "request"
        ? this.loadingStore.show()
        : this.loadingStore.hide();
    }
  },
  mounted() {
    onRequestInterceptedCallback(
      this.onRequestIntercepted.bind(this)
    );
  },
}
</script>
