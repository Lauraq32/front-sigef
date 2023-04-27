<template>
  <CModal
    size="lg"
    :visible="showModal"
    @close="
      () => {
        closeModal()
      }
    "
    style="width: 25%"
  >
    <CModalHeader>
      <CModalTitle>Movimiento de inventario</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm
        novalidate
        :validated="isFormEventTypeValidated"
        ref="eventTypeForm"
      >
        <CCardBody class="mx-4">
          <CCol class="row">
            <CFormLabel for="validationCustom01">Util Laboral</CFormLabel>
            <v-select
              required
              id="validationCustom01"
              v-model="selectedUtil"
              :options="utils"
            ></v-select>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom02">Tipo</CFormLabel>
            <CFormSelect
              required
              id="validationCustom02"
              v-model="postEvento.tipo"
            >
              <option value="antregado">Entregado</option>
              <option value="Retornado">Retornado</option>
              <option value="abastecimiento">Abastecimiento</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom03">Empleados</CFormLabel>
            <v-select
              required
              id="validationCustom03"
              v-model="selectedEmpleado"
              :options="empleados"
            ></v-select>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom04">Cantidad</CFormLabel>
            <VueNumberFormat
              required
              id="validationCustom04"
              v-model:value="postEvento.cantidad"
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
            <CFormLabel for="validationCustom05">Fecha</CFormLabel>
            <CFormInput
              required
              id="validationCustom05"
              type="date"
              v-model="initialDate"
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
        </CCardBody>
      </CForm>
    </CModalBody>
    <CModalFooter>
      <CButton
        type="button"
        class="btn btn-secondary mx-2"
        @click="
          () => {
            showModal = false
          }
        "
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
import { CModal } from '@coreui/vue'
import { CFooter } from '@coreui/vue-pro'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'EventoInventario',
  components: {
    vSelect,
    CFooter,
  },

  data: () => {
    return {
      postEvento: {
        utilId: 0,
        fecha: new Date(),
        cantidad: null,
        tipo: 'entregado',
        empleadoId: 0,
      },
      isFormEventTypeValidated: false,
    }
  },
  computed: {
    initialDate: {
      get() {
        let date = new Date()
        if (
          this.postEvento.fecha !== null &&
          this.postEvento.fecha?.toString() !== 'Invalid Date'
        ) {
          date = this.postEvento.fecha
          if (typeof this.postEvento.fecha === 'string') {
            date = new Date(this.postEvento.fecha)
            return date.toISOString().split('T')[0]
          }
        }

        return date.toISOString().split('T')[0]
      },
      set(value) {
        return (this.postEvento.fecha = new Date(`${value}T00:00:00`))
      },
    },

    selectedUtil: {
      get() {
        return this.utils.find((x) => x.code == this.postEvento.utilId)
      },
      set(util) {
        this.postEvento.utilId = Number(util.code)
      },
    },

    selectedEmpleado: {
      get() {
        return this.empleados.find((x) => x.code == this.postEvento.empleadoId)
      },
      set(empleado) {
        this.postEvento.empleadoId = Number(empleado.code)
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },

    submitEventos(data) {
      this.$emit('saveEvents', data)
      this.clearEventos()
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (this.$refs.eventTypeForm.$el.checkValidity()) {
        return this.submitEventos({ ...this.postEvento })
      }
      this.isFormEventTypeValidated = true
    },

    clearEventos() {
      this.postEvento = {
        utilId: 0,
        fecha: null,
        cantidad: null,
        tipo: 'entregado',
        empleadoId: 0,
      }
    },
  },

  props: {
    showModal: Boolean,
    empleados: {
      type: Array,
      default: [],
      required: true,
    },

    utils: {
      type: Array,
      default: [],
      required: true,
    },
  },
}
</script>
