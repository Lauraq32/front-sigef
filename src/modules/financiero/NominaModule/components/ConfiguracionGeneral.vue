<template>
  <h3 class="text-center">Configuración General</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            showModalImpuestoRentaAndFactorDivision = true
          }
        "
        >Configuración de Impuesto Sobre la Renta/ Factor de División.</CButton
      >
    </div>
  </div>

  <ModalImpuestoRentaAndFactorDivision
    :showModal="showModalImpuestoRentaAndFactorDivision"
    @close-modal="closeModal"
  />
</template>

<script>
import ModalImpuestoRentaAndFactorDivision from './dialogos/ModalSRentaAndFactorDivision.vue'

export default {
  components: {
    ModalImpuestoRentaAndFactorDivision,
  },
  data: function () {
    return {
      showModalImpuestoRentaAndFactorDivision: false,
    }
  },

  methods: {
    closeModal() {
      this.showModalImpuestoRentaAndFactorDivision = false
    },
  },
}
</script>
