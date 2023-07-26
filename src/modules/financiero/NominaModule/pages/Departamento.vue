<template>
  <departamento :isNomina="true" />
</template>

<script>
import departamento from '@/modules/rrhh/RegistroPersonal/components/Departamentos.vue'

export default {
  name: 'departamentoNomina',
  components: {
    departamento,
  },
}
</script>
