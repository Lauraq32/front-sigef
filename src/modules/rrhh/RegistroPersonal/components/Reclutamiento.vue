<template>
  <h3 class="text-center">Reclutamiento y/o solicitudes</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton color="info" @click="
        () => {
          lgDemo = true
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
      <td class="py-2">
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem @click="getReclutamientoById(item)">Editar</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </td>
    </template>
    <template #entrevistado="{ item, index }">
      <td class="py-2">
        {{ item.entrevistado == 'true' ? 'No' : 'Si' }}
      </td>
    </template>
    <template #evaluado="{ item, index }">
      <td class="py-2">
        {{ item.evaluado == 'true' ? 'No' : 'Si' }}
      </td>
    </template>

  </CSmartTable>
  <ReclutamientoDialog :showModal="lgDemo" @custom-event="closeModal" @post-reclutamiento="handleSubmitCustom01" solicitudEmpleoObject="solicitudItem" :solicitudEmpleoId="reclutamientoId"  />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import ReclutamientoDialog from '../components/Dialogos/ReclutamientoDialogs.vue'
import Api from '../services/SolicitudEmpleo'

export default {
  components: {
    CSmartTable,
    CModal,
    ReclutamientoDialog,
  },
  data: () => {
    return {

      validatedCustom01: null,
      lgDemo: false,
      solicitudEmpleoId:null,
      columns: [
        {
          key: 'id',
          label: 'Solicitud No.',
          _style: { width: '20%' },
        },
        {
          key: 'nombre',
          label: 'Nombre solicitante',
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

  methods: {
    handleSubmitCustom01(payload) {
      
    
      if(this.solicitudEmpleoId != 0){
        console.log('se esta editando')
      }else{
        Api.postSolicitudEmpleo(payload).then(response => (
        console.log(response)
      ))
      }

    },
    closeModal(payload) {
      this.lgDemo = payload
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
      this.reclutamientoId = item.id
      this.lgDemo = true
    },

  },
  mounted() {
    Api.getSolicitudEmpleo().then(response => (
      this.solicitudItem = response.data.data
    ))
  },
}
</script>

