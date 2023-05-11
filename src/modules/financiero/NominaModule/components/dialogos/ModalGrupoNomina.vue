<template>
  <CModal
    backdrop="static"
    size="md"
    :visible="showModal"
    @close="closeGrupoNomina"
  >
    <CModalHeader>
      <CModalTitle>Grupo nómina</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="isFormEventTypeValidated"
          ref="eventTypeForm"
        >
          <CCol :md="11">
            <CFormLabel for="validationCustom01">Nombre</CFormLabel>
            <CFormInput
              v-model="postGrupoNominas.nombre"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <CButton
              @click="closeGrupoNomina"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </CButton>
            <CButton @click="sendData" type="button" class="btn btn-primary">
              Guardar
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import Api from '../../services/NominaServices'

export default {
  name: 'ModalGrupoNomina',

  components: {
    CModal,
  },

  data: function () {
    return {
      postGrupoNominas: {
        nombre: null,
        ayuntamientoId: this.$ayuntamientoId,
      },
      isFormEventTypeValidated: false,
    }
  },

  methods: {
    closeGrupoNomina() {
      this.$emit('close-modal', false)
    },

    saveGrupoNomina() {
      this.$emit('postGrupoNomina', this.postGrupoNominas)
      this.clearModalGrupoNomina()
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.saveGrupoNomina({ ...this.postGrupoNominas })
      }
      this.isFormEventTypeValidated = true
    },

    clearModalGrupoNomina() {
      this.id = null
      this.isFormEventTypeValidated = false
      this.postGrupoNominas = {
        nombre: null,
        ayuntamientoId: null,
      }
    },
  },

  watch: {
    grupoNominaId(id) {
      if (id) {
        Api.getGrupoNominaById(id).then((response) => {
          this.postGrupoNominas = response.data.data
        })
      }
    },
  },

  props: {
    showModal: Boolean,
    grupoNominaId: Number,
  },
}
</script>
