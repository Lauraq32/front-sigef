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

         <CNavItem style="font-size: 20px;margin-top: 15px;">
          <img style="width: 74px;" :src="url == 'null' ? 'https://media.istockphoto.com/id/874179328/es/vector/rep%C3%BAblica-dominicana.jpg?s=612x612&w=0&k=20&c=f5hftAqUGumB63g_FJL6gazxw41Ks0MTxNhTfl453XY=' : url" />
         
        </CNavItem>
       
        <CNavItem>
          <h4 style="margin-top: 40px; 
    margin-left: 15px;">{{ ayuntamiento }}</h4>

        </CNavItem>

        <CNavItem>
          <h4 style="margin-top: 40px; 
    margin-left: 15px;"><span style="font-weight: bold;">usuario:</span>  {{ usuario }}</h4>

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
    const usuario = localStorage.getItem('nombre_usuario')
    const NoHallado = (ayuntamiento) => {
      if (ayuntamiento === 'null') return 'No encontrado'
     
    }

    const url =  localStorage.getItem('image');
    return {
      logo,
      ayuntamiento,
      usuario,
      NoHallado,
      url
    }


  },

  mounted() {
    
  }
}
</script>
