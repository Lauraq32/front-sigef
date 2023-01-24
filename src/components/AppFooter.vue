<template>
  <CFooter>
    <div>
      <a href="https://coreui.io" target="_blank">SIGEF MUNICIPAL</a>
      <span class="ms-1"
        >&copy; {{ new Date().getFullYear() }} creativeLabs.</span
      >
    </div>
    <div class="ms-auto">
      
      <img height="75" src="../assets/images/LogoLiga.png" alt="">
    </div>
    <div class="ms-auto">
      <span class="me-1" target="_blank">Powered by</span>
      <a href="https://coreui.io/vue">LIGA MUNICIPAL DOMINICANA</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>