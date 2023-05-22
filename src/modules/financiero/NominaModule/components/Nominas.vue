<template>
  <RegistroPersonalTable
    :tableData="registroPersonal"
    :tableColumns="columns"
    :actions="buttonActions"
    :footer="footerItem"
  />
  
  <!-- <RegistroPersonalDialog
    :showModal="showRegistroPersonalModal"
    @post-personal="submitForm"
    @close-modal="closeRegistroPersonalModal"
    :empleado="selectedEmployee"
  /> -->

</template>

<script>

import RegistroPersonalTable from '@/modules/rrhh/RegistroPersonal/components/tables/RegistroPersonalTable.vue'
import RegistroPersonalDialog from '@/modules/rrhh/RegistroPersonal/components/Dialogos/RegistroPersonalDialog.vue'

export default {
  components: {

  },

  data: function () {
    return {

      tabPaneActiveKey: 1,
      columns: [
        { key: 'codigo', label: 'Código', _style: { width: '5%' } },
        { key: 'apellidos', label: 'Apellido', _style: { width: '15%' } },
        { key: 'nombres', label: 'Nombre', _style: { width: '15%' } },
        { key: 'codigoIdentidad', label: 'Cédula/Pasaporte', _style: { width: '10%' } },
        {
          key: 'departamenteName',
          label: 'Departamento',
          _style: { width: '20%' },
        },
        { key: 'posicion', label: 'Cargo', _style: { width: '10%' } },
        {
          key: 'fechaIngreso',
          label: 'Fecha Ingreso',
          _style: { width: '10%' },
        },
        { key: 'sexo', label: 'Sexo', _style: { width: '5%' } },
        {
          key: 'estado',
          label: 'Estado',
          _style: { width: '7%' },
          filter: false,
          sorter: false,
        },
        {
          key: 'show_details',
          label: '',
          filter: false,
          sorter: false,
          _style: { width: '3%'}
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 10,
            style: 'font-weight:bold;',
          },
        },
      ],
      buttonActions: [
        {
          label: 'Editar',
          clickHandler: (value) => {
            this.toggleDetails(value)
          }
        },
        {
          label: 'Eliminar',
          clickHandler: (value) => {
            this.deleteEmp(value)
          }
        },
        {
          label: 'Acción personal',
          clickHandler: (value) => {
            this.showAccionPersonal = true
            this.selectedEmployee = value
          }
        },
        {
          label: 'Eventualidad',
          clickHandler: (value) => {
            this.showTipoNovedad = true
            this.selectedEmployee = value
          }
        },
        {
          label: 'Educación',
          clickHandler: (item) => {
            this.showEducacion = true
            this.selectedEmployee = { ...item }
            this.selectedEmployee.nombres = `${item.nombres} ${item.apellidos}`
          }
        },
        {
          label: 'Tarjeta',
          clickHandler: (item) => {
            this.selectedEmployee = item
            this.newTarjetaEmpleadoModal = true
          }
        },
        {
          label: 'Ver Documentos',
          clickHandler: (item) => {
            this.selectedEmployee = item;
            this.showModalDoc = true
          }
        },
      ],

      details: [],

      validatedCustom01: null,
      lgDemo: false,
      lgDemo1: false,
    }
  },

  computed: {

  },

  methods: {}
}




</script>

<style>
.blanco {
  text-decoration: none;
}
</style>
