<template>
      
  <h3 class="text-center">Categoria</h3>
  <div class="table-headers">
    <div class="p-2">
      <CButton
        style="font-weight: bold"
        color="info"
        @click="
          () => {
            lgDemo = true
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
    :footer="footerItem"
    header
    :items="categorias"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item }">
      <td class="py-1">
        <CButton
          class="mt-1"
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
      <CModalTitle>Categorias</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="4">
            <CFormLabel for="validationCustom01">Descripcion</CFormLabel>
            <CFormInput
              v-model="postCategorias.descripcion"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom01">Cuenta del Gasto</CFormLabel>
            <CFormInput
              v-model="postCategorias.cuentaDebido"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <CCol :md="4">
            <CFormLabel for="validationCustom01"
              >Cuenta Depreciable Acumulada</CFormLabel
            >
            <CFormInput
              v-model="postCategorias.cuentaDepreciacionAcumulada"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <div class="form-check">
            <label class="form-check-label" for="flexCheckDefault">
              Depreciable?
            </label>
            <input
              class="form-check-input"
              type="checkbox"
              v-model="postCategorias.depreciable"
              id="flexCheckDefault"
            />
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              v-on:click="submitForm"
              type="button"
              class="btn btn-primary"
            >
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { useRegistroStore } from '../store/ActivoFijo/Categorias'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
 
import { useToastStore } from '@/store/toast'

import Api from '../services/ActivoFijoServices'
export default {
  components: {
    CSmartTable,
    CModal,
      
  },
  data: () => {
    return {
      postCategorias: {
        id: 0,
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        descripcion: null,
        cuentaDebido: null,
        cuentaCredito: null,
        cuentaDepreciacionAcumulada: null,
        depreciable: true,
        totalMontoCompra: 0,
        montoDepreciableAcumulado: 0,
        totalCosto: 0,
        totalAdiciones: 0,
        totalRetiro1: 0,
        totalOtros: 0,
        totalTransfer: 0,
        totalSaldoInicial: 0,
        totalDepreciacionAcumulada: 0,
        totalDepreciacionPeriodo: 0,
        totalRetiro2: 0,
        totalSaldoFinal: 0,
        totalValorLibro: 0,
      },

      validatedCustom01: null,
      lgDemo: false,
      columns: [
        { key: 'id', label: 'Código', _style: { width: '40%' } },
        { key: 'descripcion', label: 'Descripcion', _style: { width: '40%' } },
        {
          key: 'cuentaDebido',
          label: 'Cuenta de gastos',
          _style: { width: '40%' },
        },
        {
          key: 'cuentaDepreciacionAcumulada',
          label: 'Cuenta Despreciacion Acumulada',
          _style: { width: '40%' },
        },
        {
          key: '',
          label: 'Monto Ultimo Corte',
          _style: { width: '40%' },
        },
        {
          key: 'depreciable',
          label: 'Despreciable?',
          _style: { width: '40%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
      footerItem: [
        {
          label: 'Total presupuesto',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },

      ],
      details: [],
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['categorias']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getCategoria', 'addCategoria']),
    ...mapActions(useToastStore, ['show']),

    submitForm() {
      if (this.id) {
        Api.editCategoria(this.id, this.postCategorias).then((response) => {
          this.lgDemo = false
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
          setTimeout(this.getCategoria, 500)
          this.postCategorias = {
            id: 0,
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            descripcion: null,
            cuentaDebido: null,
            cuentaCredito: null,
            cuentaDepreciacionAcumulada: null,
            depreciable: true,
            totalMontoCompra: 0,
            montoDepreciableAcumulado: 0,
            totalCosto: 0,
            totalAdiciones: 0,
            totalRetiro1: 0,
            totalOtros: 0,
            totalTransfer: 0,
            totalSaldoInicial: 0,
            totalDepreciacionAcumulada: 0,
            totalDepreciacionPeriodo: 0,
            totalRetiro2: 0,
            totalSaldoFinal: 0,
            totalValorLibro: 0,
            variacion: 0,
          }
        })
        setTimeout(this.getCategoria, 500)
      } else {
        setTimeout(this.getCategoria, 500)
        Api.postCategoria(this.postCategorias)
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
          })
        this.lgDemo = true
        setTimeout(this.getCategoria, 500)
        ;(this.postCategorias = {
          id: 0,
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          descripcion: null,
          cuentaDebido: null,
          cuentaCredito: null,
          cuentaDepreciacionAcumulada: null,
          depreciable: true,
          totalMontoCompra: 0,
          montoDepreciableAcumulado: 0,
          totalCosto: 0,
          totalAdiciones: 0,
          totalRetiro1: 0,
          totalOtros: 0,
          totalTransfer: 0,
          totalSaldoInicial: 0,
          totalDepreciacionAcumulada: 0,
          totalDepreciacionPeriodo: 0,
          totalRetiro2: 0,
          totalSaldoFinal: 0,
          totalValorLibro: 0,
          variacion: 0,
        }),
          (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getCategoria, 500)
      }
    },
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
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
    toggleDetails(item) {
      if (item.categorias !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      Api.getCategoriaByID(item.id).then((response) => {
        this.postCategorias = response.data.data
        this.id = item.id
      })
    },
  },
  mounted() {
    this.getCategoria()
  },
}
</script>
