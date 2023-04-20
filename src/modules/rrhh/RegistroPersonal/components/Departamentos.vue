<template>
  <h3 class="text-center">Departamentos</h3>
  <hr />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="() => {showAddDeptModal = true}">Agregar</CButton
      >
    </div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable class="sticky-top"
    clickableRows
    :tableProps="{
     striped: true,
      hover: true,}"
    :tableHeadProps="{}"
    :activePage="1"
    :footer="footerItem"
    header
    :items="this.$store.state.RRHHModule.departamentos"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>

    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item, index)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
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

  <AddDepartment @onClose="handleAddModalClose" :showModal="showAddDeptModal" />

</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import AddDepartment from './Dialogos/AddDepartment.vue'
export default {
  components: {
    CSmartTable,
    AddDepartment
  },
  data: () => {
    return {
      validatedCustom01: null,
      showAddDeptModal: false,
      columns: [
        { key: 'Código', label: 'Código', _style: { width: '8%' } },
        {
          key: 'Departamento',
          label: 'Departamento',
          _style: { width: '25%' },
        },
        { key: 'Programa', label: 'Programa', _style: { width: '23%' } },
        {
          key: 'Grupo de nomina',
          label: 'Grupo de nomina',
          _style: { width: '12%' },
        },
        {
          key: 'Estructura Prog.',
          label: 'Estructura Prog.',
          _style: { width: '12%' },
        },
        {
          key: 'Clasificador',
          label: 'Clasificador',
          _style: { width: '10%' },
        },
        {
          key: 'Limitado rep.',
          label: 'Limitado rep.',
          _style: { width: '15%' },
        },
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
    handleAddModalClose(event){
      this.showAddDeptModal = false
    }
    ,
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
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
    // this.$store.dispatch('AdministrativoModule/getUsuarios')
  },
}
</script>
