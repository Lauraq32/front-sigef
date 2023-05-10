<template>
  <CModal size="md" :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Profesiones</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CSmartTable clickableRows :tableProps="{
          striped: true,
          hover: true,
        }" :tableHeadProps="{}" :activePage="1" header :items="profesionesList" :columns="columns" itemsPerPageSelect
          :itemsPerPage="5" :sorterValue="{ column: 'status', state: 'asc' }" pagination>
          <template #show_details="{ item, index }">
            <td class="py-2">
              <CButton color="primary" variant="outline" @click="getProfesion(item)">Seleccionar</CButton>
            </td>
          </template>
        </CSmartTable>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CIcon } from '@coreui/icons-vue'
import Api from '../../services/Profesiones'

export default {
  name: 'ProfessionDialog',
  components: {
    CSmartTable,
    CModal,
    CIcon
  },

  data: function () {
    return {
      profesionesList: [],
      tabPaneActiveKey: 1,
      reclutamientoObject: {},
      columns: [
        { key: 'name', label: 'Nombre', _style: { width: '50%' } },

        {
          key: 'show_details',
          label: '',
          _style: { width: '5%' },
          filter: false,
          sorter: false,
        },
      ],
    }
  },

  methods: {

    getProfesion(item) {
      this.$emit('select-profesion', item)
      this.closeModal()
    },
    listarProfesiones() {
      Api.getProfesiones().then(response => (
        this.profesionesList = response.data.data
      ))
    },
    closeModal() {
      this.$emit('closeModal')
    },
  },

  props: {
    showModal: Boolean,
  },
  mounted() {
    this.listarProfesiones()
  }
}
</script>
<style>
.padding-input {
  padding-right: 2.5rem;
}

.icon-input {
  padding: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  right: 2px;
}
</style>
