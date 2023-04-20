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
      <CModalTitle>Movimiento de inventario</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <div class="row">
          <div class="row mt-4">
            <div class="col-4 col-label">Fecha</div>
            <div class="col-8">
              <CFormInput type="date" v-model="postEvento.fecha" />
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-4 col-label">Cantidad</div>
            <div class="col-8">
              <VueNumberFormat
                v-model:value="postEvento.cantidad"
                class="form-control"
                :format="'0'"
                :options="{
                  precision: 0,
                  prefix: '',
                  decimal: '',
                  thousand: '',
                }"
              >
              </VueNumberFormat>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-4 col-label">Tipo</div>
            <div class="col-8">
              <CFormSelect v-model="postEvento.tipo" id="validationCustom04">
                <option>entregado</option>
                <option>retornado</option>
                <option>Abastecimiento</option>
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
            v-on:click="agregarEventos"
          >
            Guardar
          </button>
        </div>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
export default {
  name: 'eventoUtiles',

  data: () => {
    return {
      postEvento: {
        utilId: 0,
        fecha: null,
        cantidad: null,
        tipo: null,
        empleadoId: 0,
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },
  },

  props: {
    showModal: Boolean,
  },
}
</script>
