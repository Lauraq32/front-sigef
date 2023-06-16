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
            <CFormLabel for="codigoEmpleado" class="form-label col-3">C&oacute;digo Empleado</CFormLabel>
            <strong class="col-9">{{ empleado?.codigo }}</strong>
          </CCol>
          <CCol class="row">
            <CFormLabel for="empleadoNombre" class="form-label col-3">Nombre Empleado</CFormLabel>
            <strong class="col-9">{{ empleado?.nombre }} {{ empleado?.apellido }}</strong>
          </CCol>
          <hr/>
          <CCol>
            <CFormLabel for="postEvento.autorizadoPor" class="form-label">Autorizado Por</CFormLabel>
            <CFormInput
              v-model="postEvento.autorizadoPor"
              id="postEvento.autorizadoPor"
              v-on:keypress="onlyLetter($event)"
            >
            </CFormInput>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="initialDate">Fecha</CFormLabel>
            <CFormInput
              id="initialDate"
              required
              type="date"
              v-model="initialDate"
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol>
            <CFormLabel for="postEvento.observacion">Observaci&oacute;n</CFormLabel>
            <textarea
              required
              id="postEvento.observacion"
              v-model="postEvento.observacion"
              rows="4"
              class="w-100" style="resize: none;"></textarea>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <br />
          

        </CCardBody>
      </CForm>

      <div class="table-headers">
        <div class="d-inline p-2">
          <CButton
            color="info"
            @click="() => { showMovimientoModal = true } "
          >
            Agregar &Uacute;til Laboral
          </CButton>
        </div>
      </div>

      <MovimientoUtilTable
        :utiles="postEvento.utiles"
        :show-delete-button="true"
        @remove="removeUtil"
      />

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

    <MovimientoInventarioModal
      :showMovimientoModal="showMovimientoModal"
      :inventarioList="inventarioList"
      :postEvento="utilLaboralItem"
      @close-modal="onMovimientoModalClose"
      @save="onMovimientoSave"
    />
  </CModal>

</template>

<script>
import { CModal } from '@coreui/vue'
import { CButton, CFooter, CSmartTable } from '@coreui/vue-pro'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import MovimientoInventarioModal from './MovimientoInventarioModal.vue'
import MovimientoUtilTable from '../tables/MovimientoUtilTable.vue'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import { onlyLetter } from '@/utils/validator'

export default {
  name: 'EventoInventario',
  components: {
    vSelect,
    CFooter,
    CButton,
    CSmartTable,
    MovimientoInventarioModal,
    MovimientoUtilTable
},
  emits: ["closeModal", "save"],
  data: () => {
    return {
      onlyLetter,
      postEvento: {
        fecha: new Date(),
        observacion: null,
        autorizadoPor: null,
        empleadoId: 0,
        utiles: [],
      },
      utilLaboralItem: {
        inventarioId: '0',
        cantidad: 1
      },
      isFormEventTypeValidated: false,
      showMovimientoModal: false,
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
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.$emit('closeModal', false)
    },

    submitEventos(data) {
      this.$emit('save', data)
    },
    removeUtil(util) {
      this.postEvento.utiles = this.postEvento.utiles.filter(u => u.inventarioId !== util.inventarioId);
    },

    onMovimientoModalClose() {
      this.showMovimientoModal = false
    },
    onMovimientoSave(movement) {
      const foundSimilar = this.postEvento.utiles.filter(u => u.inventarioId === movement.inventarioId);
      if (foundSimilar.length) {
        return this.show({
            content: `Ya el útil ${movement.inventario.descripcion} está agregado a la lista.`,
            closable: true,
            time: 7_000,
            color:"warning"
        });
      }
      this.postEvento.utiles = [movement, ...this.postEvento.utiles];
      this.utilLaboralItem = {
        inventarioId: '0',
        cantidad: 1
      };
    },

    sendData() {
      this.isFormEventTypeValidated = false
      if (
        this.$refs.eventTypeForm.$el.checkValidity() &&
        this.postEvento.utiles.length
      ) {
        return this.submitEventos({ ...this.postEvento, empleadoId: this.empleado.id })
      }
      this.isFormEventTypeValidated = true;

      if (this.postEvento.utiles.length === 0) {
        this.show({
            content: 'Debes agregar al menos un útil laboral',
            closable: true,
            time: 7_000,
            color:"info"
        });
      }
    },

    clearEventos() {
      this.isFormEventTypeValidated = false;
      this.postEvento = {
        fecha: new Date(),
        observacion: null,
        autorizadoPor: null,
        empleadoId: 0,
        utiles: [],
      }
    },
  },

  watch: {
    showModal(value) {
      if (!value) {
        this.clearEventos()
      }
    },
    utilLaboral(newValue) {
      if (this.showModal) {
        this.postEvento = { ...newValue };
      }
    }
  },

  props: {
    showModal: Boolean,
    empleado: {
      type: Object,
      required: true,
    },

    utilLaboral: {
      type: Object,
      required: true,
    },

    inventarioList: {
      type: Array,
      default: [],
      required: true,
    },
  },
}
</script>
