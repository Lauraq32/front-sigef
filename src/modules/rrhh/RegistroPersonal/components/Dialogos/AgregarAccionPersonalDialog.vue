<template>
  <CModal backdrop="static" @close="showModal = false" :visible="showModal">
    <CModalHeader>
      <CModalTitle>Acción de Personal</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          novalidate
          :validated="isFormEventTypeValidated"
          ref="eventTypeForm"
        >
          <div class="row">
            <div class="col-3">
              <CFormLabel for="validationCustom01">Fecha</CFormLabel>
            </div>
            <div class="col-9 col-md-6">
              <CFormInput
                required
                id="validationCustom01"
                v-model="fechaDesde"
                type="date"
              />
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-3">
              <CFormLabel for="validationCustom02">Tipo de Acciones</CFormLabel>
            </div>
            <div class="col-9 col-md-6">
              <CFormSelect
                required
                id="validationCustom02"
                v-model="postAccionPersonal.tipoAccionId"
              >
                <option
                  v-for="acciones in this.TipoAcciones"
                  :key="acciones.id"
                  :value="acciones.id"
                >
                  {{ acciones.descripcion }}
                </option>
              </CFormSelect>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-3">
              <CFormLabel for="validationCustom03">Cantidad</CFormLabel>
            </div>
            <div class="col-9 col-md-6">
              <VueNumberFormat
                id="validationCustom03"
                v-model:value="postAccionPersonal.cantidad"
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
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-3">
              <CFormLabel for="validationCustom04">Hasta</CFormLabel>
            </div>
            <div class="col-9 col-md-6">
              <CFormInput
                required
                id="validationCustom04"
                type="date"
                v-model="fechaHasta"
              />
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>

          <div class="row mt-3">
            <div class="col-3">
              <CFormLabel for="validationCustom05">Detalle</CFormLabel>
            </div>
            <div class="col-9">
              <textarea
                required
                id="validationCustom05"
                v-model="postAccionPersonal.detalle"
                class="col-md-10"
                rows="3"
              ></textarea>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </div>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton
        type="button"
        color="secondary"
        data-bs-dismiss="modal"
        @click="showModal = false"
        >Cerrar</CButton
      >
      <CButton type="button" color="primary" @click="saveData">
        Guardar
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CButton } from '@coreui/vue-pro'

export default {
  name: 'AgregarAccionPersonalDialog',
  emits: ['closeModal'],
  components: {
    CModal,
    CButton,
  },

  data: () => {
    return {
      postAccionPersonal: {
        fechaDesde: null,
        empleadoId: null,
        tipoAccionId: null,
        cantidad: null,
        fechaHasta: null,
        detalle: null,
      },
      isFormEventTypeValidated: false,
    }
  },

  computed: {
    fechaDesde: {
      get() {
        if (
          this.postAccionPersonal.fechaDesde !== null &&
          this.postAccionPersonal.fechaDesde?.toString() !== 'Invalid Date'
        ) {
          let date = this.postAccionPersonal.fechaDesde
          if (typeof this.postAccionPersonal.fechaDesde === 'string') {
            date = new Date(this.postAccionPersonal.fechaDesde)
            return date.toISOString().split('T')[0]
          }
        }
      },
      set(value) {
        return (this.postAccionPersonal.fechaDesde = new Date(
          `${value}T00:00:00`,
        ))
      },
    },

    fechaHasta: {
      get() {
        if (
          this.postAccionPersonal.fechaHasta !== null &&
          this.postAccionPersonal.fechaHasta?.toString() !== 'Invalid Date'
        ) {
          let date = this.postAccionPersonal.fechaHasta
          if (typeof this.postAccionPersonal.fechaHasta === 'string') {
            date = new Date(this.postAccionPersonal.fechaHasta)
            return date.toISOString().split('T')[0]
          }
        }
      },
      set(value) {
        return (this.postAccionPersonal.fechaHasta = new Date(
          `${value}T00:00:00`,
        ))
      },
    },
  },

  methods: {
    closeModal(data) {
      this.$emit('closeModal', data)
    },
    saveData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        this.closeModal({ ...this.postAccionPersonal })
        return
      }
      this.isFormEventTypeValidated = true
    },
  },

  watch: {
    AccionPersonal() {
      this.postAccionPersonal = this.AccionPersonal
    },
    empleadoId() {
      this.postAccionPersonal.empleadoId = this.empleadoId
    },
  },

  props: {
    showModal: Boolean,
    TipoAcciones: Array,
    AccionPersonal: Object,
    empleadoId: Number,
  },
}
</script>
