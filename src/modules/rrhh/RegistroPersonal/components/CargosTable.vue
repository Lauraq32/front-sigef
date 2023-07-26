<template>
  <CSmartTable
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    header
    :footer="footerItems"
    :items="items"
    :columns="columns"
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'nombre', state: 'asc' }"
    pagination
  >
    <template #show_details="{ item }" v-if="showButtons">
      <td class="py-2">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="getCargosById(item)"
          >Editar</CButton
        >
      </td>
    </template>
  </CSmartTable>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
export default {
  components: {
    CSmartTable,
  },
  props: {
    columns: Array,
    footerItems: Array,
    items: Array,
    showButtons: Boolean,
  },
  emits: ['edit'],
  methods: {
    getCargosById(item) {
      this.$emit('edit', item)
    },
  },
}
</script>
