<template>
  <CSmartTable
    class="sticky-tops"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    header
    :items="utiles"
    :columns="columns"
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'cantidad', state: 'asc' }"
    pagination
    no-items-label="No hay útiles laborales agregados"
  >
    <template #controllers="{ item }">
      <td v-if="showDeleteButton">
        <CButton @click="$emit('remove', item)" color="danger" variant="ghost"
          >Remover</CButton>
      </td>
    </template>
    <template #util="{ item }">
      <td>
        {{ item.inventario.descripcion }}
      </td>
    </template>
    <template #tipo="{ item }">
      <td>
        {{ item.inventario.tipo }}
      </td>
    </template>
    <template #cantidad="{ item }">
      <td class="text-end">
        {{ formatNumber(item.cantidad) }}
      </td>
    </template>
  </CSmartTable>
</template>
<script>
import { CButton, CSmartTable } from '@coreui/vue-pro';
import { formatNumber } from '@/utils/format'

export default {
    name: 'MovimientoUtilTable',
    components: {
        CSmartTable,
        CButton
    },
    data() {
        return {
            formatNumber,
            columns: [
                { key: "util", label: "Util Laboral", _style: { width: "55%" } },
                { key: "tipo", label: "Tipo", _style: { width: "20%" } },
                { key: "cantidad", label: "Cantidad", _style: { width: "15%" } },
                {
                    key: "controllers",
                    label: "",
                    _style: { width: "10%" },
                    filter: false,
                    sorter: false,
                },
            ],
        };
    },
    emits: ['remove'],
    watch:{
      utiles(oldUtils){
        console.log(oldUtils)
      }
    },
    props: {
        utiles: {
            type: Array,
            required: true
        },
        showDeleteButton: Boolean
    },
    components: { CButton, CSmartTable }
}
</script>
