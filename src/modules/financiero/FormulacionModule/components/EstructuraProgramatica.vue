<template>
  <h3 class="text-center">Estructuras Prográmaticas</h3>
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
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    :footer="footerItem"
    header
    :items="estructuraProgramatica"
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
  </CSmartTable>
</template>
<script>
import { useRegistroStore } from '../store/Formulacion/EstProgramatica'
import { CSmartTable } from '@coreui/vue-pro'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Api from '../services/FormulacionServices'

export default {
  components: {
    CSmartTable,
  },
  data: () => {
    return {
      estructuraProgramatica: [],
      itemsCount: null,
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
      columns: [
        {
          key: 'pnap',
          label: 'Pnap',
          sorter: false,
          _style: { width: '5%' },
        },
        { key: 'programa', label: 'Programa', _style: { width: '5%' } },
        { key: 'proyecto', label: 'Proyecto', _style: { width: '5%' } },
        { key: 'actObra', label: 'Actividad Obra', _style: { width: '5%' } },
        { key: 'ccontrol', label: 'Control', _style: { width: '5%' } },
        { key: 'nombre', label: 'Denominación', _style: { width: '10%' } },
        {
          key: 'unidadRespon',
          label: 'Unidad Responsable',
          _style: { width: '5%' },
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
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['estructuraProgramatica', '']),
  },
  methods: {
    ...mapActions(useRegistroStore, ['getEstructura']),

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
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fReporte_FP%2fRep_Estrucutra_Programatica&rs:Command=Render`,
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
    Api.getEstProgramatica().then((response) => {
      this.estructuraProgramatica = response.data.data
      this.itemsCount = this.estructuraProgramatica.length
      this.footerItem[0].label = `Total items: ${this.itemsCount}`
    })
  },
}
</script>
