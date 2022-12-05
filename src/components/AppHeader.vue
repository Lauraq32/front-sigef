<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid style="height: 110px">
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <CNavItem>
          <h2>{{ ayuntamiento }}</h2>
          <CNavLink></CNavLink>
        </CNavItem>
       
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CNavLink>
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>
            <CIcon class="mx-2" icon="cil-list" size="lg" />
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink>
            <CIcon class="mx-2" icon="cil-envelope-open" size="lg" />
          </CNavLink>
        </CNavItem>

        <AppHeaderDropdownAccnt />
        <CNavItem>
          <CNavLink>
            <CNavItem>
              <CIcon class="mx-1" icon="cil-account-logout" size="lg" />
            </CNavItem>
          </CNavLink>
        </CNavItem>
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
import { logo } from '@/assets/brand/logo'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
    AppHeaderDropdownAccnt,
  },
  setup() {
    const ayuntamiento = localStorage.getItem('nombre_ayuntamiento')
    const NoHallado = (ayuntamiento) => {
      if (ayuntamiento === 'null') return 'No encontrado'
    }
    return {
      logo,
      ayuntamiento,
      NoHallado,
    }
  },
}
</script>
