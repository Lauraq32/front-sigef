<template>
  <h3 class="text-center">Catalogo de Funciones</h3>
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            grupoModal = true
          }
        "
        >Agregar</CButton
      >
    </div>
  </div>

  <CSmartTable
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer="footerItem"
    header
    :items="catalogoFunciones"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #show_details="{ item }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="editarGrupo(item)"
        >
          Editar
        </CButton>
      </td>
    </template>
  </CSmartTable>
</template>

<script>
import Api from '../services/EjecucionServices'
import { CSmartTable } from '@coreui/vue-pro'
export default {
  name: 'catalogoDeFunciones',
  components: {
    CSmartTable,
  },
  data: () => {
    return {
      catalogoFunciones: [],
    }
  },

  methods: {
    getCatalogoFunciones() {
      Api.getCatalogoFunciones().then((response) => {
        this.catalogoFunciones = response.data.data
      })
    },
  },

  mounted() {
    this.getCatalogoFunciones()
  },
}
</script>
