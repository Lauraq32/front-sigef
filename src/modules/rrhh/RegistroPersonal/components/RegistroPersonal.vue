<template>
  <h3 class="text-center">Mantenimientos Empleados</h3>
  <AccionPersonalDialog :showModal="lgDemo4" @custom-event="closeModal" />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton color="info" @click="
        () => {
          showModal()
        }
      ">Agregar</CButton>

      <div class="d-inline p-2">
        <CButton color="info" @click="
          () => {
            reportes = true
          }
        ">Imprimir Reporte</CButton>
      </div>
    </div>
  </div>

  <CModal backdrop="static" :keyboard="false" :visible="reportes">
    <CModalHeader>
      <CModalTitle>Imprimir Reporte</CModalTitle>
    </CModalHeader>

    <CModalBody>
      <CFormSelect v-model="reporteDepto" id="validationCustom05">
        <option>1-Reporte empleados por nombre</option>
        <option>2-Reporte empleados por apellido</option>
        <option>3-Reporte empleados por cargo</option>
        <option>4-Reporte empleados por departamento</option>
      </CFormSelect>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary">Close</CButton>
      <CButton color="primary" @click="imprimirReporte">Imprimir</CButton>
    </CModalFooter>
  </CModal>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" header :items="registroPersonal" :columns="columns" columnFilter
    itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }" pagination>
    <template #sexo="{ item }">
      <td>
        {{ item.sexo == 'M' ? 'Masculino' : 'Femenino' }}
      </td>
    </template>
    <template #posicion="{ item }">
      <td>
        {{ item.posicion.nombre }}
      </td>
    </template>
    <template #programaDivision="{ item }">
      <td>
        {{ item.programaDivision.nombre }}
      </td>
    </template>

    <template #fechaIngreso="{ item }">
      <td>
        {{ formatDate(item.fechaIngreso) }}
      </td>
    </template>
    <template #fechaNacimiento="{ item }">
      <td>
        {{ formatDate(item.fechaNacimiento) }}
      </td>
    </template>

    <template #formaPago="{ item }">
      <td>
        {{ formatDate(item.formaPago) }}
      </td>
    </template>
    <template #show_details="{ item }">
      <CDropdown>
        <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem @click="toggleDetails(item)">Editar</CDropdownItem>
          <CDropdownItem @click="deleteEmp(item)">Eliminar</CDropdownItem>
          <CDropdownItem
            @click="
              () => {
                lgDemo4 = true
              }
            "
            >Evaluación</CDropdownItem
          >
          <CDropdownItem>Eventualidad</CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
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

  <RegistroPersonalDialog :showModal="showRegistroPersonalModal" @post-personal="submitForm"/>
</template>

<script>
import { useAuthStore } from '@/store/AuthStore'
import { useRegistroStore } from '../store/RegistroPersonal/Empleados'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import Api from '../services/RegistroPersonalServices'
import apiSectores from '../../../financiero/NominaModule/services/NominaServices'
import moment from 'moment'
import { useToastStore } from '@/store/toast'
import RegistroPersonalDialog from '../components/Dialogos/RegistroPersonalDialog.vue'

export default {
  components: {
    CSmartTable,
    CModal,
    moment,
    RegistroPersonalDialog
  },
  data: function () {
    return {
      //nuevas variables
      showRegistroPersonalModal:false,
      //nuevas variables
      
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
      

      tabPaneActiveKey: 1,
      columns: [
        { key: 'apellidos', label: 'Apellido', _style: { width: '15%' } },
        { key: 'nombres', label: 'Nombre', _style: { width: '15%' } },
        { key: 'cedula', label: 'Cédula', _style: { width: '10%' } },
        { key: 'codigo', label: 'Código', _style: { width: '10%' } },
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

        { key: 'sexo', label: 'Sexo', _style: { width: '2%' } },

        {
          key: 'show_details',
          label: '',
          _style: { width: '20%' },
          filter: false,
          sorter: false,
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

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore, useToastStore),
    ...mapState(useRegistroStore, ['registroPersonal', 'posicionCargo']),
  },


  methods: {
    ...mapActions(useRegistroStore, [
      'getRegistroPersonal',
      'addRegistroPersonal',
      'getPosicion',
    ]),
    ...mapActions(useToastStore, ['show']),

    showModal(){
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

    focusInput() {
      this.$refs.name.focus()
      this.$refs.klk.focus()
    },

    validateAge() {
      if (this.calcularEdad(this.postEmpleado.fechaNacimiento) < 18) {
        this.$swal({
          title: 'Información',
          text: 'La fecha de nacimiento seleccionada no cumple la mayoria de edad',
          icon: 'Atención',
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'De acuerdo',
        }).then((result) => {
          this.lgDemo = false
        })
      }
    },

    calcularEdad(fechaNacimiento) {
      var hoy = new Date();
      var cumpleanos = new Date(fechaNacimiento);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var mes = hoy.getMonth() - cumpleanos.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }
      return edad;
    },

    unaVez() {
      this.focusInput()
    },
    openModal() {
      this.lgDemo = true
      setTimeout(this.unaVez, 200)
    },
    closeModal(payload) {
      this.lgDemo4 = payload
    },

    changePrograma(e) {
      Api.getDepartamentoByProgramaId(e.target.value).then((response) => {
        this.departamentos = response.data.data
      })
    },
    formatDate(fechaIngreso) {
      return new Date(fechaIngreso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },

    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },

    savePersonal(payload){
      console.log(payload)
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
      if (item.empleados !== 0 || item.variacion !== 0) {
        this.empleadoValue = true
      } else {
        this.empleadoValue = false
      }
      this.edit = true
      this.lgDemo = true
      Api.getEmpleadoByID(item.id).then((response) => {
        this.id = item.id
        this.postEmpleado = response.data.data
      })
    },

    clearModal1() {
      this.id = null
      this.postEmpleado = {
        ayuntamientoId: this.$ayuntamientoId,
        codigo: null,
        nombres: null,
        apellidos: null,
        tipoDocumento: null,
        cedula: null,
        direccion: null,
        sectorId: 0,
        telefono: null,
        celular: null,
        fechaNacimiento: new Date(Date.now()),
        lugarNacimiento: null,
        estadoCivil: 'M',
        sexo: 'M',
        dependientes: 0,
        fechaIngreso: new Date(Date.now()),
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
      }
      Api.getProgramaDivision().then((response) => {
        this.programaDivision = response.data.data
        this.postEmpleado.programaDivisionId = this.programaDivision[0].id
      })

      Api.getPosicion().then((response) => {
        this.posicionCargo = response.data.data
        this.postEmpleado.posicionId = this.posicionCargo[0].id
      })

      Api.getAreaTrabajo().then((response) => {
        this.areaTrabajo = response.data.data
        this.postEmpleado.areaTrabajoId = this.areaTrabajo[0].id
      })

      apiSectores.getSectores().then((response) => {
        this.sector = response.data.data
        this.postEmpleado.sectorId = this.sector[0].id
      })

      Api.getAllTipoSangre().then((response) => {
        this.tipoSangre = response.data.data
        this.postEmpleado.tipoSangreId = this.tipoSangre[0].id
      })

      Api.getProgramaDivision().then((response) => {
        this.programaDivision = response.data.data
        this.postEmpleado.programaDivisionId = this.programaDivision[0].id
        Api.getDepartamentoByProgramaId(this.programaDivision[0].id).then(
          (response) => {
            this.departamentos = response.data.data
            this.postEmpleado.departamentoId = this.departamentos[0].id
          },
        )
      })
    },

    submitForm(payload) {
      if (this.id != null) {
        Api.putEmpleado(this.id, payload).then((response) => {
          this.lgDemo = false
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })

          setTimeout(this.getRegistroPersonal, 500)
          this.postEmpleado = {
            ayuntamientoId: this.authInfo.ayuntamiento.id,
            codigo: null,
            nombres: null,
            apellidos: null,
            tipoDocumento: null,
            cedula: null,
            direccion: null,
            sectorId: 0,
            telefono: null,
            celular: null,
            fechaNacimiento: new Date(Date.now()),
            lugarNacimiento: null,
            estadoCivil: 'M',
            sexo: null,
            dependientes: 0,
            fechaIngreso: new Date(Date.now()),
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
          }
        })
        setTimeout(this.getRegistroPersonal, 500)
      } else {
        setTimeout(this.getRegistroPersonal, 500)

        Api.postEmpleado(payload)
          .then((response) => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
          .catch((error) => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })

        setTimeout(this.getRegistroPersonal, 500)

        this.lgDemo = true
        setTimeout(this.getRegistroPersonal, 500)
          ; (this.postEmpleado = {
            id: 0,
            ayuntamientoId: this.$ayuntamientoId,
            nombre: null,
          }),
            (this.validatedCustom01 = false)
        event.preventDefault()
        event.stopPropagation()
        setTimeout(this.getRegistroPersonal, 500)
      }
    },

    deleteEmp(item) {
      setTimeout(this.getRegistroPersonal, 500)
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
          this.$swal({
            position: 'top-end',
            icon: 'error',
            title: error.message,
            showConfirmButton: false,
            timer: 1500,
          })
        })
    },
  },



  computed: {
    ...mapStores(useAuthStore),
    ...mapState(useAuthStore, ['authInfo']),
  },

  mounted() {
    setInterval(() => {
      this.horaActual = moment().format('HH:mm')
    }, 1000)

    this.getRegistroPersonal()
    Api.getAllEmpleado().then((response) => {
      this.registroPersonal = response.data.data
    })

    Api.getPosicion().then((response) => {
      this.posicionCargo = response.data.data
      this.postEmpleado.posicionId = this.posicionCargo[0].id
    }),
      Api.getAreaTrabajo().then((response) => {
        this.areaTrabajo = response.data.data
        this.postEmpleado.areaTrabajoId = this.areaTrabajo[0].id
      })

    Api.getProgramaDivision().then((response) => {
      this.programaDivision = response.data.data
      this.postEmpleado.programaDivisionId = this.programaDivision[0].id
      Api.getDepartamentoByProgramaId(this.programaDivision[0].id).then(
        (response) => {
          this.departamentos = response.data.data
          this.postEmpleado.departamentoId = this.departamentos[0].id
        },
      )
    })

    apiSectores.getSectores().then((response) => {
      this.sector = response.data.data
      this.postEmpleado.sectorId = this.sector[0].id
    })

    Api.getAllTipoSangre().then((response) => {
      this.tipoSangre = response.data.data
      this.postEmpleado.tipoSangreId = this.tipoSangre[0].id
    })
  },
}
</script>
