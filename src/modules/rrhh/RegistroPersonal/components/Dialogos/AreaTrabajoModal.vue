<template>
  <CModal v-if="!isNomina" size="sm" @close="closeModal" :visible="newAreaTrabajoModal" backdrop="static" style="width: 25%">
    <CModalHeader>
      <CModalTitle>Área de trabajo</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="areaTrabajoValidated" ref="formRef">
          <CCol :md="12">
            <CFormLabel for="validationCustom04">Área de trabajo</CFormLabel>
            <CFormInput required v-model="areaTrabajoObject.descripcion" id="validationCustom04">
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </CForm>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" data-bs-dismiss="modal" @click="closeModal">
        Cerrar
      </CButton>
      <CButton color="primary" @click="saveAreaTrabajo"> Guardar </CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { CModalFooter, CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../../services/RegistroPersonalServices'

export default {
  name: 'AreaTrabajoModal',
  components: {
    CSmartTable,
    CModal,
    CModalFooter,
  },

  data: function () {
    return {
      areaTrabajoValidated: false,
      areaTrabajoObject: {
        descripcion: '',
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    saveAreaTrabajo() {
      this.areaTrabajoValidated = false
      if (this.$refs.formRef.$el.checkValidity()) {
        this.$emit('post-areaTrabajo', { ...this.areaTrabajoObject })
        this.clearForm()
        return
      }
      this.areaTrabajoValidated = true
    },
    clearForm() {
      this.areaTrabajoObject = {
        descripcion: '',
      }
    },
  },

  watch: {
    areaTrabajoId(newId) {
      if (newId) {
        Api.getAreaTrabajoById(newId)
          .then((response) => {
            this.areaTrabajoObject = response.data.data
          });
      }
    },
  },

  props: {
    newAreaTrabajoModal: Boolean,
    areaTrabajoId: Number,
    isNomina: Boolean
  },
}
</script>
