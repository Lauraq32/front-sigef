<template>
  <h3 class="text-center">Mantenimientos Empleados</h3>
  <AccionPersonalDialog :showModal="lgDemo4" @custom-event="closeModal" />
  <EducacionDialog :showModal="showEducacion" @closeModal="closeEducacion" :employeeInfo="employeeInfo" />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton color="info" @click="() => {
          showModal()
        }
        ">Agregar</CButton>

      <div class="d-inline p-2">
        <CButton color="info" @click="() => {
            reportes = true
          }
          ">Imprimir Reporte</CButton>
      </div>
    </div>
  </div>

  <RegistroPersonalTable :tableData="registroPersonal" :tableColumns="columns" :actions="buttonActions"
    :footer="footerItem" />
  <RegistroPersonalDialog :showModal="showRegistroPersonalModal" @post-personal="submitForm"
    @close-modal="closeRegistroPersonalModal" :empleadoId="id" />
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
import moment from 'moment'
import { useToastStore } from '@/store/toast'
import RegistroPersonalDialog from '../components/Dialogos/RegistroPersonalDialog.vue'
import AccionPersonalDialog from '../../RegistroPersonal/components/Dialogos/AccionPersonal.vue'
import RegistroPersonalTable from '../components/tables/RegistroPersonalTable.vue'
import EducacionDialog from './Dialogos/EducacionDialog.vue'

export default {
  components: {
    CSmartTable,
    RegistroPersonalTable,
    CModal,
    RegistroPersonalDialog,
    AccionPersonalDialog,
    moment,
    AccionPersonalDialog,
    EducacionDialog
  },
  data: function () {
    return {
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
      tabPaneActiveKey: 1,
      columns: [
        { key: 'codigo', label: 'Código', _style: { width: '15%' } },
        { key: 'apellidos', label: 'Apellido', _style: { width: '15%' } },
        { key: 'nombres', label: 'Nombre', _style: { width: '15%' } },
        { key: 'codigoIdentidad', label: 'Cédula', _style: { width: '10%' } },
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
            colspan: 1,
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
            this.lgDemo4 = true
          }
        },
        {
          label: 'Eventualidad'
        },

      ],
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
      'addRegistroPersonal',
      'getPosicion',
    ]),
    ...mapActions(useToastStore, ['show']),

    getRegistroPersonal() {
      Api.getAllEmpleado().then((response) => {
        this.registroPersonal = response.data.data
      })
    },


    closeRegistroPersonalModal() {
      this.showRegistroPersonalModal = false
      this.getRegistroPersonal()
    }
    ,
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
    openModal() {
      this.lgDemo = true
    },
    closeModal(payload) {
      this.lgDemo4 = payload
    },
    closeEducacion() {
      this.showEducacion = false
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

    getEmpleadoByID(item) {
      this.showEducacion = true
      this.employeeInfo = { ...item }
      this.employeeInfo.nombres = `${item.nombres} ${item.apellidos}`

    },

    toggleDetails(item) {
      this.showModal()
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

    submitForm(payload) {
      if (this.id != null) {
        Api.putEmpleado(this.id, payload).then((response) => {
          this.lgDemo = false
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })
          this.closeRegistroPersonalModal()
          this.id = null
          setTimeout(this.getRegistroPersonal, 500)
        })
      } else {


        Api.postEmpleado(payload)
          .then((response) => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            this.closeRegistroPersonalModal()
            this.id = null
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
    setInterval(() => {
      this.horaActual = moment().format('HH:mm')
    }, 1000)

    this.getRegistroPersonal()
    Api.getAllEmpleado().then((response) => {
      this.registroPersonal = response.data.data
      this.footerItem[0].label = `Items: ${response.data.data.length}`
    })
  },
  watch: {
    showRegistroPersonalModal() {
      this.getRegistroPersonal()
    }
  },
}
</script>
<style></style>
