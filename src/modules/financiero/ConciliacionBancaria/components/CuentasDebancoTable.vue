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
    <template #fechaFinConciliacion="{ item }">
      <td>
        {{ formatDate(item.fechaFinConciliacion) }}
      </td>
    </template>
    <template #show_details="{ item }" v-if="showButtons">
      <td class="py-2">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item)"
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
    toggleDetails(item) {
      this.$emit('edit', item)
    },

    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
  },
}
</script>
