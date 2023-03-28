<template>
  <h3 class="text-center">Capturas de Documentos Anexados</h3>

  <div class="d-inline p-2">
      <CButton color="info" @click="
        () => {
        lgDemo = true
        }
      ">Agregar</CButton>
      </div>

  <CModal size="xl" :visible="lgDemo" @close="
    () => {
      lgDemo = false
    }
  ">
    <CModalHeader>
      <CModalTitle>Formulario de empleados</CModalTitle>
    </CModalHeader>
</CModal>


</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
export default {
  CSmartTable,
  CModal,
}
</script>
