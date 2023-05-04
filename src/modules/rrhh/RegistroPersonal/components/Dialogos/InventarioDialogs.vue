<template>
  <CModal
    backdrop="static"
    :visible="showModal"
    @close="
      () => {
        closeModal()
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Inventario</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm
        novalidate
        :validated="isFormEventTypeValidated"
        ref="eventTypeForm"
      >
        <CCardBody>
          <div class="row">
            <div class="row mt-4 mx-2">
              <div class="col-4 col-label">Descripción</div>
              <div class="col-8">
                <CFormInput required v-model="postInventario.descripcion" />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </div>
            </div>

            <div class="row mt-4 mx-2">
              <div class="col-4 col-label">Tipo</div>
              <div class="col-8">
                <CFormSelect
                  required
                  v-model="postInventario.tipo"
                  id="validationCustom04"
                >
                  <option value="deducible">Deducible</option>
                  <option value="no-retornable">No-retornable</option>
                  <option value="retornable">Retornable</option>
                </CFormSelect>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </div>
            </div>
          </div>
        </CCardBody>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <button
        type="button"
        class="btn btn-secondary"
        data-bs-dismiss="modal"
        @click="
          () => {
            closeModal()
          }
        "
      >
        Cerrar
      </button>
      <button class="btn btn-info btn-block" v-on:click="sendData">
        Guardar
      </button>
    </CModalFooter>
  </CModal>
</template>

<script>
export default {
  name: 'Invetario',

  data: () => {
    return {
      postInventario: {
        descripcion: null,
        tipo: 'deducible',
      },
      isFormEventTypeValidated: false,
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },

    submitInventario(data) {
      this.$emit('saveInventario', data)
      this.clearInventario()
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.submitInventario({ ...this.postInventario })
      }
      this.isFormEventTypeValidated = true
    },

    clearInventario() {
      this.postInventario = {
        descripcion: null,
        tipo: 'Deducible',
      }
    },
  },

  props: {
    showModal: Boolean,
  },
}
</script>
