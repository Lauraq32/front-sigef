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
  <CSmartTable class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer="footerItem"
    header
    :items="tipoSangres"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
  </CSmartTable>
</template>

<script>
import { useRegistroStore } from '../store/RegistroPersonal/TipoSangre'
import { computed, onMounted } from '@vue/runtime-core'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'

export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      columns: [
        { key: 'tipoDeSangre', label: 'Tipo de Sangre', _style: { width: '40%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
      details: [],
    }
  },
  methods: {
    getTipoDeSangreById(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },
  },
  mounted() {
    this.$store.dispatch('AdministrativoModule/getUsuarios')
  },
}
</script>
