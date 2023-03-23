<template>
  <h3 class="text-center">Formulaci&oacute;n Ingreso</h3>
  <AppPageHeader
    :addDropdowm="true"
    :addButtonForm="addbuttonform"
    :actions="acciones"
    :anoFiscal="true"
    :addButton="true"
    :addFileButton="true"
  />
  <CSmartTable
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    :footer="footerItem"
    header
    key="ingreso.id"
    :items="ingresos"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    :items-per-page-options="[5, 10, 20, 50, 100, 150]"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #ctgFuenteEspecificaId="{ item }">
      <td class="text-center">
        {{ item.ctgFuenteEspecificaId }}
      </td>
    </template>

    <template #ctgFuenteId="{ item }">
      <td class="text-center">
        {{ item.ctgFuenteId }}
      </td>
    </template>

    <template #ctgOrganismoFinanciadorId="{ item }">
      <td class="text-center">
        {{ item.ctgOrganismoFinanciadorId }}
      </td>
    </template>

    <template #instOtorga="{ item }">
      <td class="text-center">
        {{ item.instOtorga }}
      </td>
    </template>
    <template #alaFecha="{ item }">
      <td class="text-end">
        {{ formatPrice(item.alaFecha) }}
      </td>
    </template>
    <template #anioAnt="{ item }">
      <td class="text-end">
        {{ formatPrice(item.anioAnt) }}
      </td>
    </template>

    <template #presForm="{ item }">
      <td class="text-end">
        {{ formatPrice(item.presForm) }}
      </td>
    </template>

    <template #show_details="{ item }">
      <td class="py-2">
        <div class="d-flex justify-content-around">
          <CButton
            class="mt-1"
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item)"
          >
            {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
          </CButton>
          <CButton
            class="mt-1"
            color="danger"
            variant="outline"
            square
            size="sm"
            @click="deleteItem(item)"
          >
            {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
          </CButton>
        </div>
      </td>
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
  <CModal
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <div class="row">
      <div class="col-8 mt-3">
        <CModalTitle style="margin-top: 13px; margin-left: 4px">
          Partida del presupuesto de ingresos
        </CModalTitle>
      </div>
      <div class="col-4">
        <div class="row mt-4">
          <div class="col-4 bold">
            <label
              for="dni"
              style="font-weight: bold; margin-left: 12px; margin-top: 7px"
              >Período</label
            >
          </div>
          <div class="col-6">
            <input
              type="number"
              name="dni"
              id="dni"
              v-model="anofiscal"
              class="form-control"
              disabled
            />
          </div>
        </div>
      </div>
    </div>
    <hr />
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="2">
            <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
            <input
              ref="name"
              required
              on:keyup.native.enter="getClasificador"
              class="form-control"
              v-model="postIngreso.ctgClasificadorId"
              type="number"
              id="clasifica"
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="1">
            <button
              class="btn btn-primary btn-sm"
              style="margin-top: 32px; height: 37px"
              v-on:click="getClasificador"
            >
              Buscar
            </button>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom02">Cta. Control</CFormLabel>
            <CFormInput
              disabled
              v-model="postIngreso.control"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="5">
            <CFormLabel for="validationCustomUsername">Detalle</CFormLabel>
            <CInputGroup class="has-validation">
              <CFormInput
                disabled
                v-model="postIngreso.detalle"
                id="validationCustomUsername"
                value=""
                aria-describedby="inputGroupPrepend"
                required
              />
              <CFormFeedback valid> Exito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CInputGroup>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom03"
              >Fuente Financiamiento</CFormLabel
            >
            <CFormInput
              :disabled="ctgFuenteId"
              v-model="postIngreso.ctgFuenteId"
              id="validationCustom03"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Fuente Especifica</CFormLabel>
            <CFormInput
              :disabled="ctgFuenteEspecificaId"
              v-model="postIngreso.ctgFuenteEspecificaId"
              id="validationCustom04"
              required
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05"
              >Organismo Financiador</CFormLabel
            >
            <CFormInput
              disabled
              v-model="postIngreso.ctgOrganismoFinanciadorId"
              id="validationCustom05"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel>Institucion Otorgante</CFormLabel>
            <CFormInput
              v-model="postIngreso.instOtorga"
              type="number"
              step="any"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <hr />
          <CCol :md="4">
            <CFormLabel>Año Anterior</CFormLabel>
            <CFormInput
              v-model="postIngreso.anioAnt"
              type="decimal"
              step="any"
              ref="anoAnteriorRef"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel>A la Fecha</CFormLabel>
            <CFormInput
              v-model="postIngreso.alaFecha"
              type="number"
              step="any"
            ></CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel>Presupuesto Formulado</CFormLabel>
            <CFormInput
              v-model="postIngreso.presForm"
              type="number"
              step="any"
            ></CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button
              :disabled="formuladoValue"
              v-on:click="submitForm"
              type="button"
              class="btn btn-primary"
            >
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { CDateRangePicker, CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/FormulacionServices'
import { mapActions, mapState } from 'vuex'
import XLSX from 'xlsx/xlsx.mjs'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { CIcon } from '@coreui/icons-vue'
import { cilCloudUpload } from '@coreui/icons-pro'
import router from '@/router'
import AppPageHeader from '@/components/AppPageHeader.vue'
export default {
  components: {
    CSmartTable,
    CModal,
    CIcon,
    AppPageHeader,
  },
  data: function () {
    return {
      addbuttonform: {
        label: 'Agregar',
        accion: () => {
          this.lgDemo = true
        },
      },

      acciones: [
        {
          label: 'Imprimir',
          accion: this.IngresoReport.bind(this),
        },
        {
          label: 'Descargar',
          accion: this.downloadFile.bind(this),
        },
        {
          label: 'Ir a Formulario Gasto',
          accion: () => {
            router.push({ name: 'Formulacion Gasto' })
          },
        },
      ],

      cilCloudUpload,
      texto: null,
      fileName: '',
      presIngrsoMasivo: [],
      anofiscal: parseInt(localStorage.getItem('ano')),
      ctgFuenteId: true,
      ctgFuenteEspecificaId: true,
      ctgOrganismoFinanciadorId: true,
      formuladoValue: false,
      edit: false,
      id: null,
      formulado: {
        alafecha: 0,
        anO_ANT: 0,
        preS_FORM: 0,
      },

      postIngreso: {
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        ctgClasificadorId: null,
        instOtorga: 0,
        control: '',
        detalle: null,
        ctgFuenteId: null,
        ctgFuenteEspecificaId: null,
        ctgOrganismoFinanciadorId: null,
        anioAnt: null,
        alaFecha: null,
        presForm: null,
        variacion: 0,
        ingresos: 0,
        variacionResumen: 0,
      },
      validatedCustom01: null,
      lgDemo: false,
      footerItem: [
        {
          label: 'Total presupuesto',
          _props: {
            color: '',
            colspan: 6,
            style: 'font-weight:bold; text-align:right',
          },
        },
        {
          label: 'prueba',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
        {
          label: 'prueba',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
        {
          label: 'preS_FORM',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
      ],
      columns: [
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '8%' },
        },
        {
          key: 'detalle',
          label: 'Descripción',
          sorter: false,
          _style: { width: '13%' },
        },
        {
          key: 'ctgFuenteId',
          label: 'F/Financiamiento',
          _style: { width: '14%' },
        },
        {
          key: 'ctgFuenteEspecificaId',
          label: 'F/Específica',
          _style: { width: '8%' },
        },
        {
          key: 'ctgOrganismoFinanciadorId',
          label: 'Org/Financiamiento',
          _style: { width: '14%' },
        },
        {
          key: 'instOtorga',
          label: 'Inst/Otorgante',
          filter: false,
          _style: { width: '8%' },
        },
        {
          key: 'anioAnt',
          label: 'Año anterior',
          filter: false,
          _style: { width: '8%' },
        },
        {
          key: 'alaFecha',
          label: 'A la Fecha',
          filter: false,
          _style: { width: '8%' },
        },
        {
          key: 'presForm',
          label: 'Pre/Formulado',

          filter: false,
          _style: { width: '8%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        },
      ],
      details: [],
    }
  },
  methods: {
    downloadFile() {
      Api.downloadIngreso().then((response) => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]))
        var fURL = document.createElement('a')

        fURL.href = fileURL
        fURL.setAttribute(
          'download',
          `FI-${localStorage
            .getItem('usuario')
            .substring(4, 8)}${localStorage.getItem('fecha')}.csv`,
        )
        document.body.appendChild(fURL)

        fURL.click()
      })
    },

    focusInput() {
      this.$refs.name.focus()
    },

    unaVez() {
      this.focusInput()
    },

    openModal() {
      this.lgDemo = true

      setTimeout(this.unaVez, 200)
    },

    onFileChange(event) {
      this.fileName = event.target.files[0].name
      this.file = event.target.files ? event.target.files[0] : null
      if (this.file) {
        const reader = new FileReader()

        reader.onload = (e) => {
          const bstr = e.target.result
          const wb = XLSX.read(bstr, {
            type: 'binary',
            cellDates: true,
            dateNF: 'yyyy/mm/dd;@',
          })
          const wsname = wb.SheetNames[0]
          const ws = wb.Sheets[wsname]
          const data = XLSX.utils.sheet_to_json(ws)
          this.texto = wb
          data.map((item) => {
            this.presIngrsoMasivo.push({
              ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
              anioFiscalId: parseInt(localStorage.getItem('ano')),
              ctgClasificadorId: `${Object.values(item)[2]}${
                Object.values(item)[3]
              }${Object.values(item)[4]}${
                Object.values(item)[5]
              }${Object.values(item)[6].toString().padStart(2, 0)}`,
              instOtorga: Object.values(item)[10],
              control: '',
              detalle: Api.getClasificador(
                `${Object.values(item)[2]}${Object.values(item)[3]}${
                  Object.values(item)[4]
                }${Object.values(item)[5]}${Object.values(item)[6]
                  .toString()
                  .padStart(2, 0)}`,
              ).then((response) => {
                response.data.data.nombre
              })[0],
              ctgFuenteId: Object.values(item)[7],
              ctgFuenteEspecificaId: Object.values(item)[8],
              ctgOrganismoFinanciadorId: Object.values(item)[9],
              anioAnt: 0,
              alaFecha: Object.values(item)[13],
              presForm: Object.values(item)[12],
              variacion: 0,
              ingresos: 0,
              variacionResumen: 0,
            })
          })

          Api.postCargaMasiva(this.presIngrsoMasivo).then((response) => {})
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            text: 'Datos agregados con exito',
            title: 'Agregado',
            showConfirmButton: false,
            timer: 1500,
          })
        }

        reader.readAsBinaryString(this.file)
      }
      setTimeout(this.getListarIngresos, 1000)
    },
    goToGasto() {
      router.push({ name: 'Formulacion Gasto' })
    },
    formatCurrency(anioAnt) {
      return anioAnt.toLocaleString('es-MX', {
        style: 'currency',
        currency: 'DOP',
      })
    },
    getTotales() {
      Api.getTotalIngresos(
        localStorage.getItem('id_Ayuntamiento'),
        localStorage.getItem('ano'),
      ).then((response) => {
        this.footerItem[1].label = this.formatPrice(response.data.data.anioAnt)
        this.footerItem[2].label = this.formatPrice(response.data.data.alaFecha)
        this.footerItem[3].label = this.formatPrice(response.data.data.presForm)
        this.footerItem[3].label = this.formatPrice(response.data.data.presForm)
      })
    },

    validateInputctgFuente() {
      if (this.postIngreso.ctgFuenteId == '') {
        this.ctgFuenteId = false
      } else if (
        this.postIngreso.ctgFuenteId !== '' ||
        this.postIngreso.ctgFuenteId.length > 30
      ) {
        this.ctgFuenteId = true
      }
    },
    validateInputctgFuenteEspecificaId() {
      if (this.postIngreso.ctgFuenteEspecificaId == '') {
        this.ctgFuenteEspecificaId = false
      } else if (
        this.postIngreso.ctgFuenteEspecificaId !== '' ||
        this.postIngreso.ctgFuenteEspecificaId.length > 30
      ) {
        this.ctgFuenteEspecificaId = true
      }
    },
    validateInputctgOrganismoFinanciadorId() {
      if (this.postIngreso.ctgOrganismoFinanciadorId == '') {
        this.ctgOrganismoFinanciadorId = false
      } else if (
        this.postIngreso.ctgOrganismoFinanciadorId !== '' ||
        this.postIngreso.ctgOrganismoFinanciadorId.length > 30
      ) {
        this.ctgOrganismoFinanciadorId = true
      }
    },

    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    clearModal() {
      this.postIngreso = {
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        ctgClasificadorId: null,
        instOtorga: 0,
        control: '',
        detalle: null,
        anioAnt: null,
        ctgFuenteId: null,
        ctgFuenteEspecificaId: null,
        ctgOrganismoFinanciadorId: null,
        alaFecha: null,
        presForm: null,
        variacion: 0,
        ingresos: 0,
        variacionResumen: 0,
      }
    },

    submitForm() {
      const inputClasificador = document.getElementById('clasifica')
      inputClasificador.focus()
      if (this.id) {
        Api.editPresIngreso(this.id, this.postIngreso).then((response) => {
          this.lgDemo = false
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: response.data.message,
            showConfirmButton: false,
            timer: 1500,
          })

          this.$store.dispatch('Formulacion/getListarIngresos')
          this.postIngreso = {
            anioFiscalId: parseInt(localStorage.getItem('ano')),
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            ctgClasificadorId: null,
            instOtorga: 0,
            control: '',
            detalle: null,
            anioAnt: null,
            ctgFuenteId: null,
            ctgFuenteEspecificaId: null,
            ctgOrganismoFinanciadorId: null,
            alaFecha: null,

            presForm: null,
            variacion: 0,
            ingresos: 0,
            variacionResumen: 0,
          }

          setTimeout(this.getListarIngresos, 3000)

          this.getTotales()
          this.id = null
        })
      } else {
        this.postIngreso.anioAnt = parseFloat(this.postIngreso.anioAnt)
        this.postIngreso.alaFecha = parseFloat(this.postIngreso.alaFecha)
        this.postIngreso.presForm = parseFloat(this.postIngreso.presForm)
        this.$store.dispatch('Formulacion/PostIngreso', this.postIngreso)

        // this.lgDemo = true
        this.$store.dispatch('Formulacion/getListarIngresos')
        this.postIngreso = {
          anioFiscalId: parseInt(localStorage.getItem('ano')),
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          ctgClasificadorId: null,
          instOtorga: 0,
          control: '',
          detalle: null,
          anioAnt: null,
          ctgFuenteId: null,
          ctgFuenteEspecificaId: null,
          ctgOrganismoFinanciadorId: null,
          alaFecha: null,

          presForm: null,
          variacion: 0,
          ingresos: 0,
          variacionResumen: 0,
        }
        this.validatedCustom01 = false
        setTimeout(this.getListarIngresos, 500)

        this.getTotales()
      }
    },
    getClasificador() {
      Api.getClasificador(this.postIngreso.ctgClasificadorId)
        .then((response) => {
          this.postIngreso.control = response.data.data.cControl
          this.postIngreso.detalle = response.data.data.nombre
          this.postIngreso.ctgFuenteId = response.data.data.ctgFuenteId
          this.postIngreso.ctgFuenteEspecificaId =
            response.data.data.ctgFuenteEspecificaId
          this.postIngreso.ctgOrganismoFinanciadorId =
            response.data.data.ctgOrganismoFinanciadorId
          this.validateInputctgFuente()
          this.validateInputctgFuenteEspecificaId()
          this.validateInputctgOrganismoFinanciadorId()
        })
        .catch((error) => {
          this.$swal({
            position: 'top-end',
            icon: 'error',
            text: `${error.response.data.details}`,
            title: 'El clasificador no existe',
            showConfirmButton: false,
            timer: 1500,
          })
        })
    },
    focusAno() {
      this.$refs.anoAnteriorRef.focus()
    },
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      event.preventDefault()
      event.stopPropagation()
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
    IngresoReport() {
      window
        .open(
          `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Ingresos_Formulacion&rs:Command=Render&CAPITULO_AYTO=${localStorage.getItem(
            'id_Ayuntamiento',
          )}&ANO=2022`,
          '_blank',
        )
        .focus()
    },
    toggleDetails(item) {
      if (item.ingresos !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true

      Api.getPresIngresoById(item).then((response) => {
        this.id = item.id
        this.postIngreso = response.data.data
      })
    },
    deleteItem(item) {
      Api.deleteIngreso(item.id).then((response) => {
        this.$swal({
          position: 'top-end',
          icon: 'success',
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        })
        this.getListarIngresos(), this.getTotales()
      })
    },

    ...mapActions('Formulacion', ['getListarIngresos']),
  },
  computed: {
    ...mapState('Formulacion', ['ingresos']),
  },

  created() {
    this.getListarIngresos(), this.getTotales()
  },
}
</script>
<style scoped>
.file-select > .select-button {
  padding: 0.5rem;
  line-height: 1.5;
  color: white;
  background-color: #375b80;

  border-radius: 0.3rem;
  cursor: pointer;
  text-align: center;
}

.file-select > input[type='file'] {
  display: none;
}
</style>
