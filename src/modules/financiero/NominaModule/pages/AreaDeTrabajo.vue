<template>
  <areaDeTrabajo :isNomina="true" />
</template>

<script>
import areaDeTrabajo from '@/modules/rrhh/RegistroPersonal/components/AreaTrabajo.vue'

export default {
  name: 'areaTrabajoNomina',
  components: {
    areaDeTrabajo,
  },
}
</script>
