<template>
  <h3 class="text-center">Tipo de retenciones</h3>
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
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
  <CSmartTable class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    :footer="footerItem"
    header
    :items="[]"
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
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item, index)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
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
    size="md"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Tipo de retenciones</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="2">
            <CFormLabel for="validationCustom01">Código</CFormLabel>
            <CFormInput id="validationCustom01" disabled />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="10">
            <CFormLabel for="validationCustom02">Beneficiario</CFormLabel>
            <CFormSelect id="validationCustom02">
              <option>DIRECCION GENERAL DE IMPUESTOS INTERNOS</option>
              <option>BENEFICIARIO 2</option>
              <option>BENEFICIARIO 3</option>
              <option>BENEFICIARIO 4</option>
              <option>BENEFICIARIO 5</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="row">
            <CCol :md="6">
              <CFormLabel for="validationCustom03">Tipo retención</CFormLabel>
              <CFormSelect id="validationCustom03">
                <option>PROCESO</option>
                <option>INFORMATIVO</option>
              </CFormSelect>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CCol>
            <CCol :md="6">
              <CFormLabel for="validationCustom04">Operación</CFormLabel>
              <CFormSelect id="validationCustom04">
                <option>MULTIPLICAR</option>
                <option>DIVIDIR</option>
                <option>N/A</option>
              </CFormSelect>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CCol>
          </div>
          <div class="row">
            <CCol :md="5">
              <CFormLabel for="validationCustom06"
                >Valor o % de retención:</CFormLabel
              >
              <CFormInput id="validationCustom06" />

              <CFormFeedback valid> Exito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CCol>

            <CCol :md="6" style="margin-top: 37px">
              <CFormCheck id="flexCheckDefault" label="Valor calculado" />
            </CCol>
          </div>
          <CCol :md="12">
            <CFormLabel for="validationCustom05">Afecta el 815:</CFormLabel>
            <CFormCheck
              inline
              type="radio"
              name="inlineRadioOptions"
              id="inlineCheckbox1"
              value="option1"
              label="Restando"
            />
            <CFormCheck
              inline
              type="radio"
              name="inlineRadioOptions"
              id="inlineCheckbox2"
              value="option2"
              label="Sumando"
            />

            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
//import { useRegistroStore } from '../store/Ejecucion/anioFiscal'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
//import Api from '../services/EjecucionServices'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      postAnoFiscal: {
        id: 0,
        ayuntamientoId: 0,
        compGastos: 0,
        compIngresos: 0,
        estatus: null,
      },

      columns: [
        { key: 'Año Fiscal', label: 'Código', _style: { width: '40%' } },
        { key: 'Desde', label: 'Detalle', _style: { width: '40%' } },
        { key: 'Hasta', label: 'Tipo retención', _style: { width: '40%' } },
        { key: 'Estatus', label: 'Operación', _style: { width: '40%' } },
        {
          key: 'Año Fiscal',
          label: 'Valor o % a retener',
          _style: { width: '40%' },
        },
        { key: 'Desde', label: 'Calculada', _style: { width: '40%' } },
        { key: 'Hasta', label: 'Modo afecta', _style: { width: '40%' } },
        { key: 'Estatus', label: 'Beneficiario', _style: { width: '40%' } },
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
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },
      ],
      details: [],

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {
    // ...mapStores(useRegistroStore),
    // ...mapState(useRegistroStore, ['anioFiscal']),
  },

  methods: {
    // ...mapActions(useRegistroStore, ['getAnioFiscal', 'addAnioFiscal']),

    toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
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

    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },
    submitForm() {},
  },

  mounted() {},
}
</script>
