<template>
  <h3 class="text-center">Catal&oacute;go de Funciones</h3>
  <TablecatalogoDeFunciones :datosTable="catalogoFunciones" />
</template>

<script>
import Api from '@/modules/financiero/EjecucionModule/services/EjecucionServices'
import { CSmartTable } from '@coreui/vue-pro'
import TablecatalogoDeFunciones from '@/modules/financiero/EjecucionModule/components/Table/TableCatalogoFunciones.vue'
export default {
  name: 'catalogoDeFunciones',
  components: {
    TablecatalogoDeFunciones,
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
