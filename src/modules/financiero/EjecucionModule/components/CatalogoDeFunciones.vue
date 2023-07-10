<template>
  <h3 class="text-center">Catal&oacute;go de Funciones</h3>

  <TablecatalogoDeFunciones :datosTable="catalogoFunciones" />
</template>

<script>
import Api from '../services/EjecucionServices'
import { CSmartTable } from '@coreui/vue-pro'
import TablecatalogoDeFunciones from './Table/TableCatalogoFunciones.vue'

export default {
  name: 'catalogoDeFunciones',
  components: {
    CSmartTable,
    TablecatalogoDeFunciones,
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
