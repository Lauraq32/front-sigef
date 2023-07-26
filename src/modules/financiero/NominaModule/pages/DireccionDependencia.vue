<template>
  <direccionDependencia :isNomina="true" />
</template>
  
<script>
import direccionDependencia from '@/modules/rrhh/RegistroPersonal/components/DireccionDependencia.vue'

export default {
  name: 'direccionDependenciaNomina',
  components: {
    direccionDependencia,
  },
}
</script>
  