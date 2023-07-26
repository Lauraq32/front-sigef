<template>
    <nominaEmpleado :isNomina="true" />
  </template>
  
  <script>
  import nominaEmpleado from '@/modules/rrhh/RegistroPersonal/components/RegistroPersonal.vue'
  
  export default {
    name: 'empleadoNomina',
    components: {
        nominaEmpleado,
    },
  }
  </script>
  