<template>
  <h3 class="text-center">Cat&aacute;logo de funciones</h3>
  <CSmartTable
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    header
    :items="Catalogos"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :footer="footerItem"
    :itemsPerPage="5"
    :items-per-page-options="[5, 10, 20, 50, 100, 150]"
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
      Catalogos: [],
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
        { key: 'grupo', label: 'Finalidad' },
        { key: 'sGrupo', label: 'Función' },
        { key: 'funcion', label: 'Sub-Función', _style: { width: '25%' } },
        { key: 'detalle', label: 'Denominación' },
      ],
      details: [],
      items: [],
    }
  },
  methods: {
    getAllCatagolos() {
      Api.getCatalogosFuncion().then((response) => {
        this.Catalogos = response.data.data
        this.items = response.data.data
        this.itemsCount = this.items.length
        this.footerItem[0].label = `Total items: ${this.itemsCount}`
      })
    },
  },
  mounted() {
    this.getAllCatagolos()
  },
}
</script>
