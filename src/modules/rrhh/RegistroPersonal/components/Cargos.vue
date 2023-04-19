<template>
  <h3 class="text-center">Cargos</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            cargoModal = true
          }
        "
        >Agregar</CButton
      >
    </div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info"
        >Imprimir</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    header
    :items="cargos"
    :columns="columns"
    :footer="footerItem"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'posicion', state: 'asc' }"
    pagination
  >
  <template #show_details="{ item }">
      <td class="py-2">
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="getCargosById(item)">Editar</CButton>
      </td>
    </template>
  </CSmartTable>
  <CargosModal
    :cargoModal="cargoModal"
    @close-modal="closeModal"
    @post-cargo="saveCargo"
    :cargoId="cargoId"
  />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import CargosModal from '../Dialogos/CargosModal.vue'
import { mapActions } from 'pinia'
import Api from '../services/RegistroPersonalServices'
import { useToastStore } from '@/store/toast'
export default {
  components: {
    CSmartTable,
    CModal,
    CargosModal,
  },
  data: () => {
    return {
      cargoId: null,
      cargos: [],
      cargoModal: false,
      columns: [
        {
          key: 'posicion',
          label: 'Posición o cargo',
          _style: { width: '40%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
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
    closeModal(payload) {
      this.cargoModal = payload
    },
    getCargosById(item) {
      this.cargoId = item.id
      this.cargoModal = true
    },
    saveCargo(payload) {
      if (this.cargoId != null) {
        Api.updateCargo(this.cargoId, payload)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllCargo(), 200)
          })
          .catch((error) => {
            return this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
            })
          })
      } else {
        Api.addCargos(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 15000,
            })
            setTimeout(() => this.getAllCargo(), 200)
          })
          .catch((error) => {
            return this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
            })
          })
      }
    },
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
