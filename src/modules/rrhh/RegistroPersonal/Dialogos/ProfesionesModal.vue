<template>
  <CModal size="md" :visible="newProfesionesModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Profesiones</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit=""
        >
          <CCol :md="12">
            <CFormLabel for="validationCustom04">Profesión</CFormLabel>
            <CFormInput v-model="profesionObject.name" id="validationCustom04"> </CFormInput>
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
            <button class="btn btn-info btn-block mt-1" @click="saveProfesion">
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
import Api from '../services/RegistroPersonalServices'

export default {
  name: 'ProfesionesDialogs',
  components: {
    CSmartTable,
    CModal,
  },

  data: function () {
    return {
      profesionObject: {
        name: '',
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('close-modal', false)
      this.newProfesionesModal = false
    },
    saveProfesion() {
      this.$emit('post-profesiones', this.profesionObject)
      this.clearForm()
    },
    getProfesionByIds(id) {
      Api.getProfesionById(id).then((response) => {
        this.profesionObject = response.data.data
      })
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
        this.getProfesionByIds(newId)
      }
    },
  },

  props: {
    newProfesionesModal: Boolean,
    profesionId: null
  },
}
</script>
