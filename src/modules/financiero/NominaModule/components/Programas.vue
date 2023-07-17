<template>
  <h3 class="text-center mb-4">Dirección o Dependencia</h3>
  <DireccionDepenciaTable
    :columns="columns"
    :footerItems="footerItem"
    :items="items"
    :showButtons="false"
  />
</template>
<script>
import { mapActions } from 'pinia'

import { useToastStore } from '@/store/toast'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import DireccionDepenciaTable from '@/modules/rrhh/RegistroPersonal/components/DireccionDepenciaTable.vue'
export default {
  components: {
    DireccionDepenciaTable,
  },
  data: function () {
    return {
      items: [],
      columns: [
        { key: 'nombre', label: 'Nombre', _style: { width: '40%' } },
        {
          key: 'estructura',
          label: 'Estructura Programática',
          _style: { width: '40%' },
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
