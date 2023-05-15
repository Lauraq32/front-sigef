<template>
  <h3 class="text-center">Tipo de sangre</h3>

  <TipoSangreTable
    class="sticky-top"
    :columns="columns"
    :footerItems="footerItem"
    :items="sangres"
  />
</template>

<script>
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import TipoSangreTable from '@/modules/rrhh/RegistroPersonal/components/TipoSangreTable.vue'

export default {
  components: {
    TipoSangreTable,
  },
  data: () => {
    return {
      sangres: [],
      columns: [
        { key: 'nombre', label: 'Tipo de Sangre', _style: { width: '40%' } },
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
    getAllSangre() {
      Api.tipoSangreList().then((response) => {
        this.sangres = response.data.data
      })
    },
  },
  mounted() {
    this.getAllSangre()
  },
}
</script>
