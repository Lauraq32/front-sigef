<template>
  <CModal :visible="newProfesionesModal" backdrop="static" style="width: 25%">
    <CModalHeader>
      <CModalTitle>Profesiones</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="profesionFormValidated"
          ref="formRef"
        >
          <CCol :md="12">
            <CFormLabel for="validationCustom04">Profesión</CFormLabel>
            <CFormInput required v-model="profesionObject.name" id="validationCustom04"> </CFormInput>
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
        color="primary" @click="saveProfesion">
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
  name: 'ProfesionesDialogs',
  components: {
    CSmartTable,
    CModal,
    CModalFooter
},

  data: function () {
    return {
      profesionFormValidated: false,
      profesionObject: {
        name: '',
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal');
    },
    saveProfesion() {
      this.profesionFormValidated = false;
      if (this.$refs.formRef.$el.checkValidity()) {
        this.$emit('post-profesiones', { ...this.profesionObject })
        this.clearForm()
        return;
      }
      this.profesionFormValidated = true;
    },
    clearForm() {
      this.profesionObject = {
        name: '',
      }
    },
  },

  watch: {
    profesionId(newId) {
      if (newId) {
        Api.getProfesionById(newId)
        .then((response) => {
          this.profesionObject = response.data.data
        });
      }
    },
  },

  props: {
    newProfesionesModal: Boolean,
    profesionId: Number
  },
}
</script>
