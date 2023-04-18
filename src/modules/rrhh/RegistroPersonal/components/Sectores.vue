<template>
  <h3 class="text-center">Sectores</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            newSectorModal = true
          }
        "
        >Agregar</CButton
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
    :footer="footerItem"
    header
    :items="sectores"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'nombre', state: 'asc' }"
    pagination
  >
  <template #show_details="{ item }">
      <td class="py-2">
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="editSector(item)">Editar</CButton>
      </td>
    </template>
  </CSmartTable>
  <SectoresModal
    :newSectorModal="newSectorModal"
    @close-modal="closeModal"
    @post-sector="saveSector"
    :sectorId="sectorId"
  />
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
import SectoresModal from '../Dialogos/SectoresModal.vue'
import Api from '../services/RegistroPersonalServices'
export default {
  components: {
    CSmartTable,
    CModal,
    SectoresModal,
  },
  data: function () {
    return {
      sectorId: null,
      newSectorModal: false,
      sectores: [],
      columns: [
        { key: 'nombre', label: 'Sectores', _style: { width: '90%' } },
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
  watch: {
    newSectorModal(){
      this.getAllSector()
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.newSectorModal = false
    },
    editSector(item) {
      this.sectorId = item.id
      this.newSectorModal = true
    },
    saveSector(payload) {
      if (this.sectorId != null) {
        Api.updateSector(this.sectorId, payload)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
              life: 7_500,
            })
            setTimeout(() => this.getAllSector(), 200)
          })
          .catch((error) => {
            return this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
            })
          })
      } else {
        Api.addSector(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 7_500,
            })
            setTimeout(() => this.getAllSector(), 200)
           
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
