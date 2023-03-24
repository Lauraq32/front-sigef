<template>
  <h3 class="text-center">Año Fiscal</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            ;(lgDemo = true), clearModal1(), disabledCheckbox()
          }
        "
        >Agregar</CButton
      >
    </div>
  </div>

  <CSmartTable
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    header
    :items="anioFiscal"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #fechaInicial="{ item }">
      <td>
        {{ formatDate(item.fechaInicial) }}
      </td>
    </template>
    <template #fechaFinal="{ item }">
      <td>
        {{ formatDate(item.fechaFinal) }}
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
        </CButton>
      </td>
    </template>
    <template #details="{ item }">
      <CCollapse :visible="this.details.includes(item._id)">
        <CCardBody>
          <h4>
            {{ item.username }}
          </h4>
          <p class="text-muted">User since: {{ item.registered }}</p>
          <CButton size="sm" color="info" class=""> User Settings </CButton>
          <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
        </CCardBody>
      </CCollapse>
    </template>
  </CSmartTable>
  <CModal
  backdrop="static"
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Año Fiscal</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate>
          <CCol :md="12">
            <CFormLabel>Año Fiscal</CFormLabel>
            <CFormInput disabled v-model="postAnoFiscal.anio" />
          </CCol>

          <CCol :md="6">
            <CCol :md="12">
              <CFormLabel>Fecha Inicio</CFormLabel>
              <CFormInput
                name="fechaInicio"
                @change="changeDate($event)"
                type="date"
                v-model="initialDate"
              />
            </CCol>
            <CCol :md="12">
              <CFormLabel>Fecha Final</CFormLabel>
              <CFormInput
                name="fechaFinal"
                @change="changeDate($event)"
                type="date"
                v-model="finalDate"
              >
              </CFormInput>
            </CCol>
          </CCol>
          <CCol :md="6">
            <CCol :md="12">
              <CFormLabel>Comprobante Gasto</CFormLabel>
              <CFormInput v-model="postAnoFiscal.compGastos"> </CFormInput>
            </CCol>
            <CCol :md="12">
              <CFormLabel>Comprobante Ingreso</CFormLabel>
              <CFormInput v-model="postAnoFiscal.compIngresos"> </CFormInput>
            </CCol>
          </CCol>

          <div class="row">
            <div class="col-6">
              <CCol :md="5">
                <CFormLabel>Estatus</CFormLabel>
                <CFormSelect v-model="postAnoFiscal.estatus">
                  <option>ACTIVO</option>
                  <option>ABIERTO</option>
                  <option>CERRADO</option>
                </CFormSelect>
              </CCol>
            </div>
            <div class="col-6" style="position: relative; left: 11px">
              <div class="form-check" style="margin-top: 39px">
                <label class="form-check-label" for="flexCheckDefault">
                  Aprobado
                </label>
                <input
                  v-model="isChecked"
                  :disabled="isDisabled"
                  class="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  v-on:click="updateModelValue"
                />
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="
                () => {
                  lgDemo = false
                }
              "
            >
              Cancelar
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="submitForm">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/EjecucionServices'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      isChecked: false,
      anioFiscal: [],
      isDisabled: true,
      postAnoFiscal: {
        id: 0,
        esAprovado: 0,
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        compGastos: null,
        compIngresos: null,
        estatus: null,
        anio: 0,
        fechaInicial: null,
        fechaFinal: null,
      },

      columns: [
        { key: 'anio', label: 'Año Fiscal', _style: { width: '40%' } },
        {
          key: 'fechaInicial',
          label: 'Fecha Inicio',
          _style: { width: '40%' },
        },
        { key: 'fechaFinal', label: 'Fecha Final', _style: { width: '40%' } },
        { key: 'estatus', label: 'Estatus', _style: { width: '40%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
      details: [],

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    updateModelValue() {
      this.postAnoFiscal.esAprovado = this.isChecked ? 0 : 1
      console.log(this.postAnoFiscal.esAprovado)
    },

    changeDate({ target: { name, value } }) {
      if (name == 'fechaInicio') {
        const selectedDate = new Date(`${value}T00:00:00`)
        const selectedYear =
          selectedDate.getFullYear().toString().substring(2, 4) + '0000'
        this.postAnoFiscal.compGastos = selectedYear
        this.postAnoFiscal.compIngresos = selectedYear
        this.postAnoFiscal.anio = selectedDate.getFullYear().toString()
      }
    },

    enableCheckbox() {
      this.isDisabled = false
    },

    disabledCheckbox() {
      this.isDisabled = true
    },

    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    getAnioFiscalAll() {
      Api.getAnioFiscal().then((response) => {
        this.anioFiscal = response.data.data
      })
    },
    toggleDetails(item) {
      this.enableCheckbox()
      this.id = item.id
      this.postAnoFiscal = { ...item }
      this.lgDemo = true
    },
    clearModal1() {
      this.postAnoFiscal = {
        id: 0,
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        compGastos: null,
        compIngresos: null,
        estatus: null,
        anio: 0,
        fechaInicial: null,
        fechaFinal: null,
      }
    },
    getBadge(status) {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          'primary'
      }
    },
    submitForm(event) {
      event.preventDefault()
      event.stopPropagation()
      if (this.id) {
        Api.putAnioFiscal(this.id, this.postAnoFiscal)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
            })
          })
          .catch(({response}) => {
            this.show({
              content: response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
        this.clearModal1()
        this.lgDemo = false
      } else {
        Api.postAnioFiscal(this.postAnoFiscal)
          .then((response) => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            this.clearModal1()
            this.lgDemo = false
          })
          .catch(({response}) => {
            this.show({
              content: response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          }),
          this.getAnioFiscalAll()
       
      }
    },
  },

  computed: {
    initialDate: {
      get() {
        if (
          this.postAnoFiscal.fechaInicial !== null &&
          this.postAnoFiscal.fechaInicial?.toString() !== 'Invalid Date'
        ) {
          let date = this.postAnoFiscal.fechaInicial
          if (typeof this.postAnoFiscal.fechaInicial === 'string') {
            date = new Date(this.postAnoFiscal.fechaInicial)
            return date.toISOString().split('T')[0]
          }
        } else {
          return
        }
      },
      set(value) {
        return (this.postAnoFiscal.fechaInicial = new Date(`${value}T00:00:00`))
      },
    },
    finalDate: {
      get() {
        if (
          this.postAnoFiscal.fechaFinal !== null &&
          this.postAnoFiscal.fechaFinal?.toString() !== 'Invalid Date'
        ) {
          let date = this.postAnoFiscal.fechaFinal
          if (typeof this.postAnoFiscal.fechaFinal === 'string') {
            date = new Date(this.postAnoFiscal.fechaFinal)
          }

          return date.toISOString().split('T')[0]
        } else {
          return
        }
      },
      set(value) {
        return (this.postAnoFiscal.fechaFinal = new Date(`${value}T00:00:00`))
      },
    },
  },

  mounted() {
    this.getAnioFiscalAll()
  },
}
</script>
