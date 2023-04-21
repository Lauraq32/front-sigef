<template>
  <h3 class="text-center">Mantenimientos Empleados</h3>
  <AccionPersonalDialog
    :showModal="showAccionPersonal"
    @closeModal="closeAccionPersonal"
    :empleado="accionEmpleado"
  />
  <TipoNovedadDialog
    :showModal="showTipoNovedad"
    @closeModal="closeTipoNovedad"
  />
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            showModal()
          }
        "
        >Agregar</CButton
      >

      <div class="d-inline p-2">
        <CButton
          color="info"
          @click="
            () => {
              reportes = true
            }
          "
          >Imprimir Reporte</CButton
        >
      </div>
    </div>
  </div>

  <CSmartTable
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    header
    :items="registroPersonal"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
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
      <template v-if="item.estatus !== false">
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline"
            >Acciones</CDropdownToggle
          >
          <CDropdownMenu>
            <CDropdownItem @click="toggleDetails(item)">Editar</CDropdownItem>
            <CDropdownItem @click="deleteEmp(item)">Eliminar</CDropdownItem>
            <CDropdownItem
              @click="
                () => {
                  showAccionPersonal = true
                  accionEmpleado = item
                }
              "
              >Evaluación</CDropdownItem
            >
            <CDropdownItem
              @click="
                () => {
                  showTipoNovedad = true
                }
              "
              >Eventualidad</CDropdownItem
            >

            <CDropdownItem
              @click="
                () => {
                  empleado = item
                  newTarjetaEmpleadoModal = true
                }
              "
              >Tarjeta</CDropdownItem
            >
          </CDropdownMenu>
        </CDropdown>
      </template>
      <template v-if="item.estatus == false">
        <td>
          <CBadge color="danger" shape="rounded-pill">{{
            item.estatus ? 'Activo' : 'Inactivo'
          }}</CBadge>
        </td>
      </template>
    </template>
  </CSmartTable>

  <RegistroPersonalDialog
    :showModal="showRegistroPersonalModal"
    @post-personal="submitForm"
    @close-modal="closeRegistroPersonalModal"
    :empleadoId="id"
  />

  <TarjetaEmpleadoDialogs
    :newTarjetaEmpleadoModal="newTarjetaEmpleadoModal"
    @close-modal="closeTarjetaEmpleadoModal"
    :empleado="empleado"
  />
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
import AccionPersonalDialog from './AccionPersonal.vue'
import TipoNovedadDialog from './TipoNovedades.vue'
import RegistroPersonalDialog from '../components/Dialogos/RegistroPersonalDialog.vue'
import TarjetaEmpleadoDialogs from '../components/Dialogos/TarjetaEmpleado.vue'

export default {
  components: {
    CSmartTable,
    CModal,
    moment,
    AccionPersonalDialog,
    TipoNovedadDialog,
    RegistroPersonalDialog,
    TarjetaEmpleadoDialogs,
  },

  data: function () {
    return {
      accionEmpleado: {},
      accionPersonal: [],
      showAccionPersonal: false,
      showTipoNovedad: false,
      empleado: null,
      newTarjetaEmpleadoModal: false,
      showRegistroPersonalModal: false,
      id: null,
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

    getAccionPersonal() {
      Api.getAllAccionPersonal().then((response) => {
        this.accionPersonal = response.data.data
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
      var hoy = new Date()
      var cumpleanos = new Date(fechaNacimiento)
      var edad = hoy.getFullYear() - cumpleanos.getFullYear()
      var mes = hoy.getMonth() - cumpleanos.getMonth()
      if (mes < 0 || (mes === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--
      }
      return edad
    },
    openModal() {
      this.lgDemo = true
    },
    closeAccionPersonal(close) {
      this.showAccionPersonal = close
    },

    closeTipoNovedad(close) {
      this.showTipoNovedad = close
    },

    formatDate(fechaIngreso) {
      return new Date(fechaIngreso).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },

    toggleDetails(item) {
      console.log(item)
      this.showRegistroPersonalModal = true
      this.id = item.id
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
          this.id = null
          setTimeout(this.getRegistroPersonal, 500)
        })
      } else {
        setTimeout(this.getRegistroPersonal, 500)

        Api.postEmpleado(payload)
          .then((response) => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            this.id = null
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
        ;(this.postEmpleado = {
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
            title: error.errors,
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
  },
  watch: {
    showRegistroPersonalModal() {
      this.getRegistroPersonal()
    },
  },
}
</script>
