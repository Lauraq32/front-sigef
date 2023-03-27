<template>
  <h3 class="text-center">Ejecución de ingresos</h3>
  <div class="table-headers">
    <div class="d-inline p-2"></div>
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
    :items="this.$store.state.Formulacion.proyecto"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
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
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      validatedCustom01: null,
      lgDemo: false,
      columns: [
        {
          key: '#Comprobante',
          label: '#Comprobante',
          _style: { width: '40%' },
        },
        { key: 'Fecha', label: 'Fecha', _style: { width: '40%' } },
        { key: 'Etapa', label: 'Etapa', _style: { width: '40%' } },
        { key: 'Forma/pago', label: 'Forma/pago', _style: { width: '40%' } },
        {
          key: 'Beneficiario',
          label: 'Beneficiario',
          _style: { width: '40%' },
        },
        {
          key: 'Cuenta de banco',
          label: 'Cuenta de banco',
          _style: { width: '40%' },
        },
        { key: 'Total bruto', label: 'Total bruto', _style: { width: '40%' } },
        {
          key: 'Total retencion',
          label: 'Total retencion',
          _style: { width: '40%' },
        },
        { key: 'Valor Neto', label: 'Valor Neto', _style: { width: '40%' } },
        { key: 'Numero', label: 'Numero', _style: { width: '40%' } },
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
  methods: {
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
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },
  },
  mounted() {
    this.$store.dispatch('Formulacion/getProyectos')
  },
}
</script>
