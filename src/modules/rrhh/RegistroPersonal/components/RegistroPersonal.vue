<template>
  <h3 class="text-center mb-4">Mantenimientos Empleados</h3>

  <div class="table-headers">
    <div class="d-flex gap-1 mb-2">
      <CButton color="info" @click="showModal">Agregar</CButton>
      <CButton color="secondary" @click="() => { reportes = true }">Imprimir Reporte</CButton>
    </div>
  </div>

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
  />

  <TarjetaEmpleadoDialogs
    :newTarjetaEmpleadoModal="newTarjetaEmpleadoModal"
    @close-modal="closeTarjetaEmpleadoModal"
    :empleado="selectedEmployee"
  />

  <AccionPersonalDialog
    :showModal="showAccionPersonal"
    @closeModal="closeAccionPersonal"
    :empleado="selectedEmployee"
  />

  <TipoNovedadDialog
    :showModal="showTipoNovedad"
    @closeModal="closeTipoNovedad"
  />
  
  <ContenedorArchivosRRHH
    :showModal="showModalDoc"
    :empleado="selectedEmployee"
    @custom-event="closeContenedorModal"
  />

  <EducacionDialog
    :showModal="showEducacion"
    :employeeInfo="selectedEmployee"
    @closeModal="() => showEducacion = false"
  />

  <!-- Reportes -->
  <CModal :backdrop="true" :keyboard="false" :visible="reportes">
    <CModalHeader :close-button="false">
      <CModalTitle>Reportes</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <label for="typeReport">Seleccione el reporte</label>
      <CFormSelect v-model="reporteDepto" id="typeReport">
        <option :value="1">Empleados por nombre</option>
        <option :value="2">Empleados por apellido</option>
        <option :value="3">Empleados por cargo</option>
        <option :value="4">Empleados por departamento</option>
      </CFormSelect>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { reportes = false }">Cerrar</CButton>
      <CButton color="primary" @click="imprimirReporte">Ver</CButton>
    </CModalFooter>
  </CModal>

</template>

<script>
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'
import Api from '../services/RegistroPersonalServices'
import EmpleadoReports from '@/components/Report/RRHH/ReportsTemplate/EmpleadosReports.vue'
import { useToastStore } from '@/store/toast'
import RegistroPersonalDialog from '../components/Dialogos/RegistroPersonalDialog.vue'
import RegistroPersonalTable from '../components/tables/RegistroPersonalTable.vue'
import EducacionDialog from './Dialogos/EducacionDialog.vue'
import ContenedorArchivosRRHH from './ContenedorArchivosRRHH.vue'
import AccionPersonalDialog from './Dialogos/AccionPersonalDialog.vue'
import TipoNovedadDialog from './TipoNovedades.vue'
import TarjetaEmpleadoDialogs from '../components/Dialogos/TarjetaEmpleado.vue'

export default {
  components: {
    RegistroPersonalTable,
    CModal,
    RegistroPersonalDialog,
    AccionPersonalDialog,
    AccionPersonalDialog,
    ContenedorArchivosRRHH,
    TipoNovedadDialog,
    RegistroPersonalDialog,
    TarjetaEmpleadoDialogs,
    EmpleadoReports,
    EducacionDialog,
  },

  data: function () {
    return {
      selectedEmployee:{},
      showModalDoc: false,
      accionPersonal: [],
      showAccionPersonal: false,
      showTipoNovedad: false,
      newTarjetaEmpleadoModal: false,
      showTarjeta: false,
      showModalRepots: false,
      employeeInfo: {},
      showEducacion: false,
      employeeInfo: null,
      showRegistroPersonalModal: false,
      registroPersonal: [],
      reporteDepto: '1',
      reportes: false,
      columns: [
        { key: 'codigo', label: 'Código', _style: { width: '15%' } },
        { key: 'apellidos', label: 'Apellido', _style: { width: '15%' } },
        { key: 'nombres', label: 'Nombre', _style: { width: '15%' } },
        { key: 'codigoIdentidad', label: 'Cédula/Pasaporte', _style: { width: '15%' } },
        {
          key: 'programaDivision',
          label: 'Programa',
          _style: { width: '20%' },
        },
        { key: 'posicion', label: 'Cargo', _style: { width: '10%' } },
        {
          key: 'fechaIngreso',
          label: 'Fecha ingreso',
          _style: { width: '15%' },
        },
        { key: 'sexo', label: 'Sexo', _style: { width: '20%' } },
        {
          key: 'show_details',
          label: '',
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 9,
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
          label: 'Evaluación',
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
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    getRegistroPersonal() {
      Api.getAllEmpleado().then((response) => {
        this.registroPersonal = response.data.data;
        this.footerItem[0].label = `Total Items: ${response.data.data.length}`;
      });
    },

    closeRegistroPersonalModal() {
      this.showRegistroPersonalModal = false;
      this.selectedEmployee = {};
    },

    closeTarjetaEmpleadoModal() {
      this.newTarjetaEmpleadoModal = false
    },
    showModal() {
      this.showRegistroPersonalModal = true
    },

    imprimirReporte() {
      if (this.reporteDepto === '1') {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Nombre&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      }
      
      if (this.reporteDepto === '2') {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Apellidos&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      }
      if (this.reporteDepto === '3') {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Cargo&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      }
      if (this.reporteDepto === '4') {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Departamentos&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      }

      this.reportes = false;
    },

    closeContenedorModal(payload) {
      this.showModalDoc = payload
    },
    closeAccionPersonal(close) {
      this.showAccionPersonal = close
    },

    closeTipoNovedad(close) {
      this.showTipoNovedad = close
    },

    toggleDetails(item) {
      this.showModal();
      this.selectedEmployee = item;
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
  },
  mounted() {
    this.getRegistroPersonal()
  }
}
</script>
