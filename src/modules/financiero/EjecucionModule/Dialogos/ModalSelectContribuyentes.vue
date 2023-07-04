<template>
  <CModal :visible="showModal" @close="closeModal">
    <CModalHeader>
      <CModalTitle>Contribuyentes</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CSmartTable
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :tableHeadProps="{}"
          :activePage="1"
          header
          :items="contribuyentesList"
          :columns="columns"
          itemsPerPageSelect
          :itemsPerPage="5"
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >
          <template #show_details="{ item, index }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                @click="setContribuyente(item)"
                >Seleccionar</CButton
              >
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
import Api from '../services/EjecucionServices'

export default {
  name: 'contribuyentesDialog',
  components: {
    CSmartTable,
    CModal,
    CIcon,
  },
  emits: ['closeModal', 'contribuyenteSeleccionado'],
  data: function () {
    return {
      contribuyentesList: [],
      tabPaneActiveKey: 1,
      displayNameContribuyente: '',
      reclutamientoObject: {},
      columns: [
        { key: 'nombre', label: 'Nombre', _style: { width: '50%' } },

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
    setContribuyente(item) {
      this.$emit('contribuyenteSeleccionado', item)
    },
    listarContribuyentes() {
      Api.getContribuyente().then(
        (response) => (this.contribuyentesList = response.data.data),
      )
    },
    closeModal() {
      this.$emit('closeModal')
    },
  },

  props: {
    showModal: Boolean,
  },
  mounted() {
    this.listarContribuyentes()
  },
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
