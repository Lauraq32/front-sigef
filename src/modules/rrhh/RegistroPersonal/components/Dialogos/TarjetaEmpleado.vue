<template>
  <CModal
    :visible="newTarjetaEmpleadoModal"
    backdrop="static"
    style="width: 25%"
  >
    <CModalHeader :close-button="false">
      <CModalTitle>{{ empleado?.nombre }}</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <label class="d-block">
          <span class="fw-bold"> Cargo: </span>
          <span>
            {{ empleado?.posicion?.nombre }}
          </span>
        </label>
        <label class="d-block">
          <span class="fw-bold"> Departamento: </span>
          <span>{{ empleado?.departamento?.nombre }}</span></label
        >
        <div class="mt-4">
          <img style="max-width: 100%" :src="imageUrl" alt="imagen Empleado" />
        </div>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" data-bs-dismiss="modal" @click="closeModal">
        Cerrar
      </CButton>
      <CButton color="primary" @click="goToTarjetaEmpleado">
        Tarjeta Empleado
      </CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { CModalFooter, CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'

export default {
  name: 'TarjetaEmpleadoDialogs',
  components: {
    CSmartTable,
    CModal,
    CModalFooter,
  },

  data: function () {
    return {
      imageUrl: '',
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    goToTarjetaEmpleado() {
      window.open(`/#/pages/empleados/${this.empleado.id}`, '_blank').focus()
    },
  },

  watch: {
    empleado(obj) {
      this.imageUrl = `${process.env.VUE_APP_API_URL}/api/files/public/${
        obj?.idImagenPerfil ?? -1
      }`
    },
  },

  props: {
    newTarjetaEmpleadoModal: Boolean,
    empleado: Object,
  },
}
</script>
