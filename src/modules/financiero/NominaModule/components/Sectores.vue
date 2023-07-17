<template>
  <h3 class="text-center">Sectores</h3>
  <SectorTable
    :columns="columns"
    :footerItems="footerItem"
    :items="sectores"
    :showButtons="false"
  />
</template>

<script>
import { mapActions } from 'pinia'

import { useToastStore } from '@/store/toast'
import SectorTable from '@/modules/rrhh/RegistroPersonal/components/SectoresTable.vue'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
export default {
  components: {
    SectorTable,
  },
  data: function () {
    return {
      sectores: [],
      columns: [
        { key: 'nombre', label: 'Sectores', _style: { width: '90%' } },
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
    getAllSector() {
      Api.getAllSector().then((response) => {
        this.sectores = response.data.data
        this.footerItem[0] = `Total Items ${response.data.data.length}`
      })
    },
  },
  mounted() {
    this.getAllSector()
  },
}
</script>
