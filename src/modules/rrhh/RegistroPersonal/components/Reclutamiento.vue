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
  }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header
    :items="this.$store.state.RRHHModule.reclutamientoSolicitud" :columns="columns" columnFilter itemsPerPageSelect
    :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails(item, index)">
          Eliminar
        </CButton>
      </td>
    </template>
    <template #details="{ item }">
      <CCollapse :visible="this.details.includes(item._id)">
        <CCardBody>
          <h4>
            {{ item.username }}
          </h4>
          <p class="text-muted">User since: {{ item.registered }}</p>
          <CButton size="sm" color="info" class=""> User Settings </CButton>
          <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
        </CCardBody>
      </CCollapse>
    </template>
  </CSmartTable>
  <ReclutamientoDialog :showModal="lgDemo" @custom-event="closeModal" @post-reclutamiento="handleSubmitCustom01" />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import ReclutamientoDialog from '../components/Dialogos/ReclutamientoDialogs.vue'

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
      columns: [
        {
          key: 'Solicitud No.',
          label: 'Solicitud No.',
          _style: { width: '20%' },
        },
        {
          key: 'Nombre solicitante',
          label: 'Nombre solicitante',
          _style: { width: '30%' },
        },
        { key: 'Teléfono', label: 'Teléfono', _style: { width: '10%' } },
        { key: 'Edad', label: 'Edad', _style: { width: '10%' } },
        {
          key: 'Entrevistado',
          label: 'Entrevistado',
          _style: { width: '10%' },
        },
        { key: 'Evaluado', label: 'Evaluado', _style: { width: '10%' } },
        { key: 'Califica', label: 'Califica', _style: { width: '10%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
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
      console.log(payload)

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
    toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },
  },
  mounted() {
    this.$store.dispatch('AdministrativoModule/getUsuarios')
  },
}
</script>

