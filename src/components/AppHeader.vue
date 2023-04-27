<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid style="height: 110px">
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="d-md-flex me-auto align-items-center">
        <CNavItem style="font-size: 20px">
          <img
            style="width: 60px"
            :src="
              !url
                ? 'https://media.istockphoto.com/id/874179328/es/vector/rep%C3%BAblica-dominicana.jpg?s=612x612&w=0&k=20&c=f5hftAqUGumB63g_FJL6gazxw41Ks0MTxNhTfl453XY='
                : url
            "
          />
        </CNavItem>
        <CNavItem>
          <h4 style="margin-left: 15px">
            {{ ayuntamiento }}
          </h4>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <AppHeaderDropdownAccnt />
      </CHeaderNav>
    </CContainer>
    <CHeaderDivider />
    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import AppHeaderDropdownAccnt from './AppHeaderDropdownAccnt'
import { useAuthStore } from '@/store/AuthStore'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    const authStore = useAuthStore()
    const ayuntamiento = authStore.authInfo.user.ayuntamiento.descripcion
    const userName = authStore.authInfo.user.email
    const NoHallado = (ayuntamiento) => {
      if (ayuntamiento === 'null') return 'No encontrado'
    }

    const url = localStorage.getItem('image')
    return {
      ayuntamiento,
      NoHallado,
      url,
      userName,
    }
    
  },

  mounted() {},
}
</script>
