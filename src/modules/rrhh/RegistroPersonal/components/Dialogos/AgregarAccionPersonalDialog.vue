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
                @change="validarFechaHasta"
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
                v-model.number="postAccionPersonal.tipoAccionId"
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
                disabled
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
        cantidad: 1,
        fechaHasta: new Date(),
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
        let date = this.postAccionPersonal.fechaDesde ?? new Date()
        if (
          this.postAccionPersonal.fechaDesde !== null &&
          this.postAccionPersonal.fechaDesde?.toString() !== 'Invalid Date'
        ) {
          if (typeof this.postAccionPersonal.fechaDesde === 'string') {
            date = new Date(this.postAccionPersonal.fechaDesde)
            return date.toISOString().split('T')[0]
          }
        }
        return date?.toISOString()?.split('T')?.[0]
      },
      set(value) {
        return (this.postAccionPersonal.fechaDesde = new Date(
          `${value}T00:00:00`,
        ))
      },
    },

    fechaHasta: {
      get() {
        let date = this.postAccionPersonal.fechaDesde ?? new Date()
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
        !this.fechaHataValidation
      ) {
        return this.saveDataAccionPersonal({ ...this.postAccionPersonal })
      }
      this.isFormEventTypeValidated = true
      this.show({
        content:
          'Informaci&oacute;n incorrecta. Por favor revisar la informaci&oacute;n del formulario',
        closable: true,
        color: 'danger',
        class: 'text-white',
      })
    },

    validarFechaHasta() {
      const fechaDesde = new Date(this.postAccionPersonal.fechaHasta)
      fechaDesde.setHours(0, 0, 0, 0)
      const fechaActual = new Date(this.postAccionPersonal.fechaDesde)
      fechaActual.setHours(0, 0, 0, 0)
      this.fechaHataValidation = fechaDesde < fechaActual
    },

    calcularFechaHasta() {
      if (
        this.postAccionPersonal.fechaDesde &&
        this.postAccionPersonal.cantidad
      ) {
        const fechaDesde = new Date(this.postAccionPersonal.fechaDesde)
        const cantidad = parseInt(this.postAccionPersonal.cantidad)

        const fechaHasta = new Date(
          fechaDesde.getTime() + cantidad * 24 * 60 * 60 * 1000,
        )

        this.postAccionPersonal.fechaHasta = fechaHasta
          .toISOString()
          .substring(0, 10)
      }
    },
  },

  watch: {
    accionPersonal() {
      this.postAccionPersonal = {
        ...this.accionPersonal,
        tipoAccionId: `${this.accionPersonal.tipoAccionId}`,
      }
    },
    tipoAcciones() {
      this.postAccionPersonal.tipoAccionId = `${this.tipoAcciones?.[0].id}`
    },
    'postAccionPersonal.cantidad': function () {
      if (this.postAccionPersonal.cantidad == 0) {
        this.postAccionPersonal.fechaHasta = this.postAccionPersonal.fechaDesde
      }
      this.calcularFechaHasta()
    },
    'postAccionPersonal.fechaDesde': function () {
      if (!this.postAccionPersonal.cantidad) {
        this.postAccionPersonal.cantidad = null
        this.postAccionPersonal.fechaHasta = this.postAccionPersonal.fechaDesde
        this.calcularFechaHasta()
      }
    },
  },

  props: {
    showModalAgregarAccionPersonal: Boolean,
    tipoAcciones: Array,
    accionPersonal: Object,
  },
}
</script>
