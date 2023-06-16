<template>
  <h3 class="text-center">Posiciones o Cargos</h3>

  <CargosTable
    :columns="columns"
    :footerItems="footerItem"
    :items="cargos"
    :showButtons="false"
  />
</template>
<script>
import CargosTable from '@/modules/rrhh/RegistroPersonal/components/CargosTable.vue'
import { mapActions } from 'pinia'

import { useToastStore } from '@/store/toast'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'

export default {
  components: {
    CargosTable,
  },
  data: function () {
    return {
      cargos: [],
      columns: [
        {
          key: 'nombre',
          label: 'Posición o cargo',
          _style: { width: '40%' },
        },
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

    getAllCargo() {
      Api.getAllCargos().then((response) => {
        this.cargos = response.data.data
        this.footerItem[0] = `Total Items ${response.data.data.length}`
      })
    },
  },
  mounted() {
    this.getAllCargo()
  },
}
</script>
