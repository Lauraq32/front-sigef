<template>
  <h3 class="text-center">Direccion o Dependencias</h3>
  <DireccionDepenciaTable
    :columns="columns"
    :footerItems="footerItem"
    :items="items"
    :showButtons="false"
  />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'

import { useToastStore } from '@/store/toast'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import DireccionDepenciaTable from '@/modules/rrhh/RegistroPersonal/components/DireccionDepenciaTable.vue'
export default {
  components: {
    CSmartTable,
    CModal,
    DireccionDepenciaTable,
  },
  data: function () {
    return {
      items: [],
      columns: [
      { key: 'nombre', label: 'Nombre', _style: { width: '40%' } },
        { key: 'estructura', label: 'Estructura Programática', _style: { width: '40%' } },
        
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
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    getAllDireccionDependecia() {
      Api.getDireccionDependecia().then((response) => {
        this.items = response.data.data
        this.footerItem[0] = `Total Items ${response.data.data.length}`
      })
    },
  },
  mounted() {
    this.getAllDireccionDependecia()
  },
}
</script>
