<template>
  <CModal @close="closeModal" size="md" :visible="showModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Configuracion Nomina (RETENCION)</CModalTitle>
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
              v-model="payload.retencion.nombre"
              type="text"
              required
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="12">
            <CFormLabel for="validationCustom05"
              >Categoria de Retención</CFormLabel
            >
            <CFormSelect
              required
              v-model="payload.retencion.categoriaRetencion"
            >
              <option>Institucional</option>
              <option>Ley</option>
            </CFormSelect>

            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="12">
            <CFormLabel for="validationCustomUsername"
              >Codigo Ejecucion Presupuesto Gasto</CFormLabel
            >
            <CFormInput
              v-model="payload.retencion.codigoEjecucionPresupuestoGasto"
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


export default {
  name: 'AddIngresosRetencion',
  components: {
    CSmartTable,
    CModal,
  },

  data: function () {
    return {
      ingresoRetencionFormValidated: false,
    }
  },

  methods: {
    saveConfiguracionNomina() {
      this.ingresoRetencionFormValidated = false
      if (this.$refs.formRef.$el.checkValidity()) {
        this.$emit('addRetencion', { ...this.payload.retencion })
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
