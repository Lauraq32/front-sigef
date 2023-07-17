<template>
  <h3 class="text-center mb-4">Áreas de trabajo</h3>
  <div class="table-headers mb-4">
    <div class="d-flex p-2 gap-1">
      <CButton
        color="info"
        @click="
          () => {
            newAreaTrabajoModal = true
          }
        "
        >Agregar</CButton
      >
    </div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info">Imprimir</CButton>
    </div>
  </div>
  <AreaTrabajoTable
    :columns="columns"
    :footerItems="footerItem"
    :items="AreasTrabajos"
    :showButtons="true"
    @edit="editAreaTrabajo"
  />
  <AreaTrabajoModal
    :newAreaTrabajoModal="newAreaTrabajoModal"
    @close-modal="closeModal"
    @post-areaTrabajo="saveAreaTrabajo"
    :areaTrabajoId="areaTrabajoId"
  />
</template>

<script>
import AreaTrabajoModal from './Dialogos/AreaTrabajoModal.vue'
import AreaTrabajoTable from '@/modules/rrhh/RegistroPersonal/components/AreaTrabajoTable.vue'
import { CModal } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  components: {
    AreaTrabajoTable,
    CModal,
    AreaTrabajoModal,
  },
  data: () => {
    return {
      areaTrabajoId: null,
      AreasTrabajos: [],
      newAreaTrabajoModal: false,
      columns: [
        { key: 'descripcion', label: 'Programa', _style: { width: '40%' } },
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
            colspan: 8,
            style: 'font-weight:bold;',
          },
        },
      ],
    }
  },
  watch: {
    areaTrabajo() {
      this.getAllAreaTrabajo()
    },
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    closeModal() {
      this.newAreaTrabajoModal = false
    },
    editAreaTrabajo(item) {
      this.areaTrabajoId = item.id
      this.newAreaTrabajoModal = true
    },
    saveAreaTrabajo(payload) {
      if (this.areaTrabajoId != null) {
        Api.updateAreaTrabajo(this.areaTrabajoId, payload)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
              life: 7_500,
            })
            setTimeout(() => this.getAllAreaTrabajo(), 200)
          })
          .catch((error) => {
            return this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
            })
          })
      } else {
        Api.addAreaTrabajo(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
              life: 7_500,
            })
            setTimeout(() => this.getAllAreaTrabajo(), 200)
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
    getAllAreaTrabajo() {
      Api.getAreaTrabajos().then((response) => {
        this.AreasTrabajos = response.data.data
        this.footerItem[0] = `Total Items ${response.data.data.length}`
      })
    },
  },
  mounted() {
    this.getAllAreaTrabajo()
  },
}
</script>
