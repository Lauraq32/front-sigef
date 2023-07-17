<template>
  <h3 class="text-center mb-4">Registro de Empleados</h3>

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
          <CButton color="info" @click="showModal">Agregar</CButton>
          <CButton
            color="secondary"
            @click="
              () => {
                reportes = true
              }
            "
            >Reporte</CButton
          >
        </div>
      </div>
    </CCardBody>
  </CCard>

  <RegistroPersonalTable
    :tableData="registroPersonal"
    :tableColumns="columns"
    :actions="buttonActions"
    :footer="footerItem"
    :inactivoActions="inactivoActions"
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

  <ContenedorArchivosModel
    :showModal="showModalDoc"
    :tagKeyName="'empleadoId'"
    :tagValueName="selectedEmployee?.id"
    @closeModal="closeContenedorModal"
  />

  <EducacionDialog
    :showModal="showEducacion"
    :employeeInfo="selectedEmployee"
    @closeModal="() => (showEducacion = false)"
  />

  <UtilesLaboralesDialog
    :showModal="showUtilesLaboralesDialog"
    :employeeInfo="selectedEmployee"
    @closeModal="() => (showUtilesLaboralesDialog = false)"
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
      <CButton
        color="secondary"
        @click="
          () => {
            reportes = false
          }
        "
        >Cerrar</CButton
      >
      <CButton color="primary" @click="imprimirReporte">Ver</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'
import Api from '../services/RegistroPersonalServices'
import fileApi from '../services/Files'
import EmpleadoReports from '@/components/Report/RRHH/ReportsTemplate/EmpleadosReports.vue'
import { useToastStore } from '@/store/toast'
import RegistroPersonalDialog from '../components/Dialogos/RegistroPersonalDialog.vue'
import RegistroPersonalTable from '../components/tables/RegistroPersonalTable.vue'
import EducacionDialog from './Dialogos/EducacionDialog.vue'
import ContenedorArchivosModel from '@/components/ContenedorArchivosModel.vue'
import AccionPersonalDialog from './Dialogos/AccionPersonalDialog.vue'
import UtilesLaboralesDialog from './Dialogos/UtilesLaboralesDialog.vue'
import TipoNovedadDialog from './TipoNovedades.vue'
import TarjetaEmpleadoDialogs from '../components/Dialogos/TarjetaEmpleado.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { showReport } from '@/utils/util'

export default {
  components: {
    RegistroPersonalTable,
    CModal,
    RegistroPersonalDialog,
    AccionPersonalDialog,
    AccionPersonalDialog,
    ContenedorArchivosModel,
    TipoNovedadDialog,
    RegistroPersonalDialog,
    TarjetaEmpleadoDialogs,
    EmpleadoReports,
    EducacionDialog,
    UtilesLaboralesDialog,
  },

  data: function () {
    return {
      selectedEmployee: {},
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
      showUtilesLaboralesDialog: false,
      registroPersonal: [],
      reporteDepto: '1',
      reportes: false,
      columns: [
        { key: 'codigo', label: 'Código', _style: { width: '5%' } },
        { key: 'apellido', label: 'Apellido', _style: { width: '15%' } },
        { key: 'nombre', label: 'Nombre', _style: { width: '15%' } },
        {
          key: 'codigoIdentidad',
          label: 'Cédula/Pasaporte',
          _style: { width: '10%' },
        },
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
          _style: { width: '3%' },
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
      inactivoActions: [
        {
          label: 'Reactivar',
          clickHandler: (value) => {
            this.reactivarEmpleado(value)
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
          label: 'Acción personal',
          clickHandler: (value) => {
            this.selectedEmployee = value
            this.showAccionPersonal = true
          },
        },
        {
          label: 'Tabla de acciones',
          clickHandler: (value) => {
            this.showTipoNovedad = true
            this.selectedEmployee = value
          },
        },
        {
          label: 'Útiles laborales',
          clickHandler: (value) => {
            this.showUtilesLaboralesDialog = true
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

    getRegistroPersonal(filter) {
      Api.getAllEmpleado(filter).then((response) => {
        this.registroPersonal = response.data.data;
        this.footerItem[0].label = `Total Items: ${response.data.data.length}`;
      })
    },

    closeRegistroPersonalModal() {
      this.selectedEmployee = {}
      this.showRegistroPersonalModal = false
    },

    closeTarjetaEmpleadoModal() {
      this.newTarjetaEmpleadoModal = false
    },
    showModal() {
      this.showRegistroPersonalModal = true
    },

    async imprimirReporte() {
      const reportParam = {
        folderName: 'rrhh',
        params: [
          {
            name: 'ID_AYUNTAMIENTO',
            value: 'majorityId',
          },
        ],
      }

      try {
        if (this.reporteDepto === '1') {
          reportParam.reportName = 'Rep_Empleados_por_Nombre'
        }
        if (this.reporteDepto === '2') {
          reportParam.reportName = 'Rep_Empleados_por_Apellidos'
        }
        if (this.reporteDepto === '3') {
          reportParam.reportName = 'Rep_Empleados_por_Cargo'
        }
        if (this.reporteDepto === '4') {
          reportParam.reportName = 'Rep_Empleados_por_Departamento'
        }
        await showReport(reportParam)

        this.reportes = false
      } catch (error) {
        this.show({
          content: error,
          closable: true,
          color: 'danger',
          class: 'text-white',
        })
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
      this.selectedEmployee = item
      this.showModal()
    },

    async submitForm({ payload, profilePhoto }) {
      if (payload.id) {
        this.saveProfilePhoto(profilePhoto, payload.idImagenPerfil, payload.id)
          .then((imageId) => {
            if (imageId) {
              payload.idImagenPerfil = imageId
            }

            return Api.putEmpleado(payload.id, payload).then(() => {
              this.show({
                content: 'Registro actualizado correctamente',
                closable: true,
              })
              this.closeRegistroPersonalModal()
              setTimeout(this.getRegistroPersonal, 200)
            })
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
        Api.postEmpleados(payload)
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
        title: `Estás usted seguro que quieres eliminar este empleado?`,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'btns',
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

    handleFilterEmployeeByStatus({ target }) {
      this.getRegistroPersonal({
        status: target.value,
      })
    },
    saveProfilePhoto(file, fallback, empleadoId) {
      if (!file || fallback) {
        return Promise.resolve(fallback ?? 0)
      }

      return new Promise((res, rej) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('empleadoId', empleadoId)
        formData.append('profileImage', 1)
        formData.append('uploaded', new Date().toISOString())
        formData.append('public', true)

        fileApi
          .saveFile(formData)
          .then((response) => res(response.data.data[0].id))
          .catch(rej)
      })
    },
    reactivarEmpleado(item) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Estás usted seguro que quieres reactivar este empleado?`,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'btns',
      }).then((answer) => {
        if (answer.isConfirmed) {
          Api.reactivarEmpleado(item.id)
            .then((response) => {
              this.show({
                content: response.data.message,
                closable: true,
                color: 'inherit',
              })
              setTimeout(() =>
                this.getRegistroPersonal({
                  status: 'inactivo',
                }),
                500,
              )
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
  mounted() {
    this.getRegistroPersonal()
  },
}
</script>
