<template>
  <CModal
    backdrop="static"
    size="lg"
    :visible="showModal"
    @close="() => { closeModal() }"
    style="width: 25%"
  >
    <CModalHeader>
      <CModalTitle>Movimiento de &Uacute;tiles laborales</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CForm
        novalidate
        :validated="isFormEventTypeValidated"
        ref="eventTypeForm"
      >
        <CCardBody class="mx-4">
          <CCol class="row">
            <CFormLabel for="validationCustom01">Útil Laboral</CFormLabel>
            <v-select
              v-model="selectedUtil"
              placeholder="Seleccionar"
              :options="utils"
              :disabled="utilLaboralSelected?.id"
            >
              <template #option="{ label, cantidad }">
                <div class="d-flex justify-content-between p-1">
                  <span> {{ label }} </span>

                  <span>
                    {{ `${formatNumber(cantidad)}` }}
                  </span>
                </div>
              </template>
              ></v-select
            >

            <CFormFeedback
              invalid
              :style="{ display: !isFormValidatedInputUtil ? 'none' : 'flex' }"
            >
              Favor agregar el campo
            </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom02">Tipo</CFormLabel>
            <CFormSelect
              @change="onTypeChange"
              required
              id="validationCustom02"
              v-model="postEvento.tipo"
            >
              <option value="entregado">Entregado</option>
              <option
                v-if="utilLaboralSelected.tipo !== 'no-retornable'"
                value="retornado"
              >
                Retornado
              </option>
              <option value="abastecimiento">Abastecimiento</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol>
            <CFormLabel for="validationCustom03">Empleado</CFormLabel>
            <v-select
              :disabled="postEvento.tipo == 'abastecimiento'"
              required
              id="validationCustom03"
              v-model="selectedEmpleado"
              :options="empleados"
            ></v-select>
            <CFormFeedback
              invalid
              :style="{ display: isEmployeeRequired ? 'flex': 'none' }"
            >
              Favor agregar el campo
            </CFormFeedback>
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
        @click="() => { showModal = false }"
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
import { formatNumber } from '@/utils/format'
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
      formatNumber,
      postEvento: {
        utilId: '',
        fecha: new Date(),
        cantidad: 1,
        tipo: 'entregado',
        empleadoId: null,
      },
      isFormEventTypeValidated: false,
      isFormValidatedInputUtil: false,
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
    isEmployeeRequired() {
      return ['entregado', 'retornado'].includes(this.postEvento.tipo) && !this.postEvento.empleadoId
    }
  },
  methods: {
    onTypeChange($event) {
      if ($event.target.value === 'abastecimiento') {
        this.postEvento.empleadoId = undefined
      }
    },

    closeModal() {
      this.$emit('closeModal', false)
    },

    submitEventos(data) {
      this.$emit('saveEvents', data)
    },

    sendData() {
      this.isFormEventTypeValidated = false
      this.isFormValidatedInputUtil = !this.postEvento.utilId
      if (
        this.$refs.eventTypeForm.$el.checkValidity() &&
        this.postEvento.utilId &&
        !this.isEmployeeRequired
      ) {
        return this.submitEventos({ ...this.postEvento })
      }
      this.isFormEventTypeValidated = true
    },

    clearEventos() {
      this.isFormEventTypeValidated = false
      this.isFormValidatedInputUtil = false
      this.id = null
      this.postEvento = {
        utilId: 0,
        fecha: new Date(),
        cantidad: 1,
        tipo: 'entregado',
        empleadoId: null,
      }
    },
  },

  watch: {
    showModal() {
      this.clearEventos()
    },
    utilLaboralSelected(value) {
      if (value) {
        this.selectedUtil = { code: value.id}
      }
    }
  },

  props: {
    showModal: Boolean,
    empleados: {
      type: Array,
      default: [],
      required: true,
    },

    utilLaboralSelected: {
      type: Object,
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
