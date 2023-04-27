<template>
  <CModal
    backdrop="static"
    :visible="showModal"
    size="lg"
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
      <div class="d-flex justify-content-center align-items-center">
        <CCard class="w-75">
          <CCardBody>
            <div class="mb-4 mx-4">
              <h5>Inventario</h5>
            </div>

            <div class="row mx-3">
              <div class="col-6">
                <h5>Descripción</h5>
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
          </CCardBody>
        </CCard>
      </div>

      <CCardBody class="m-5">
        <CForm
          novalidate
          :validated="isFormEventTypeValidated"
          ref="eventTypeForm"
        >
          <CCol>
            <CFormLabel for="validationCustom01" class="form-label"
              >Descripción</CFormLabel
            >
            <CFormInput
              required
              v-model="postInventarioCantidad.descripcion"
              id="validationCustom01"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom02" class="form-label"
              >Autorizado Por</CFormLabel
            >
            <CFormInput
              required
              v-model="postInventarioCantidad.autorizadoPor"
              id="validationCustom02"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom03">Cantidad</CFormLabel>
            <VueNumberFormat
              id="validationCustom03"
              required
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
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom04">Fecha:</CFormLabel>
            <CFormInput
              id="validationCustom04"
              required
              type="date"
              v-model="initialDate"
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom05">Observación</CFormLabel>
            <textarea
              required
              id="validationCustom05"
              v-model="postInventarioCantidad.observacion"
              rows="4"
              class="w-100"
            ></textarea>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </CForm>
      </CCardBody>
    </CModalBody>

    <CModalFooter>
      <Cbutton
        type="button"
        class="btn btn-secondary mx-2"
        @click="
          () => {
            closeModal()
          }
        "
      >
        Cerrar
      </Cbutton>
      <Cbutton type="submit" class="btn btn-info btn-block" @click="sendData">
        Guardar
      </Cbutton>
    </CModalFooter>
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
        Descripción: null,
      },
      isFormEventTypeValidated: false,
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },

    submitUtilesLaborales(data) {
      this.$emit('saveUtilesLaborales', data)
      this.clearUtilesLaborales()
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.submitUtilesLaborales({ ...this.postInventarioCantidad })
      }
      this.isFormEventTypeValidated = true
    },

    clearUtilesLaborales() {
      this.postInventarioCantidad = {
        fecha: null,
        observacion: null,
        autorizadoPor: null,
        cantidad: 0,
        Descripción: null,
      }
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
