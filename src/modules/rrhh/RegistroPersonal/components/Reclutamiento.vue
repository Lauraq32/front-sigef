<template>
  <h3 class="text-center">Reclutamiento y/o solicitudes</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton color="info" @click="
        () => {
          showReclutamientoModal= true
        }
      ">Agregar</CButton>
    </div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport">Imprimir</CButton>
    </div>
  </div>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header :items="solicitudItem" :columns="columns"
    columnFilter itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td>
        <CButton  @click="getReclutamientoById(item)" color="primary" variant="outline">Editar</CButton>
      </td>
           
    </template>
    <template #entrevistado="{ item, index }">
      <td class="py-2">
        {{ item.entrevistado == true ? 'No' : 'Si' }}
      </td>
    </template>
    <template #evaluado="{ item, index }">
      <td class="py-2">
        {{ item.evaluado == true ? 'No' : 'Si' }}
      </td>
    </template>

  </CSmartTable>
  <ReclutamientoDialog :showModal="showReclutamientoModal" @closeModal="closeModal" @post-reclutamiento="saveSolicitudEmpleo"
    solicitudEmpleoObject="solicitudItem" :solicitudEmpleoId="reclutamientoId" />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import ReclutamientoDialog from '../components/Dialogos/ReclutamientoDialogs.vue'
import Api from '../services/SolicitudEmpleo'
import { mapActions} from 'pinia'
import { useToastStore } from '@/store/toast'

export default {
  components: {
    CSmartTable,
    CModal,
    ReclutamientoDialog,
  },
  data: () => {
    return {

      validatedCustom01: null,
      showReclutamientoModal: false,
      solicitudEmpleoId: null,
      columns: [
        {
          key: 'id',
          label: 'Solicitud No.',
          _style: { width: '20%' },
        },
        {
          key: 'nombre',
          label: 'Nombre Solicitante',
          _style: { width: '30%' },
        },
        { key: 'telefono', label: 'Teléfono', _style: { width: '10%' } },
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
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
      solicitudItem: [],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },

      ],
      details: [],
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
        this.solicitudItem = response.data.data
      ))
    },
    saveSolicitudEmpleo(payload) {

      if (this.solicitudEmpleoId != null) {
        Api.putSolicitudEmpleo(this.solicitudEmpleoId, payload).then((response) => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })
        }
        ).catch(error => {
          this.show({
            content: error.response.data,
            closable: true,
            color:'danger'
          })
        })
      } else {
        Api.postSolicitudEmpleo(payload).then(response => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })
        }).catch((error) => {
          this.show({
            content: error.response.data,
            closable: true,
            color:'danger'
          })
        })
      }
      this.showReclutamientoModal= false

    },
    closeModal() {
      this.showReclutamientoModal= false;
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
      this.solicitudEmpleoId = item.id
      this.reclutamientoId = item.id
      this.showReclutamientoModal= true
    },

  },
  mounted() {
    this.getAll()
  },
}
</script>

