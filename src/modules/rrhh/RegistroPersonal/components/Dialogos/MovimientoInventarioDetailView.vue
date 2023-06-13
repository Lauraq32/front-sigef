<template>
  <CModal :visible="showMovimientoDetailModal" backdrop="static"
    @close="() => { closeModal() }">
    <CModalHeader>
      <CModalTitle>Detalle de &Uacute;til laboral</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <MovimientoUtilTable
          :utiles="utilList"
        />
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" data-bs-dismiss="modal" @click="closeModal">
        Cerrar
      </CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { CModalFooter } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import MovimientoUtilTable from '../tables/MovimientoUtilTable.vue'

export default {
  name: 'MovimientoInventarioDetailView',
  components: {
    CModal,
    CModalFooter,
    MovimientoUtilTable,
  },
  emits: ['close-modal'],
  methods: {
    closeModal() {
      this.$emit('close-modal');
    }
  },

  props: {
    utilList: Array,
    showMovimientoDetailModal: Boolean
  },
}
</script>
