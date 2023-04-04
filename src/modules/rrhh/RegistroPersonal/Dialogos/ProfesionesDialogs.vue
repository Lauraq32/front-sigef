<template>
  <CModal size="md" :visible="showModal" backdrop="static">
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
            <CFormLabel for="validationCustomUsername">Profesión</CFormLabel>
            <CFormInput v-model="profesionObject.name" id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="onClick"
            >
              Cerrar
            </button>
            <button class="btn btn-info btn-block mt-1" @click="saveProfesiones">
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
    onClick() {
      this.$emit('close-modal', false)
      this.clearForm()
      this.showModal = false
    },
    saveProfesiones() {
      this.$emit('post-profesiones', this.profesionObject)
      this.clearForm()
      this.onClick()
    },
    getProfesionByIds(id) {
      Api.getProfesionById(id).then((response) => {
        this.profesionObject = response.data.data
      })
    },
    clearForm() {
      console.log('holas')
      this.profesionObject = {
        name: '',
      }
    },
  },

  watch: {
    profesionesId(newId) {
      if (newId) {
        this.getProfesionByIds(newId)
      }
    },
  },

  props: {
    showModal: Boolean,
    profesionesId: null
  },
}
</script>
