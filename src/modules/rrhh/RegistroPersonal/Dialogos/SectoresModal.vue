<template>
  <CModal
    :visible="newSectorModal"
    backdrop="static"
    style="width: 25%"
  >
    <CModalHeader>
      <CModalTitle>Sectores</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="sectorFormValidated"
          ref="formRef"
        >
          <CCol :md="12">
            <CFormLabel for="validationCustom02">Sector</CFormLabel>
            <CFormInput
            type="text"
              v-model="sectorObject.nombre"
              id="validationCustom02"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </CForm>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        data-bs-dismiss="modal"
        @click="closeModal"
      >
        Cerrar
      </CButton>
      <CButton 
        color="primary" @click="saveSector">
        Guardar
      </CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import { CModalFooter, CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'

export default {
  name: 'SectoresModal',
  components: {
    CSmartTable,
    CModal,
    CModalFooter,
  },

  data: function () {
    return {
      sectorFormValidated: false,
      sectorObject: {
        nombre: '',
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    saveSector() {
      this.sectorFormValidated = false;
      if (this.$refs.formRef.$el.checkValidity()) {
        this.$emit('post-sector', { ...this.sectorObject })
        this.clearForm()
        return;
      }
      this.sectorFormValidated = true;
    },
    clearForm() {
      this.sectorObject = {
        nombre: '',
      }
    },
  },

  watch: {
    sectorId(newId) {
      if (newId) {
        Api.getSectorById(newId)
        .then((response) => {
          this.sectorObject = response.data.data
        });
      }
    },
  },

  props: {
    newSectorModal: Boolean,
    sectorId: Number,
  },
}
</script>
