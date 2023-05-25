<template>
  <h3 class="text-center mb-4">Reclutamiento y/o Solicitudes</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton color="info" @click="() => { showReclutamientoModal = true }">Agregar</CButton>
    </div>
  </div>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
      striped: true,
      hover: true,
    }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header :items="solicitudItem" :columns="columns"
    columnFilter itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>
    <template #show_details="{ item }">
      <td>
        <CButton @click="getReclutamientoById(item)" color="primary" variant="outline">Editar</CButton>
      </td>

    </template>
    <template #entrevistado="{ item }">
      <td class="py-2">
        {{ item.entrevistado ? 'Si' : 'No' }}
      </td>
    </template>
    <template #evaluado="{ item }">
      <td class="py-2">
        {{ item.evaluado ? 'Si' : 'No' }}
      </td>
    </template>
    <template #celular="{ item }">
      <td class="py-2">
        {{ item.celular ?? '' }}
      </td>
    </template>

  </CSmartTable>
  <ReclutamientoDialog :showModal="showReclutamientoModal" @closeModal="closeModal"
    @post-reclutamiento="saveSolicitudEmpleo" :solicitudEmpleoId="reclutamiento" />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import ReclutamientoDialog from '../components/Dialogos/ReclutamientoDialogs.vue'
import Api from '../services/SolicitudEmpleo'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'

export default {
  components: {
    CSmartTable,
    CModal,
    ReclutamientoDialog,
  },
  data: () => {
    return {
      showReclutamientoModal: false,
      columns: [
        {
          key: 'id',
          label: 'Solicitud No.',
          _style: { width: '10%' },
        },
        {
          key: 'nombre',
          label: 'Nombre Solicitante',
          _style: { width: '30%' },
        },
        { key: 'celular', label: 'Celular', _style: { width: '10%' } },
        { key: 'edad', label: 'Edad', _style: { width: '10%' } },
        {
          key: 'entrevistado',
          label: 'Entrevistado',
          _style: { width: '10%' },
        },
        { key: 'evaluado', label: 'Evaluado', _style: { width: '10%' } },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
      solicitudItem: [],
      footerItem: [
        {
          label: 'Total Item',
          _props: {
            colspan: 6,
            style: 'font-weight:bold;',
          },
        }

      ],
      reclutamiento: {},
    }
  },
  watch: {
    showReclutamientoModal() {
      this.getAll()
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    getAll() {
      Api.getSolicitudEmpleo().then(response => (
        this.solicitudItem = response.data.data,
        this.footerItem[0].label = `Total Item: ${this.solicitudItem.length}`
      ))
    },
    saveSolicitudEmpleo(payload) {

      if (payload.id) {
        Api.putSolicitudEmpleo(payload.id, payload).then((response) => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })
          this.getAll();
          this.closeModal();
        }
        ).catch(error => {
          this.show({
            content: error.response.data,
            closable: true,
            color: 'danger',
          })
        })

      } else {
        Api.postSolicitudEmpleo(payload).then(response => {
          this.show({
            content: 'Registro Agregado correctamente',
            closable: true,
          })
          this.getAll()
          this.closeModal();
        }).catch((error) => {
          this.show({
            content: error.response.data,
            closable: true,
            color: 'danger',
            class: 'text-white'
          })
        })
      }

    },
    closeModal() {
      this.showReclutamientoModal = false;
      this.reclutamiento = {};
    },
    getBadge(status) {
      switch (status) {
        case 'Active':
          return 'success'
        case 'Inactive':
          return 'secondary'
        case 'Pending':
          return 'warning'
        case 'Banned':
          return 'danger'
        default:
          'primary'
      }
    },
    getReclutamientoById(item) {
      this.reclutamiento = item
      this.showReclutamientoModal = true
    },

  },
  mounted() {
    this.getAll()
  },
}
</script>

