<template>
  <CModal @close="closeModal" size="md" :visible="showModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Configuracion Nomina (INGRESO)</CModalTitle>
      
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="ingresoRetencionFormValidated"
          ref="formRef"
        >
          <CCol :md="12">
            <CFormLabel for="validationCustomUsername">Nombre</CFormLabel>
            <CFormInput
              v-on:keypress="onlyLetter"
              v-model="payload.tipoIngreso.nombre"
              type="text"
              required
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeModal"
            >
              Cerrar
            </button>
            <button
              class="btn btn-info btn-block mt-1"
              @click="saveConfiguracionNomina"
            >
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { onlyLetter } from '@/utils/validator'

export default {
  name: 'AddIngresos',
  components: {
    CSmartTable,
    CModal,
  },

  data: function () {
    return {
      onlyLetter,
      ingresoRetencionFormValidated: false,
    }
  },

  methods: {
    saveConfiguracionNomina() {
      this.ingresoRetencionFormValidated = false
      if (this.$refs.formRef.$el.checkValidity()) {
        this.$emit('addIngreso', { ...this.payload.tipoIngreso })
        return
      }
      this.ingresoRetencionFormValidated = true
    },

    closeModal() {
      this.$emit('close-modal', false)
      this.clearModal()
    },
    clearModal() {
      this.ingresoRetencionFormValidated = false
    },
  },

  props: {
    showModal: Boolean,
    payload: Object,
  },
}
</script>
