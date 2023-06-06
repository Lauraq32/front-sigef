<template>
  <h3 class="text-center mb-4">Mantenimientos Empleados</h3>

  <div class="table-headers">
    <div class="d-flex gap-1 mb-2">
      <CButton color="info" @click="showModal">Agregar</CButton>
      <CButton color="secondary">Imprimir Reporte</CButton>
      <CButton color="info" @click="setEmpleadosToBeneficiarios">Pasar a Beneficiarios</CButton>
    </div>
  </div>

  <RegistroPersonalTable :tableData="registroPersonal" :tableColumns="columns" :actions="buttonActions"
    :footer="footerItem" />

  <RegistroPersonalDialog :showModal="showRegistroPersonalModal" @post-personal="submitForm"
    @close-modal="closeRegistroPersonalModal" :empleadoId="selectedEmployee?.id" />

  <TarjetaEmpleadoDialogs :newTarjetaEmpleadoModal="newTarjetaEmpleadoModal" @close-modal="closeTarjetaEmpleadoModal"
    :empleado="selectedEmployee" />

  <AccionPersonalDialog :showModal="showAccionPersonal" @closeModal="closeAccionPersonal" :empleado="selectedEmployee" />

  <TipoNovedadDialog :showModal="showTipoNovedad" @closeModal="closeTipoNovedad" />

  <ContenedorArchivosRRHH :showModal="showModalDoc" :empleado="selectedEmployee" @custom-event="closeContenedorModal" />

  <EducacionDialog :showModal="showEducacion" :employeeInfo="selectedEmployee"
    @closeModal="() => (showEducacion = false)" />
</template>

<script>
import { useAuthStore } from '@/store/AuthStore'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
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
import Swal from 'sweetalert2/dist/sweetalert2.js'

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
      selectedEmployee: {},
      showModalDoc: false,
      showAccionPersonal: false,
      showTipoNovedad: false,
      newTarjetaEmpleadoModal: false,
      showRegistroPersonalModal: false,
      showEducacion: false,
      registroPersonal: [],

      columns: [
        { key: 'codigo', label: 'Código', _style: { width: '15%' } },
        { key: 'apellidos', label: 'Apellido', _style: { width: '15%' } },
        { key: 'nombres', label: 'Nombre', _style: { width: '15%' } },
        {
          key: 'codigoIdentidad',
          label: 'Cédula/Pasaporte',
          _style: { width: '15%' },
        },
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
          },
        },
        {
          label: 'Eliminar',
          clickHandler: (value) => {
            this.deleteEmp(value)
          },
        },
        {
          label: 'Evaluación',
          clickHandler: (value) => {
            this.showAccionPersonal = true
            this.selectedEmployee = value
          },
        },
        {
          label: 'Eventualidad',
          clickHandler: (value) => {
            this.showTipoNovedad = true
            this.selectedEmployee = value
          },
        },
        {
          label: 'Educación',
          clickHandler: (item) => {
            this.showEducacion = true
            this.selectedEmployee = { ...item }
            this.selectedEmployee.nombres = `${item.nombres} ${item.apellidos}`
          },
        },
        {
          label: 'Tarjeta',
          clickHandler: (item) => {
            this.selectedEmployee = item
            this.newTarjetaEmpleadoModal = true
          },
        },
        {
          label: 'Ver Documentos',
          clickHandler: (item) => {
            this.selectedEmployee = item
            this.showModalDoc = true
          },
        },
        {
          label: 'Pasar a Beneficiario',
          clickHandler: (item) => {
            Api.setEmpleadoToBeneficiario(item.id).then(response => {
              this.show({
                content: 'Datos procesados correctamente',
                closable: true,
              })
            }).catch(e => {
              this.show({
                content: e.response.data.message,
                closable: true,
                color:'danger'
              })
            })



            // this.selectedEmployee = item
            // this.showModalDoc = true
          },
        },
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    setEmpleadosToBeneficiarios() {
      Api.setAllEmpleadosToBeneficiario().then(response => {
        this.show({
          content: 'Datos procesados correctamente',
          closable: true,
        })
      }).catch(e=>{
        this.show({
          content: e.response.data.message,
          closable: true,
          color:'danger'
        })
      })
    },

    getRegistroPersonal() {
      Api.getAllEmpleado().then((response) => {
        this.registroPersonal = response.data.data
      })
    },

    closeRegistroPersonalModal() {
      this.showRegistroPersonalModal = false
    },

    closeTarjetaEmpleadoModal() {
      this.newTarjetaEmpleadoModal = false
    },
    showModal() {
      this.showRegistroPersonalModal = true
    },

    imprimirReporte() {
      if (this.reporteDepto.split('-')[0] == 1) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Nombre&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      } else if (this.reporteDepto.split('-')[0] == 2) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Apellidos&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      } else if (this.reporteDepto.split('-')[0] == 3) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Empleados_por_Cargo&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      } else if (this.reporteDepto.split('-')[0] == 4) {
        window
          .open(
            `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fRRHH%2fRep_Departamentos&rs:Command=Render&ID_AYUNTAMIENTO=${this.$ayuntamientoId}`,
            '_blank',
          )
          .focus()
      }
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
      this.showModal()
      this.selectedEmployee = item
    },

    submitForm(payload) {
      if (payload.id != null) {
        Api.putEmpleado(payload.id, payload)
          .then(() => {
            this.show({
              content: 'Registro actualizado correctamente',
              closable: true,
            })
            this.closeRegistroPersonalModal()
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
      } else {
        Api.postEmpleado(payload)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            setTimeout(this.getRegistroPersonal, 500)
            this.closeRegistroPersonalModal()
          })
          .catch((error) => {
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
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Estás usted seguro que quieres inactivar este empleado?`,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
      }).then((answer) => {
        if (answer.isConfirmed) {
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
        }
      })
    },
  },

  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['authInfo']),
  },

  mounted() {
    this.getRegistroPersonal()
    Api.getAllEmpleado().then((response) => {
      this.registroPersonal = response.data.data
      this.footerItem[0].label = `Total Items: ${response.data.data.length}`
    })
  },
  watch: {
    showRegistroPersonalModal() {
      this.getRegistroPersonal()
    },
  },
}
</script>
