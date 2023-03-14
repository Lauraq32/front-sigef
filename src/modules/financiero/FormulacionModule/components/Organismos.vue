<template>
  <h3 class="text-center">Organismos</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable
    clickableRows
    :tableProps="{
     striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    
    header
    :items="items"
    :columns="columns"
    itemsPerPageSelect
    :itemsPerPage="5"
    columnFilter
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #codigo="{ item }">
      <td class="text-center">
      {{item.codigo}}
      </td>
    </template>
    <template #sGrupo="{ item }">
      <td class="text-center">
      {{item.sGrupo}}
      </td>
    </template>
    <template #organismoFinanciador="{ item }">
      <td class="text-center">
      {{item.organismoFinanciador}}
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
import Api from '../services/FormulacionServices'
export default {
  components: {
    CSmartTable,
  },
  data: () => {
    return {
      columns: [
        { key: 'codigo', label: 'Grupo' },
        { key: 'sGrupo', label: 'Subgrupo', _style: { width: '20%' } },
        {
          key: 'organismoFinanciador',
          label: 'Organismo Financiero',
          filter: false,
          sorter: false,
          _style: { width: '20%' },
        },
        {
          key: 'detalle',
          label: 'Denominación',
          _style: { width: '40%' },
        },
      
      ],
      details: [],
      items:[]
    }
  },
  methods: {
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
    IngresoReport() {
      window
        .open(
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fReporte_FP%2fRep_Fuente_Organismo_Financiador&rs:Command=Render`,
          '_blank',
        )
        .focus()
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
    Api.getListarOrganismo().then(response => {
      this.items = response.data.data
    })
  },
}
</script>
