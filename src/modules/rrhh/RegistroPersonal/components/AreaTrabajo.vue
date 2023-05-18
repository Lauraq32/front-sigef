<template>
  <h3 class="text-center mb-4">Áreas de trabajo</h3>
  <div class="table-headers mb-4">
    <div class="d-flex p-2">
      <CButton
        color="info"
        @click="() => { newAreaTrabajoModal = true }">Agregar</CButton>
      <CButton color="secondary">Imprimir</CButton>
    </div>
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
    :footer="footerItem"
    header
    :items="AreasTrabajos"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'descripcion', state: 'asc' }"
    pagination
  >
    <template #show_details="{ item }">
      <td class="py-2">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="editAreaTrabajo(item)"
          >Editar</CButton
        >
      </td>
    </template>
  </CSmartTable>
  <AreaTrabajoModal
    :newAreaTrabajoModal="newAreaTrabajoModal"
    @close-modal="closeModal"
    @post-areaTrabajo="saveAreaTrabajo"
    :areaTrabajoId="areaTrabajoId"
  />
</template>

<script>
import AreaTrabajoModal from './Dialogos/AreaTrabajoModal.vue'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'

export default {
  components: {
    CSmartTable,
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
