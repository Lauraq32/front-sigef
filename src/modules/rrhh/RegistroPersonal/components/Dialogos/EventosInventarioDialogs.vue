<template>
  <CModal
    size="lg"
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
            <div class="col-4 col-label">Util Laboral</div>
            <div class="col-8">
              <CFormLabel>Instituci&oacute;n Otorgante</CFormLabel>
              <v-select v-model="postEvento.utilId" :options="utils"></v-select>
              <!-- <CFormSelect v-model="postEvento.utilId" id="validationCustom04">
                <option
                  v-for="utils in utils"
                  :key="utils.id"
                  :value="utils.id"
                >
                  {{ utils.descripcion }}
                </option>
              </CFormSelect> -->
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-4 col-label">Tipo</div>
            <div class="col-8">
              <CFormSelect v-model="postEvento.tipo" id="validationCustom04">
                <option value="antregado">Entregado</option>
                <option value="Retornado">Retornado</option>
                <option value="abastecimiento">Abastecimiento</option>
              </CFormSelect>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-4 col-label">Empleados</div>
            <div class="col-8">
              <CFormSelect
                v-model="postEvento.empleadoId"
                id="validationCustom04"
              >
                <option
                  v-for="empleados in this.empleados"
                  :key="empleados.id"
                  :value="empleados.id"
                >
                  {{ empleados.nombres }}
                </option>
              </CFormSelect>
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
            <div class="col-4 col-label">Fecha</div>
            <div class="col-8">
              <CFormInput type="date" v-model="postEvento.fecha" />
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
            v-on:click="submitEventos"
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
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

export default {
  name: 'EventoInventario',
  components: {
    vSelect,
  },

  data: () => {
    return {
      postEvento: {
        utilId: 0,
        fecha: new Date(Date.now()),
        cantidad: null,
        tipo: 'entregado',
        empleadoId: 0,
      },
    }
  },

  methods: {
    closeModal() {
      this.$emit('closeModal', false)
    },

    submitEventos() {
      this.$emit('saveEvents', this.postEvento)
    },
  },

  props: {
    showModal: Boolean,
    inventario: {
      type: Object,
      default: {},
      required: true,
    },

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
