<template>
  <CModal
    backdrop="static"
    :visible="showModal"
    size="md"
    @close="() => { closeModal() }"
  >
    <CModalHeader>
      <CModalTitle>Útil Laboral</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          novalidate
          :validated="isFormEventTypeValidated"
          ref="eventTypeForm"
        >
          <CCol>
            <CFormLabel for="validationCustom01" class="form-label"
              >Descripción</CFormLabel >
            <CFormInput
              required
              v-model="utilLaboral.descripcion"
              id="validationCustom01"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="validationCustom06" class="form-label">
              Tipo
            </CFormLabel>
            <CFormSelect
              required
              v-model="utilLaboral.tipo"
              id="validationCustom06"
            >
              <option value="deducible">Deducible</option>
              <option value="no-retornable">No-retornable</option>
              <option value="retornable">Retornable</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom02" class="form-label"
              >Autorizado Por</CFormLabel
            >
            <CFormInput
              required
              v-model="utilLaboral.autorizadoPor"
              id="validationCustom02"
              v-on:keypress="onlyLetter($event)"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom03">Cantidad</CFormLabel>
            <VueNumberFormat
              id="validationCustom03"
              required
              v-model:value="utilLaboral.cantidad"
              class="form-control"
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
            <CFormLabel for="validationCustom04">Fecha</CFormLabel>
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
              v-model="utilLaboral.observacion"
              rows="4"
              class="w-100"
            ></textarea>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </CForm>
      </CCardBody>
    </CModalBody>
    <CModalFooter>
      <CButton
        type="button"
        class="btn btn-secondary mx-2"
        @click="() => { closeModal() }"
      >
        Cerrar
      </CButton>
      <CButton class="btn btn-info btn-block" @click="sendData">
        Guardar
      </CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { formatDate } from '@/utils/format'
import { formatNumber } from '@/utils/format'
import { onlyLetter } from '@/utils/validator'

export default {
  name: 'UtilesLaborales',
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      formatDate,
      formatNumber,
      onlyLetter,
      isFormEventTypeValidated: false,
      utilLaboral: {
        fecha: new Date(),
        observacion: null,
        autorizadoPor: null,
        tipo: 'deducible',
        cantidad: 1,
        descripción: null,
      }
    }
  },
  emits: ['closeModal', 'saveUtilesLaborales'],
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },

    submitUtilesLaborales(data) {
      this.$emit('saveUtilesLaborales', data);
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.submitUtilesLaborales({ ...this.utilLaboral })
      }
      this.isFormEventTypeValidated = true
    },
  },

  computed: {
    initialDate: {
      get() {
        let date = new Date()
        if (
          this.utilLaboral.fecha !== null &&
          this.utilLaboral.fecha?.toString() !== 'Invalid Date'
        ) {
          date = this.utilLaboral.fecha
          if (typeof this.utilLaboral.fecha === 'string') {
            date = new Date(this.utilLaboral.fecha)
            return date.toISOString().split('T')[0]
          }
        }

        return date.toISOString().split('T')[0]
      },
      set(value) {
        return (this.utilLaboral.fecha = new Date(
          `${value}T00:00:00`,
        ))
      },
    },
  },
  watch: {
    utilLaboralSelected() {
      this.utilLaboral = this.utilLaboralSelected;
    }
  },

  props: {
    showModal: Boolean,
    utilLaboralSelected: {
      type: Object,
      required: true,
      default: () => ({
        fecha: new Date(),
        observacion: null,
        autorizadoPor: null,
        tipo: 'deducible',
        cantidad: 1,
        descripción: null,
      })
    },
  },
}
</script>
