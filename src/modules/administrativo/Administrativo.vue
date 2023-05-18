<template>
  <CContainer md>
    <CRow class="px-4 gap-3 justify-content-center align-items-center">
      <CCol
        md="3"
        xs="12"
        v-for="child of children"
      >
        <CCard
          class="clickable-card"
          @click="navigateTo(child)"
        >
          <CCardHeader
            :style="{ 'background-color': child.meta.color }"
            class="px-4 text-white d-flex justify-content-center align-items-stretch"
          >
            <CIcon
              :icon="child.meta.icon"
              :size="child.meta.size"
            />
          </CCardHeader>
          <CCardTitle
            class="text-center text-dark p-2">
            {{ child.meta.label }}
          </CCardTitle>
        </CCard>
      </CCol>
    </CRow>
  </CContainer>
</template>
<script>
import { CIcon } from '@coreui/icons-vue';
import router from './router';

export default {
  components: {
    CIcon
  },
  setup() {
    return {
      children: router.children.slice(1)
    }
  },
  methods: {
    navigateTo(child) {
      if (child.component) {
        this.$router.push({ name: child.name })
      }
    }
  }
}
</script>
<style>
.clickable-card {
  cursor: pointer;
}
</style>
