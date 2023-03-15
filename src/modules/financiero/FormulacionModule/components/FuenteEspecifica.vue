<template>
  <h3 class="text-center">Fuente Específica</h3>
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
    :items="fuenteLista"
    :columns="columns"
    itemsPerPageSelect
    :itemsPerPage="5"
    columnFilter
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
  <template #descripcion="{ item }">
      <td>
        {{ item.ctgFuente.descripcion }}
      </td>
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
      fuenteLista: [],
      columns: [
        { key: 'id', label: 'Fuente Específica', _style: { width: '10%' } },
        {
          key: 'ctgFuenteId',
          label: 'Fuente',
          sorter: false,
          _style: { width: '10%' },
        },
        {
          key: 'descripcion',
          label: 'Descripción',
          _style: { width: '20%' },
        },
        {
          key: 'detalle',
          label: 'Detalle',
          _style: { width: '20%' },
        },
      ],
      details: [],
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
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fReporte_FP%2fRep_Fuente_Financiamiento&rs:Command=Render`,
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
    getFuente(){
      Api.getFuente().then((response) => {
        this.fuenteLista = response.data.data
      })
    },
  },
  mounted() {
    this.getFuente()
  },
}
</script>
