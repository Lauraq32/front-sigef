<template>
    <CModal
    size="md"
    :visible="cargoModal"
    backdrop="static"
  >
    <CModalHeader>
      <CModalTitle>Cargos</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="12">
            <CFormLabel for="validationCustomUsername"
              >Posicion o cargo</CFormLabel
            >
            <CFormInput v-model="cargosObject.posicion" id="validationCustom04"> </CFormInput>
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
    name: 'CargosModal',
    components: {
    CSmartTable,
    CModal,
  },

  data: function () {
    return {
        cargosObject: {
            posicion: '',
        },
    }
  },

  methods: {
    saveProfesiones() {
      this.$emit('post-cargo', this.cargosObject)
      this.clearForm()
      this.onClick()
    },

    clearForm() {
      this.cargosObject = {
        posicion: '',
      }
    },

    onClick() {
      this.$emit('close-modal', false)
      this.clearForm()
      this.cargoModal = false
    },

    getCargosByIds(id) {
      Api.getCargobyid(id).then((response) => {
        this.cargosObject = response.data.data
      })
    },
  },

  watch: {
    cargosId(newId) {
      if (newId) {
        this.getCargosByIds(newId)
      }
    },
  },

  props: {
    cargoModal: Boolean,
    cargosId: null
  },
}
</script>