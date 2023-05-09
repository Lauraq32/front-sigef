<template>
  <CModal
    backdrop="static"
    @close="() => closeModal()"
    :visible="showModalAgregarAccionPersonal"
  >
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
                @change="validarFechaDesde"
                required
                id="validationCustom01"
                v-model="fechaDesde"
                type="date"
              />
              <CFormFeedback
                invalid
                :style="{ display: isLowerSelectedInitDate ? 'flex' : 'none' }"
              >
                La fecha no puede ser menor a la fecha actual
              </CFormFeedback>
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
                  v-for="acciones in tipoAcciones"
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

          <div class="row mt-3">
            <div class="col-3">
              <CFormLabel for="validationCustom04">Hasta</CFormLabel>
            </div>
            <div class="col-9 col-md-6">
              <CFormInput
                v-on:change="validarFechaHasta"
                required
                id="validationCustom04"
                type="date"
                v-model="fechaHasta"
              />
              <CFormFeedback
                invalid
                :style="{ display: fechaHataValidation ? 'flex' : 'none' }"
              >
                La fecha no puede ser menor a la fecha inicial
              </CFormFeedback>
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
        @click="() => closeModal()"
        >Cerrar</CButton
      >
      <CButton type="button" color="primary" @click="sendData">
        Guardar
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CButton } from '@coreui/vue-pro'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  name: 'AgregarAccionPersonalDialog',
  emits: ['close', 'clearModal'],
  components: {
    CModal,
    CButton,
  },

  data: () => {
    return {
      postAccionPersonal: {
        fechaDesde: null,
        tipoAccionId: null,
        cantidad: 0,
        fechaHasta: null,
        detalle: null,
      },
      isFormEventTypeValidated: false,
      isLowerSelectedInitDate: false,
      fechaHataValidation: false,
      isZeroEqualZero: false,
    }
  },

  computed: {
    fechaDesde: {
      get() {
        let date = this.postAccionPersonal.fechaDesde
        if (
          this.postAccionPersonal.fechaDesde !== null &&
          this.postAccionPersonal.fechaDesde?.toString() !== 'Invalid Date'
        ) {
          if (typeof this.postAccionPersonal.fechaDesde === 'string') {
            date =
              typeof date === 'string'
                ? new Date(this.postAccionPersonal.fechaDesde)
                : date
            return date.toISOString().split('T')[0]
          }
        }
        return date?.toISOString()?.split('T')?.[0]
      },
      set(value) {
        this.postAccionPersonal.fechaDesde = new Date(`${value}T00:00:00`)
        this.validarFechaDesde()
      },
    },

    fechaHasta: {
      get() {
        let date = this.postAccionPersonal.fechaHasta
        if (
          this.postAccionPersonal.fechaHasta !== null &&
          this.postAccionPersonal.fechaHasta?.toString() !== 'Invalid Date'
        ) {
          if (typeof this.postAccionPersonal.fechaHasta === 'string') {
            date = new Date(this.postAccionPersonal.fechaHasta)
            return date.toISOString().split('T')[0]
          }
        }
        return date?.toISOString()?.split('T')?.[0]
      },
      set(value) {
        return (this.postAccionPersonal.fechaHasta = new Date(
          `${value}T00:00:00`,
        ))
      },
    },
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    clearAccionPersonal() {
      this.$emit('clearModal', this.postAccionPersonal)
    },

    closeModal() {
      this.$emit('close', false)
    },
    saveDataAccionPersonal(data) {
      this.$emit('sendData', data)
      this.clearAccionPersonal()
      this.isFormEventTypeValidated = false
      this.isLowerSelectedInitDate = false
      this.fechaHataValidation = false
      this.isZeroEqualZero = false
    },
    sendData() {
      this.isFormEventTypeValidated = false
      if (
        this.$refs.eventTypeForm.$el.checkValidity() &&
        !this.isLowerSelectedInitDate &&
        !this.fechaHataValidation
      ) {
        return this.saveDataAccionPersonal({ ...this.postAccionPersonal })
      }
      this.isFormEventTypeValidated = true
    },

    validarFechaDesde() {
      const fechaDesde = new Date(this.postAccionPersonal.fechaDesde)
      fechaDesde.setHours(0, 0, 0, 0)
      const fechaActual = new Date()
      fechaActual.setHours(0, 0, 0, 0)
      if (fechaDesde < fechaActual) {
        this.isLowerSelectedInitDate = true
      } else {
        this.isLowerSelectedInitDate = false
      }

      this.validarFechaHasta()
    },

    validarFechaHasta() {
      const fechaDesde = new Date(this.postAccionPersonal.fechaHasta)
      fechaDesde.setHours(0, 0, 0, 0)
      const fechaActual = new Date(this.postAccionPersonal.fechaDesde)
      fechaActual.setHours(0, 0, 0, 0)
      this.fechaHataValidation = fechaDesde < fechaActual
    },
  },

  watch: {
    accionPersonal() {
      this.postAccionPersonal = { ...this.accionPersonal }
    },
    tipoAcciones() {
      this.postAccionPersonal.tipoAccionId = this.tipoAcciones?.[0].id
    },
  },

  props: {
    showModalAgregarAccionPersonal: Boolean,
    tipoAcciones: Array,
    accionPersonal: Object,
  },
}
</script>
