<template>
  <CModal size="md" :visible="cargoModal" backdrop="static">
    <CModalHeader>
      <CModalTitle>Cargo</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="cargosFormValidated"
          ref="formRef"
        >
          <CCol :md="12">
            <CFormLabel for="validationCustomUsername"
              >Posici&oacute;n o cargo</CFormLabel
            >
            <CFormInput type="text" required v-model="cargo.posicion" id="validationCustom04">
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeModalCargo"
            >
              Cerrar
            </button>
            <button class="btn btn-info btn-block mt-1" @click="saveCargo">
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
      cargosFormValidated: false,
      cargo: {
        posicion: '',
      },
    }
  },

  methods: {
    saveCargo() {
      this.cargosFormValidated = false
      if (this.$refs.formRef.$el.checkValidity()) {
        this.$emit('post-cargo', { ...this.cargo })
        this.clearForm()
        return
      }
      this.cargosFormValidated = true
    },

    clearForm() {
      this.cargo = {
        posicion: '',
      }
    },

    closeModalCargo() {
      this.$emit('close-modal', false)
      this.clearForm()
    },

    getCargosByIds(id) {
      Api.getCargobyid(id).then((response) => {
        this.cargo = response.data.data
      })
    },
  },

  watch: {
    cargoId(newId) {
      if (newId) {
        this.getCargosByIds(newId)
      }
    },
  },

  props: {
    cargoModal: Boolean,
    cargoId: null,
  },
}
</script>
