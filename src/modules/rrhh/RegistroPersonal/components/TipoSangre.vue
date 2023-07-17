<template>
  <h3 class="text-center">Tipo de sangre</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
      >
    </div>
  </div>
  <hr />
  <TipoSangreTable
    class="sticky-top"
    :columns="columns"
    :footerItems="footerItem"
    :items="sangres"
  >
  </TipoSangreTable>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'
import TipoSangreTable from '@/modules/rrhh/RegistroPersonal/components/TipoSangreTable.vue'

export default {
  components: {
    CSmartTable,
    CModal,
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
