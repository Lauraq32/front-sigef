<template>
  <h3 class="text-center mb-4">Sectores</h3>
  <div class="table-headers">
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
  <SectorTable
    :columns="columns"
    :footerItems="footerItem"
    :items="sectores"
    :showButtons="true"
    @edit="editSector"
  />
  <SectoresModal
    :newSectorModal="newSectorModal"
    @close-modal="closeModal"
    @post-sector="saveSector"
    :sectorId="sectorId"
  />
</template>

<script>
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'
import SectorTable from '@/modules/rrhh/RegistroPersonal/components/SectoresTable.vue'
import { useToastStore } from '@/store/toast'
import SectoresModal from './Dialogos/SectoresModal.vue'
import Api from '../services/RegistroPersonalServices'
export default {
  components: {
    SectorTable,
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
