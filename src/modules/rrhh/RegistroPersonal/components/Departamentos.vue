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
    :items="deparments"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>

    <template #delete="{ item, index }">
      <td class="py-2">
        <CButton
          color="danger"
          square
          size="sm"
          @click="handleDelete(item, index)">
          Eliminar
        </CButton>
      </td>
    </template>
  </CSmartTable>

  <AddDepartment @onClose="handleAddModalClose" :showModal="showAddDeptModal" />

</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import AddDepartment from './Dialogos/AddDepartment.vue'
import DeparmentServices from '../services/DeparmentServices'
export default {
  components: {
    CSmartTable,
    AddDepartment
  },
  data: () => {
    return {
      validatedCustom01: null,
      showAddDeptModal: false,
      deparments: [],
      columns: [
        {
          key: 'nombre',
          label: 'Departamento',
          _style: { width: '25%' },
        },
        { key: 'programaDivisionId', label: 'Programa', _style: { width: '15%' } },
        {
          key: 'grupoNominaId',
          label: 'Grupo de nomina',
          _style: { width: '12%' },
        },
        {
          key: 'estructura',
          label: 'Estructura Prog.',
          _style: { width: '12%' },
        },
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '10%' },
        },
        {
          key: 'saspId',
          label: 'Cta. SASP',
          _style: { width: '10%' },
        },
        {
          key: 'delete',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false
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
    },
    handleDelete(item, index){
      console.log(item)
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
  },
  mounted() {
    // this.$store.dispatch('AdministrativoModule/getUsuarios')
   DeparmentServices.getDepartments().then((response) => this.deparments = response.data.data);
  },
}
</script>
