<template>
  <h3 class="text-center">Año Fiscal</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            lgDemo = true, clearModal1()
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
            <CFormLabel>Año Fiscal NO.</CFormLabel>
            <CFormInput disabled v-model="postAnoFiscal.anio" />
          </CCol>

          <CCol :md="6">
            <CCol :md="12">
              <CFormLabel>Fecha Inicio</CFormLabel>
              <CFormInput
                name="fechaInicio"
                @change="changeDate($event)"
                type="date"
                v-model="postAnoFiscal.fechaInicial"
              />
            </CCol>
            <CCol :md="12">
              <CFormLabel>Fecha Final</CFormLabel>
              <CFormInput
                name="fechaFinal"
                @change="changeDate($event)"
                type="date"
                v-model="postAnoFiscal.fechaFinal"
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

          <CCol :md="3">
            <CFormLabel>Estatus</CFormLabel>
            <CFormSelect v-model="postAnoFiscal.estatus">
              <option>Activo</option>
              <option>Abierto</option>
              <option>Cerrado</option>
            </CFormSelect>
          </CCol>
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
      anioFiscal: [],
      postAnoFiscal: {
        id: 0,
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        compGastos: null,
        compIngresos: null,
        estatus: null,
        anio: 0,
        fechaInicial: new Date(Date.now()),
        fechaFinal: new Date(Date.now()),
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
    changeDate({ target: { name, value } }) {
      if (name == 'fechaInicio') {
        const selectedDate = new Date(value)
        const selectedYear =
          selectedDate.getFullYear().toString().substring(2, 4) + '0000'
        this.postAnoFiscal.compGastos = selectedYear
        this.postAnoFiscal.compIngresos = selectedYear
        this.postAnoFiscal.anio = selectedDate.getFullYear().toString()
      }
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
        console.log(response.data)
      })
    },
    toggleDetails(item) {
      this.id = item.id
      this.postAnoFiscal = item
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
        fechaInicial: new Date(Date.now()),
        fechaFinal: new Date(Date.now()),
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
          .catch((error) => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      } else {
        Api.postAnioFiscal(this.postAnoFiscal)
          .then((response) => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
          .catch((error) => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          }),
          this.getAnioFiscalAll()
      }
    },
  },

  mounted() {
    this.getAnioFiscalAll()
  },
}
</script>
