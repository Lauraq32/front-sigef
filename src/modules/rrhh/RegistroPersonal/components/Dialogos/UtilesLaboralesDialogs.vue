<template>
  <CModal
    backdrop="static"
    size="m"
    :visible="showModal"
    @close="
      () => {
        closeModal()
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Útil Laboral</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row mx-3">
        <div class="col-6">
          <h5>Descripción:</h5>
        </div>
        <div class="col-6">
          <h6>{{ inventario.descripcion }}</h6>
        </div>
      </div>

      <div class="row mx-3">
        <div class="col-6">
          <h5>Tipo:</h5>
        </div>
        <div class="col-6">
          <h6>{{ inventario.tipo }}</h6>
        </div>
      </div>

      <CCardBody class="mt-3">
        <div class="row">
          <div class="row mt-4 mx-4">
            <div class="col-4 col-label">Fecha</div>
            <div class="col-8 col-md-6">
              <CFormInput type="date" v-model="initialDate" />
            </div>
          </div>

          <div class="row mt-4 mx-4">
            <div class="col-4 col-label">autorizadoPor</div>
            <div class="col-8 col-md-6">
              <CFormInput
                v-model="postInventarioCantidad.autorizadoPor"
                id="validationCustom04"
              >
              </CFormInput>
            </div>
          </div>

          <div class="row mt-4 mx-4">
            <div class="col-4 col-label">Cantidad</div>
            <div class="col-8 col-md-6">
              <VueNumberFormat
                v-model:value="postInventarioCantidad.cantidad"
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

          <div class="row mt-4 mx-4">
            <div class="col-4 col-label">Observacion</div>
            <div class="col-8">
              <textarea
                required
                class="w-75"
                id="validationCustom05"
                v-model="postInventarioCantidad.observacion"
                rows="3"
              ></textarea>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
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
                this.showModal = false
              }
            "
          >
            Close
          </button>
          <button
            class="btn btn-info btn-block mt-1"
            v-on:click="submitUtilesLaborales()"
          >
            Guardar
          </button>
        </div>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'

export default {
  name: 'UtilesLaborales',
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      postInventarioCantidad: {
        fecha: new Date(Date.now()),
        observacion: null,
        autorizadoPor: null,
        cantidad: 0,
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },

    submitUtilesLaborales() {
      this.$emit('saveUtilesLaborales', this.postInventarioCantidad)
    },
  },

  computed: {
    initialDate: {
      get() {
        if (
          this.postInventarioCantidad.fecha !== null &&
          this.postInventarioCantidad.fecha?.toString() !== 'Invalid Date'
        ) {
          let date = this.postInventarioCantidad.fecha
          if (typeof this.postInventarioCantidad.fecha === 'string') {
            date = new Date(this.postInventarioCantidad.fecha)
            return date.toISOString().split('T')[0]
          }
        } else {
          return
        }
      },
      set(value) {
        return (this.postInventarioCantidad.fecha = new Date(
          `${value}T00:00:00`,
        ))
      },
    },
  },

  props: {
    showModal: Boolean,
    inventario: {
      type: Object,
      default: {},
      required: true,
    },
  },
}
</script>
