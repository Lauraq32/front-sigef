<template>
  <h3 class="text-center mb-4">Cargos</h3>
  <div class="table-headers mb-4 gap-1">
    <CButton color="info" @click="() => { cargoModal = true }">Agregar</CButton>
    <CButton color="secondary">Imprimir</CButton>
  </div>
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
    :sorterValue="{ column: 'nombre', state: 'asc' }"
    pagination
  >
  <template #show_details="{ item }">
   
      <td class="px-4">
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="getCargosById(item)">Editar</CButton>
        <CButton class="mt-1" color="danger" variant="outline" square size="sm" @click="deleteCargo(item.id)">Eliminar</CButton>
      </td>
    </template>
  </CSmartTable>
  <CargosModal
    :cargoModal="cargoModal"
    @close-modal="closeModal"
    @post-cargo="saveCargo"
    :cargoToUpdate="cargo"
  />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import CargosModal from './Dialogos/CargosModal.vue'
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
      cargo: null,
      cargos: [],
      cargoModal: false,
      columns: [
        {
          key: 'id',
          label: 'ID',
          _style: { width: '10%' },
        },
        {
          key: 'nombre',
          label: 'Posición o cargo',
          _style: { width: '70%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 3,
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
    deleteCargo(id){
      Api.deleteCargo(id).then(() => {
        this.show({
              content: 'Registro eliminado correctamente',
              closable: true,
              life: 15000,
              color:'danger'
            })
      })
    },
    getCargosById(item) {
      this.cargo = item;
      this.cargoModal = true
    },
    saveCargo(payload) {
      if (payload.id != null) {
        Api.updateCargo(payload.id, payload)
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
