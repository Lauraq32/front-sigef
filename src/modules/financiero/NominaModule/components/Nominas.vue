<template>
   <CCard class="mb-4">
    <CCardBody class="table-headers justify-content-between">
      <div class="d-inline-flex gap-3 align-items-center">
        <CFormLabel class="form-label col-auto col-form-label"
          >Filtro:</CFormLabel
        >
        <CFormSelect
          id="empleoyeeStatusSelect"
          @change="handleFilterEmployeeByStatus"
          aria-label="Selecionar estatus del empleado"
          :options="[
            { label: 'Activo', value: 'activo' },
            { label: 'Inactivo', value: 'inactivo' },
            { label: 'Vacaciones', value: 'vacaciones' },
          ]"
        />
      </div>

      <div>
        <div class="d-flex gap-1">
          <CButton class="justify-content-end" color="info" @click="showResgistroPersonal">Agregar</CButton>
          <CButton color="secondary" @click="() => { reportes = true }">Reporte</CButton>
        </div>
      </div>
    </CCardBody>
  </CCard>

  <RegistroPersonalTable
    :tableData="registroPersonal"
    :tableColumns="columns"
    :actions="buttonActions"
    :footer="footerItem"
  />

  <RegistroPersonalDialog
    :showModal="showRegistroPersonalModal"
    @post-personal="submitForm"
    @close-modal="closeRegistroPersonalModal"
    :empleado="selectedEmployee"
    :isNomina="true"
  />
  
</template>

<script>

import RegistroPersonalTable from '@/modules/rrhh/RegistroPersonal/components/tables/RegistroPersonalTable.vue'
import RegistroPersonalDialog from '@/modules/rrhh/RegistroPersonal/components/Dialogos/RegistroPersonalDialog.vue'
import Api from '@/modules/rrhh/RegistroPersonal/services/RegistroPersonalServices'
import AppActionHeader from '@/components/AppActionHeader.vue'
import { useToastStore } from '@/store/toast'

export default {
  components: {
    RegistroPersonalTable,
    RegistroPersonalDialog,
    AppActionHeader
},

  data: function () {
    return {
      selectedEmployee:{},
      showRegistroPersonalModal:false,
      registroPersonal:[],
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
        { key: 'sueldo', label: 'Sueldo', _style: { width: '10%' } },
        { key: 'formaPago', label: 'Forma pago', _style: { width: '10%' } },
       
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

  methods: {
    ...mapActions(useToastStore, ['show']),
    arsCalculado() {
      if (this.postEmpleado.arsCalculado == false) {
        this.postEmpleado.arsFijo = 3.04
      } else {
        this.postEmpleado.arsFijo = 0
      }
    },
    afpCalculado() {
      // this.postEmpleado.arsCalculado = false
      if (this.postEmpleado.afpCalculado == false) {
        this.postEmpleado.afpFijo = 2.87
      } else {
        this.postEmpleado.afpFijo = 0
      }
    },
    nominaGnerallink() {
      router.push({ name: 'nominaGeneral' })
    },
    clearModal1() {
      Api.getProgramaDivision().then((response) => {
        this.programaDivision = response.data.data
        this.postGenerarNomina.ProgramaDivision = this.programaDivision[0].id

        Api.getDepartamentoByProgramaId(this.programaDivision[0].id).then(
          (response) => {
            this.departamentos = response.data.data
            this.postGenerarNomina.DepartamentoId = this.departamentos[0].id
          },
        )
      })
    },
    closeRegistroPersonalModal() {
      this.showRegistroPersonalModal = false;
      this.selectedEmployee = {};
    },

    getRegistroPersonal(filter) {
      Api.getAllEmpleado(filter).then((response) => {
        this.registroPersonal = response.data.data;
        this.footerItem[0].label = `Total Items: ${response.data.data.length}`;
      });
    },

    submitForm(payload) {
      if (payload.id != null) {
        Api.putEmpleado(payload.id, payload).then(() => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })
          this.closeRegistroPersonalModal()
          setTimeout(this.getRegistroPersonal, 500)
        }).catch((error) => {
          this.show({
            content: error.response.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
      } else {
        Api.postEmpleados(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            setTimeout(this.getRegistroPersonal, 500)
            this.closeRegistroPersonalModal()
          }).catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      }
    },

    deleteEmp(item) {
      Api.deleteEmpleado(item.id)
        .then((response) => {
          this.show({
            content: response.data.message,
            closable: true,
            color: 'inherit',
          })
          setTimeout(this.getRegistroPersonal, 500)
        })
        .catch((error) => {
          this.show({
            content: error.response.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },
    showResgistroPersonal(){
      this.showRegistroPersonalModal = true
    },
    getRegistroPersonal(filter) {
      Api.getAllEmpleado(filter).then((response) => {
        this.registroPersonal = response.data.data;
        this.footerItem[0].label = `Total Items: ${response.data.data.length}`;
      });
    },
    handleFilterEmployeeByStatus({ target }) {
      this.getRegistroPersonal({
        status: target.value
      });
    }
  },
  mounted(){
    this.getRegistroPersonal()
  }
}

</script>

<style>
.blanco {
  text-decoration: none;
}
</style>
