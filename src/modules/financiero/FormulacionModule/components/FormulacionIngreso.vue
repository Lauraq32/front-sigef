<template>
  <h3 class="text-center">Formulaci&oacute;n Ingreso</h3>
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="
        () => {
          openModal()

          edit = false
        }
      ">Agregar</CButton>
    </div>

    <div class="p-2">
      <CButton color="info" @click="IngresoReport">Imprimir</CButton>
    </div>
    <div class="p-2">
      <CButton color="info" @click="downloadFile">Descargar</CButton>
    </div>
    <div class="p-2">
      <CButton color="info" @click="goToGasto">Ir a Formulaci&oacute;n Gasto</CButton>
    </div>
    <div class="p-2">
      <label class="file-select">
        <div class="select-button">
          <CIcon :icon="cilCloudUpload" size="m" />
        </div>
        <input type="file" id="formFile" @change="onFileChange" />
      </label>
    </div>
  </div>

  <CSmartTable clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" :footer="footerItem" header key="ingreso.id" :items="ingresos"
    :columns="columns" itemsPerPageSelect columnFilter :itemsPerPage="5"
    :items-per-page-options="[5, 10, 20, 50, 100, 150]" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>
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
          <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="toggleDetails(item)">
            {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
          </CButton>
          <CButton class="mt-1" color="danger" variant="outline" square size="sm" @click="deleteItem(item)">
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
  <CModal backdrop="static" size="lg" :visible="lgDemo" @close="
    () => {
      this.lgDemo = false
    }
  ">
    <div class="row">
      <div class="col-8 mt-3">
        <CModalTitle style="margin-top: 13px; margin-left: 4px">
          Partida del presupuesto de ingresos
        </CModalTitle>
      </div>
      <div class="col-4">
        <div class="row mt-4">
          <div class="col-4 bold">
            <label for="dni" style="font-weight: bold; margin-left: 12px; margin-top: 7px">A&ntilde;o</label>
          </div>
          <div class="col-6">
            <input type="number" name="dni" id="dni" v-model="anofiscal" class="form-control" disabled />
          </div>
        </div>
      </div>
    </div>
    <hr />
    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01" @submit="handleSubmitCustom01">
          <CCol :md="3">
            <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
            <div class="position-relative">
              <input ref="name" required on:keyup.native.enter="getClasificador" class="form-control padding-input"
                v-model="postIngreso.ctgClasificadorId" type="number" id="clasifica" />
              <span class="position-absolute icon-input">
                <CIcon icon="cisSearch" size="xl" v-on:click="getClasificador" />
              </span>
            </div>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>



          <CCol :md="2">
            <CFormLabel for="validationCustom02">Cta. Control</CFormLabel>
            <CFormInput disabled v-model="postIngreso.control" id="validationCustom02" required />
          </CCol>
          <CCol :md="7">
            <CFormLabel for="validationCustomUsername">Detalle</CFormLabel>
            <CInputGroup class="has-validation">
              <CFormInput disabled v-model="postIngreso.detalle" id="validationCustomUsername" value=""
                aria-describedby="inputGroupPrepend" required />
            </CInputGroup>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom03">Fuente Financiamiento</CFormLabel>
            <CFormInput :disabled="ctgFuenteId" v-model="postIngreso.ctgFuenteId" id="validationCustom03" required />
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Fuente Específica</CFormLabel>
            <CFormInput :disabled="ctgFuenteEspecificaId" v-model="postIngreso.ctgFuenteEspecificaId"
              id="validationCustom04" required>
            </CFormInput>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Organismo Financiador</CFormLabel>
            <CFormInput :disabled="ctgOrganismoFinanciadorId" v-model="postIngreso.ctgOrganismoFinanciadorId"
              id="validationCustom05" required />
          </CCol>
          <CCol :md="3">
            <CFormLabel>Institución Otorgante</CFormLabel>
            <CFormInput v-model="postIngreso.instOtorga" type="number" step="any">
            </CFormInput>
          </CCol>
          <hr />
          <CCol :md="4">
            <CFormLabel>Año Anterior</CFormLabel>
            <VueNumberFormat v-model:value="postIngreso.anioAnt" type="text" class="form-control" :options="{
              precision: 2,
              prefix: '',
              decimal: '.',
              thousand: ',',
            }" ref="anoAnteriorRef">
            </VueNumberFormat>
          </CCol>
          <CCol :md="4">
            <CFormLabel>A la Fecha</CFormLabel>
            <VueNumberFormat v-model:value="postIngreso.alaFecha" type="text" class="form-control" :options="{
              precision: 2,
              prefix: '',
              decimal: '.',
              thousand: ',',
            }"></VueNumberFormat>
          </CCol>
          <CCol :md="4">
            <CFormLabel>Presupuesto Formulado</CFormLabel>
            <VueNumberFormat v-model:value="postIngreso.presForm" type="text" step="any" class="form-control" :options="{
              precision: 2,
              prefix: '',
              decimal: '.',
              thousand: ',',
            }"></VueNumberFormat>
          </CCol>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="
              () => {
                lgDemo = false
              }
            ">
              Cerrar
            </button>
            <button :disabled="formuladoValue" v-on:click="submitForm" type="button" class="btn btn-primary">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
  <CModal size="lg" :visible="findClasificadorModal" @close="
    () => {
      findClasificadorModal = false
    }
  ">


    <CModalBody>
      <CCardBody>
        <CSmartTable clickableRows :tableProps="{
          striped: true,
          hover: true,
        }" :tableHeadProps="{}" :activePage="1" tableFilter header key="ingreso.id" :items="clasificadorItems"
          :columns="clasificadorColumns" itemsPerPageSelect :itemsPerPage="5"
          :items-per-page-options="[5, 10, 20, 50, 100, 150]" columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }" pagination>

          <template #show_details="{ item }">
            <td class="py-2">
              <div class="d-flex justify-content-around">
                <CButton class="mt-1" color="primary" variant="outline" square size="sm"
                  @click="SelectClasificador(item)">
                  {{ Boolean(item._toggled) ? 'Hide' : 'Seleccionar' }}
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
        <div class="d-flex flex-row-reverse">
          <button @click="() => { findClasificadorModal = false }" type="button" class="btn btn-secondary">
            Cerrar
          </button>
        </div>

      </CCardBody>

    </CModalBody>

  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import VueNumberFormat from 'vue-number-format'
import { CModal } from '@coreui/vue'
import Api from '../services/FormulacionServices'
import { mapActions } from 'pinia'
import XLSX from 'xlsx/xlsx.mjs'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { CIcon } from '@coreui/icons-vue'
import { cilCloudUpload } from '@coreui/icons-pro'
import { useToastStore } from '@/store/toast'
import router from '@/router'
export default {
  components: {
    CSmartTable,
    CModal,
    CIcon,
  },
  data: () => {
    return {
      clasificadorItems: [],
      findClasificadorModal: false,
      cilCloudUpload,
      texto: null,
      fileName: '',
      ingresos: [],
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
        anioAnt: 0,
        alaFecha: 0,
        presForm: 0,
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
      clasificadorColumns: [
        { key: 'clasifica', label: 'Clasificador' },
        { key: 'cControl', label: 'Control' },
        { key: 'nombre', label: 'Detalle', _style: { width: '25%' } },
        {
          key: 'tipo',
          label: 'Tipo',
          filter: false,
          sorter: false,
          _style: { width: '5%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        }
      ],

    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
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


    SelectClasificador(clasificador) {
      Api.getClasificador(clasificador.clasifica)
        .then((response) => {
          if (response.data.data) {
            this.postIngreso.ctgClasificadorId = clasificador.clasifica
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
            return
          } else if (response.data.Data) {
            console.log()
            return this.show({
              content: error.message,
              closable: true,
              color: 'danger',
            })
          }
          // return Promise.reject(new Error(response.data.Data))
        })
        .catch((error) => {
          if (response.Errors == null) {
            return this.show({
              content: error.message,
              closable: true,
              color: 'danger',
            })
          }
        })

      
      // this.postIngreso.control = clasificador.cControl
      // this.postIngreso.detalle = clasificador.nombre
      // this.postIngreso.ctgFuenteId = clasificador.ctgFuenteId
      // this.postIngreso.ctgFuenteEspecificaId =
      //   clasificador.ctgFuenteEspecificaId
      // this.postIngreso.ctgOrganismoFinanciadorId =
      //   clasificador.ctgOrganismoFinanciadorId
      this.findClasificadorModal = false
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
              ctgClasificadorId: `${Object.values(item)[2]}${Object.values(item)[3]
                }${Object.values(item)[4]}${Object.values(item)[5]
                }${Object.values(item)[6].toString().padStart(2, 0)}`,
              instOtorga: Object.values(item)[10],
              control: '',
              detalle: Api.getClasificador(
                `${Object.values(item)[2]}${Object.values(item)[3]}${Object.values(item)[4]
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

          Api.postCargaMasiva(this.presIngrsoMasivo).then((response) => { })
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
      setTimeout(this.getTotales, 1000)
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
        anioAnt: 0,
        ctgFuenteId: null,
        ctgFuenteEspecificaId: null,
        ctgOrganismoFinanciadorId: null,
        alaFecha: 0,
        presForm: 0,
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
          // this.lgDemo = false
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })

          this.getAllIngreso()
          this.postIngreso = {
            anioFiscalId: parseInt(localStorage.getItem('ano')),
            ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
            ctgClasificadorId: null,
            instOtorga: 0,
            control: '',
            detalle: null,
            anioAnt: 0,
            ctgFuenteId: null,
            ctgFuenteEspecificaId: null,
            ctgOrganismoFinanciadorId: null,
            alaFecha: 0,

            presForm: 0,
            variacion: 0,
            ingresos: 0,
            variacionResumen: 0,
          }

          setTimeout(this.getAllIngreso, 3000)

          this.getTotales()
          this.id = null
        })
      } else {
        this.postIngreso.anioAnt = parseFloat(this.postIngreso.anioAnt)
        this.postIngreso.alaFecha = parseFloat(this.postIngreso.alaFecha)
        this.postIngreso.presForm = parseFloat(this.postIngreso.presForm)
        Api.postFormulacionIngreso(this.postIngreso).then((response) => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
          console.log(response)
          this.postIngreso = {
          anioFiscalId: parseInt(localStorage.getItem('ano')),
          ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
          ctgClasificadorId: null,
          instOtorga: 0,
          control: '',
          detalle: null,
          anioAnt: 0,
          ctgFuenteId: null,
          ctgFuenteEspecificaId: null,
          ctgOrganismoFinanciadorId: null,
          alaFecha: 0,

          presForm: 0,
          variacion: 0,
          ingresos: 0,
          variacionResumen: 0,
        }
        }).catch((error) => {
          console.log(error)
        })

        // this.lgDemo = true

        this.validatedCustom01 = false
        setTimeout(this.getAllIngreso, 500)
        // this.clearModal()
        this.getTotales()
      }
    },
    getClasificador() {
      this.findClasificadorModal = true
      Api.getListarClasificadores().then(response => {
        this.clasificadorItems = response.data.data
        console.log(response)
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
    getAllIngreso() {
      Api.getAllFormulacionIngreso().then((response) => {
        console.log('233', response.data)
        this.ingresos = response.data.data
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
        this.getAllIngreso(), this.getTotales()
      })
    },
  },
  computed: {},

  mounted() {
    this.getTotales()
    this.getAllIngreso()
  },
}
</script>
<style scoped>
.padding-input {
  padding-right: 2.5rem;
}

.icon-input {
  padding: 0.2rem;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  right: 2px;
}

.file-select>.select-button {
  padding: 0.5rem;
  line-height: 1.5;
  color: white;
  background-color: #375b80;

  border-radius: 0.3rem;
  cursor: pointer;
  text-align: center;
}

.file-select>input[type='file'] {
  display: none;
}
</style>

