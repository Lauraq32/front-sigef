<template>
  <CModal :visible="cargoModal" backdrop="static">
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
            <CFormLabel for="validationCustomUsername">Posici&oacute;n o cargo</CFormLabel>
            <CFormInput type="text" required v-model="cargo.nombre" id="validationCustom04"></CFormInput>
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
import { CModal } from '@coreui/vue';

export default {
  name: 'CargosModal',
  components: {
    CModal,
  },
  emits: ['post-cargo', 'close-modal'],
  data: function () {
    return {
      cargosFormValidated: false,
      cargo: {
        nombre: '',
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
        nombre: '',
      }
    },

    closeModalCargo() {
      this.$emit('close-modal', false)
      this.clearForm()
    },
  },

  watch: {
    cargoToUpdate(newCargo) {
      console.log(newCargo, this.cargoToUpdate);
      if (newCargo) {
        this.cargo = { ...newCargo };
      }
    },
  },

  props: {
    cargoModal: Boolean,
    cargoToUpdate: null,
  },
}
</script>
