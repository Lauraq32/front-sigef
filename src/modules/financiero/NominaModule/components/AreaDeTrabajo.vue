<template>
  <h3 class="text-center">Áreas de Trabajo</h3>

  <AreaTrabajoTable
    :columns="columns"
    :footerItems="footerItem"
    :items="AreasTrabajos"
    :showButtons="false"
  />
</template>
<script>
import AreaTrabajoTable from '@/modules/rrhh/RegistroPersonal/components/AreaTrabajoTable.vue'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'

export default {
  components: {
    AreaTrabajoTable,
  },
  data: function () {
    return {
      AreasTrabajos: [],
      columns: [
        { key: 'descripcion', label: 'Programa', _style: { width: '40%' } },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },
      ],
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),

    getAllAreaTrabajo() {
      Api.getAreaTrabajos().then((response) => {
        this.AreasTrabajos = response.data.data
        this.footerItem[0] = `Total Items ${response.data.data.length}`
      })
    },
  },
  mounted() {
    this.getAllAreaTrabajo()
  },
}
</script>
