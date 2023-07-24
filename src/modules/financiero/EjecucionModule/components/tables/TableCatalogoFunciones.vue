<template>
  <CSmartTable
    class="sticky-top mt-5"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer="footerItem"
    header
    :items="datosTable"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #grupo="{ item }">
      <td class="text-center">
        {{ item.grupo }}
      </td>
    </template>
    <template #funcion="{ item }">
      <td class="text-center">
        {{ item.funcion }}
      </td>
    </template>
    <template #sGrupo="{ item }">
      <td class="text-center">
        {{ item.sGrupo }}
      </td>
    </template>
  </CSmartTable>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
export default {
  name: 'TablecatalogoDeFunciones',
  components: {
    CSmartTable,
  },
  data: () => {
    return {
      catalogoFunciones: [],
      columns: [
        {
          label: 'Finalidad',
          key: 'grupo',
          _style: { width: '19%' },
        },
        {
          label: 'Función',
          key: 'funcion',
          _style: { width: '20%' },
        },
        {
          label: 'Sub-Función',
          key: 'sGrupo',
          _style: { width: '20%' },
        },
        {
          label: 'Denominación',
          key: 'detalle',
          _style: { width: '20%' },
        },
      ],
    }
  },

  props: {
    datosTable: {
      type: Array,
      required: true,
    },
  },
}
</script>
