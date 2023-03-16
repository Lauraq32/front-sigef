<template>
  <h3 class="text-center">Fuentes Financiamiento</h3>
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
    :footer="footerItem"
    header
    :items="fuenteList"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
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
      fuenteList: [],
      columns: [
        { key: 'grupo', label: 'Grupo', _style: { width: '2%',  } },
        { key: 'origen', label: 'Origen', _style: { width: '5%' } },
        {
          key: 'id',
          label: 'Fuente',
          sorter: false,
          _style: { width: '2%' },
        },
        {
          key: 'descripcion',
          label: 'Descripción',
          _style: { width: '10%' },
        },
        { key: 'detalle', label: 'Detalle', _style: { width: '20%' } },
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
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fReporte_FP%2fRep_Fuente_Especifica&rs:Command=Render`,
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
    getAllFuente() {
      Api.getFuenteEspecifica().then((response) => {
        this.fuenteList = response.data.data
      })
    }
  },
  mounted() {
    this.getAllFuente()
  },
}
</script>
