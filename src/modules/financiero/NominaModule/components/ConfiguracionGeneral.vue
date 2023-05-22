<template>
  <h3 class="text-center">Configuración General</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            showAgregarFactorDivision = true
          }
        "
        >Agregar Factor de División.</CButton
      >
      <CButton
        color="info"
        @click="
          () => {
            showModalImpuestoRentaAndFactorDivision = true
          }
        "
        >Configuración de Impuesto Sobre la Renta/ Factor de División.</CButton
      >
      <CButton
        color="info"
        @click="
          () => {
            showModalIngresosRetenciones = true
          }
        "
        >Configuración Ingresos / Retenciones.</CButton
      >
    </div>
  </div>

  <ModalImpuestoRentaAndFactorDivision
    :showModal="showModalImpuestoRentaAndFactorDivision"
    @close-modal="closeModal"
  />

  <ModalIngresosAndRetenciones
    :showModal="showModalIngresosRetenciones"
    @close-modal="closeModal"
  />
  <ModalAgregarFactorDivision
    :showModal="showAgregarFactorDivision"
    @close-modal="closeModal"
  />
</template>

<script>
import ModalImpuestoRentaAndFactorDivision from './dialogos/ModalSRentaAndFactorDivision.vue'
import ModalIngresosAndRetenciones from './dialogos/ModalIngresosRetenciones.vue'
import ModalAgregarFactorDivision from './dialogos/ModalAgregarFactorDivision.vue'

export default {
  components: {
    ModalImpuestoRentaAndFactorDivision,
    ModalIngresosAndRetenciones,
    ModalAgregarFactorDivision,
  },
  data: function () {
    return {
      showModalImpuestoRentaAndFactorDivision: false,
      showModalIngresosRetenciones: false,
      showAgregarFactorDivision: false,
    }
  },

  methods: {
    closeModal() {
      this.showModalImpuestoRentaAndFactorDivision = false
      this.showModalIngresosRetenciones = false
      this.showAgregarFactorDivision = false
    },
  },
}
</script>
