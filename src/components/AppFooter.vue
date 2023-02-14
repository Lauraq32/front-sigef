<template>
  <CFooter>
    <div>
      <a href="https://lmd.gob.do/sigef-municipal/" target="_blank">SIGEF MUNICIPAL</a>
      <span class="ms-1"
        >&copy; {{ new Date().getFullYear() }}</span
      >
    </div>
    <div class="ms-auto">
      
      <img height="75" src="../assets/images/LogoLiga.png" alt="">
    </div>
    <div class="ms-auto">
      <span class="me-1" target="_blank">Powered by</span>
      <a href="https://lmd.gob.do/"  target="_blank">LIGA MUNICIPAL DOMINICANA</a>
    </div>
  </CFooter>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>