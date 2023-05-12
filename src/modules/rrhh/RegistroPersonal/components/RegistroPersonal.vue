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
    :empleadoId="selectedEmployee?.id"
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
      filedata: {},
      userid: null,
      status: false,
      showModalDoc: false,
      accionEmpleado: {},
      accionPersonal: [],
      showAccionPersonal: false,
      showTipoNovedad: false,
      empleado: null,
      newTarjetaEmpleadoModal: false,
      showRegistroPersonalModal: false,
      id: null,
      empleadoReporte: {},
      showTarjeta: false,
      showModalRepots: false,
      employeeInfo: {},
      showEducacion: false,
      employeeInfo: null,
      showRegistroPersonalModal: false,
      id: null,
      actions: [],
      lgDemo4: false,
      cambiar: false,
      registroPersonal: [],
      horaActual: '',
      toasts: [],
      code: null,
      noEnviado: false,
      Error: '',
      status: null,
      liveExampleVisible: false,
      reporteDepto: 1,
      reportes: false,
      posicionCargo: [{}],
      tipoSangre: [{}],
      areaTrabajo: [{}],
      programaDivision: [{}],
      sector: [{}],
      departamentos: [],
      postFile: {

      },
      postEmpleado: {
        ayuntamientoId: null,
        codigo: null,
        nombres: null,
        apellidos: null,
        tipoDocumento: null,
        cedula: null,
        direccion: null,
        sectorId: 1,
        telefono: null,
        celular: null,
        fechaNacimiento: new Date(Date.now()),
        lugarNacimiento: null,
        estadoCivil: 'Soltero',
        sexo: 'M',
        dependientes: 0,
        fechaIngreso: new Date(),
        fechaSalida: new Date(Date.now()),
        razonSalida: null,
        reemplear: true,
        fechaReingreso: new Date(Date.now()),
        programaDivisionId: 0,
        departamentoId: 0,
        areaTrabajoId: 0,
        posicionId: 0,
        grupoOcupacional: null,
        tipoContrato: null,
        fechaInicioContrato: new Date(Date.now()),
        fechaFinContrato: new Date(Date.now()),
        turno: null,
        periodoPago: null,
        formaPago: null,
        numeroCuenta: null,
        fechaExpitaTarjeta: new Date(Date.now()),
        estatus: true,
        sueldo: 0.0,
        sueldoAnterior: 0.0,
        fechaSueldoAnterior: new Date(Date.now()),
        fechaUltimaNomina: new Date(Date.now()),
        inicioVacaciones: new Date(Date.now()),
        finVacaciones: new Date(Date.now()),
        activoNomina: true,
        ingreso2: 0.0,
        ingreso3: 0.0,
        ingreso4: 0.0,
        ingreso5: 0.0,
        ingreso6: 0.0,
        ingreso7: 0.0,
        ingreso8: 0.0,
        ingreso9: 0.0,
        ingreso10: 0.0,
        impuestoSobreRenta: 0.0,
        arsCalculado: true,
        arsFijo: 0.0,
        afpCalculado: true,
        afpFijo: 0.0,
        egresos4: 0.0,
        egresos5: 0.0,
        egresos6: 0.0,
        egresos7: 0.0,
        egresos8: 0.0,
        egresos9: 0.0,
        egresos10: 0.0,
        eneroIngreso: 0.0,
        febreroIngreso: 0.0,
        marzoIngreso: 0.0,
        abrilIngreso: 0.0,
        mayoIngreso: 0.0,
        junioIngreso: 0.0,
        julioIngreso: 0.0,
        agostoIngreso: 0.0,
        septiembreIngreso: 0.0,
        octubreIngreso: 0.0,
        noviembreIngreso: 0.0,
        diciembreIngreso: 0.0,
        observacion: null,
        discapacidad: null,
        emergenciaNombre: null,
        emergenciaTelefono: null,
        emergenciaTelefono2: null,
        emergenciaDireccion: null,
        emergenciaParentezco: null,
        tipoSangreId: 0,
        emergenciaAlergico: null,
        emergenciaDiabetico: 'sT',
        emergenciaInsodepend: 'st',
        emergenciaPresionAlta: null,
        emergenciaPresionBaja: null,
        emergenciaEnTratamiento: 'st',
        emergenciaDiagnostico: null,
        licenciaConducir: null,
        fechaExpiracionLicencia: new Date(Date.now()),
        aplicaSasp: true,
        nivelEscolar: null,
        areaTematica: null,
        tituloObtenido: null,
        correoElectronico: null,
        correoElectronico2: null,
        recomendadoPor: null,
      },

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
            color: '',
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
        this.registroPersonal = response.data.data
      })
    },

    // closeRegistroPersonalModal() {
    //   this.showRegistroPersonalModal = false
    //   this.getRegistroPersonal()
    // }
    // ,
    // getAccionPersonal() {
    //   Api.getAllAccionPersonal().then((response) => {
    //     this.accionPersonal = response.data.data
    //   })
    // },

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

    // validateAge() {
    //   if (this.calcularEdad(this.postEmpleado.fechaNacimiento) < 18) {
    //     this.$swal({
    //       title: 'Información',
    //       text: 'La fecha de nacimiento seleccionada no cumple la mayoria de edad',
    //       icon: 'Atención',
    //       allowOutsideClick: false,
    //       showCancelButton: true,
    //       confirmButtonColor: '#3085d6',
    //       cancelButtonColor: '#d33',
    //       confirmButtonText: 'De acuerdo',
    //     }).then((result) => {
    //       this.lgDemo = false
    //     })
    //   }
    // },

    // calcularEdad(fechaNacimiento) {
    //   var hoy = new Date()
    //   var cumpleanos = new Date(fechaNacimiento)
    //   var edad = hoy.getFullYear() - cumpleanos.getFullYear()
    //   var mes = hoy.getMonth() - cumpleanos.getMonth()
    //   if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
    //     edad--
    //   }
    //   return edad
    // },
    // openModal() {
    //   this.lgDemo = true
    // },
    closeContenedorModal(payload) {
      this.showModalDoc = payload
    },
    closeAccionPersonal(close) {
      this.showAccionPersonal = close
    },

    closeTipoNovedad(close) {
      this.showTipoNovedad = close
    },

    // closeModalssss(payload) {
    //   this.showModalRepots = payload
    // },

    // changePrograma(e) {
    //   Api.getDepartamentoByProgramaId(e.target.value).then((response) => {
    //     this.departamentos = response.data.data
    //   })
    // },

    // closeEducacion() {
    //   this.showEducacion = false
    // },

    // formatDate(fechaIngreso) {
    //   return new Date(fechaIngreso).toLocaleDateString('en-GB', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric',
    //   })
    // },

    // handleSubmitCustom01(event) {
    //   const form = event.currentTarget
    //   if (form.checkValidity() === false) {
    //     event.preventDefault()
    //     event.stopPropagation()
    //   }
    //   this.validatedCustom01 = true
    // },

    // getBadge(status) {
    //   switch (status) {
    //     case 'Active':
    //       return 'success'
    //     case 'Inactive':
    //       return 'secondary'
    //     case 'Pending':
    //       return 'warning'
    //     case 'Banned':
    //       return 'danger'
    //     default:
    //       'primary'
    //   }
    // },

    // getEmpleadoByID(item) {
    //   this.showEducacion = true
    //   this.employeeInfo = { ...item }
    //   this.employeeInfo.nombres = `${item.nombres} ${item.apellidos}`
    // },

    toggleDetails(item) {
      this.showModal();
      this.selectedEmployee = item;
      // if (item.empleados !== 0 || item.variacion !== 0) {
      //   this.empleadoValue = true
      // } else {
      //   this.empleadoValue = false
      // }
      // Api.getEmpleadoByID(item.id).then((response) => {
      //   this.id = item.id
      //   this.postEmpleado = response.data.data
      // })
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
        Api.postEmpleado(payload)
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

        // setTimeout(this.getRegistroPersonal, 500)

        // this.lgDemo = true
        // setTimeout(this.getRegistroPersonal, 500)
        // ;(this.postEmpleado = {
        //   id: 0,
        //   ayuntamientoId: this.$ayuntamientoId,
        //   nombre: null,
        // }),
        //   (this.validatedCustom01 = false)
        // event.preventDefault()
        // event.stopPropagation()
        // setTimeout(this.getRegistroPersonal, 500)
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
    }
  },
}
</script>
