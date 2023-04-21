<template>
  <CModal
    size="m"
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
      <CCardBody>
        <div class="row">
          <div class="row mt-4 mx-2">
            <div class="col-4 col-label">Descripción</div>
            <div class="col-8">
              <CFormInput v-model="postInventario.descripcion" />
            </div>
          </div>

          <div class="row mt-4 mx-2">
            <div class="col-4 col-label">Tipo</div>
            <div class="col-8">
              <CFormSelect
                v-model="postInventario.tipo"
                id="validationCustom04"
              >
                <option value="deducible">Deducible</option>
                <option value="no-retornable">No-retornable</option>
                <option value="retornable">Retornable</option>
              </CFormSelect>
            </div>
          </div>
        </div>
        <div class="modal-footer mt-4">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="
              () => {
                showModal = false
              }
            "
          >
            Close
          </button>
          <button
            class="btn btn-info btn-block mt-1"
            v-on:click="submitInventario"
          >
            Guardar
          </button>
        </div>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
export default {
  name: 'Invetario',

  data: () => {
    return {
      postInventario: {
        descripcion: null,
        tipo: null,
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },

    submitInventario() {
      this.$emit('saveInventario', this.postInventario)
    },
  },

  props: {
    showModal: Boolean,
  },
}
</script>
