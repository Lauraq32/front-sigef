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
  <AppUploadButton :addFileButton="true" :title="title"  />
  
  
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
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
            Editar
          </CButton>
          <CButton class="mt-1" color="danger" variant="outline" square size="sm" @click="deleteItem(item)">
            Eliminar
          </CButton>
        </div>
      </td>
    </template>
  </CSmartTable>

  <CModal backdrop="static" size="lg" :visible="showPartidaPresupuestodeIngresoDialog" @close="
    () => {
      this.showPartidaPresupuestodeIngresoDialog = false
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
              <input ref="name" required v-on:keyup.enter="() => findClasificadorModal = true" class="form-control padding-input"
                v-model="postIngreso.ctgClasificadorId" type="number" id="clasifica" />
              <span class="position-absolute icon-input">
                <CIcon icon="cisSearch" size="xl" v-on:click="() => findClasificadorModal = true" />
              </span>
            </div>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>



          <CCol :md="2">
            <CFormLabel for="validationCustom02">Cta. Control</CFormLabel>
            <CFormInput disabled v-model="postIngreso.ctaControl" id="validationCustom02" required />
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
            <CFormLabel for="validationCustom04">Fuente Espec&iacute;fica</CFormLabel>
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
            <CFormLabel>Instituci&oacute;n Otorgante</CFormLabel>
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
                showPartidaPresupuestodeIngresoDialog = false
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
  
  <ClasificadorSelectorDialog :isVisible="findClasificadorModal" :filtered="
    (clasificator) =>
    (clasificator.tipo ===
      'DETALLE' && clasificator.origen === 'INGRESO' && clasificator?.clasifica?.toString().match(/^(1|3)/g))
  " :term="postIngreso.ctgClasificadorId" @close="selectClasificador" />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import VueNumberFormat from 'vue-number-format'
import { CModal } from '@coreui/vue'
import Api from '../services/FormulacionServices'
import { mapActions, mapStores, mapState } from 'pinia'
import XLSX from 'xlsx/xlsx.mjs'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { CIcon } from '@coreui/icons-vue'
import { useToastStore } from '@/store/toast'
import { useAuthStore } from '@/store/AuthStore'
import router from '@/router'
import AppPageHeader from '@/components/AppPageHeader.vue'
import AppUploadButton from '@/components/AppUploadButton.vue'
import ClasificadorSelectorDialog from './ClasificadorSelectorDialog.vue';
import { formatPrice } from '../../../../utils/format'
export default {
  components: {
    CSmartTable,
    CModal,
    CIcon,

    AppUploadButton,
    AppPageHeader,
  },
  data: function () {
    return {

      title: 'Buscar Documento',
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

      texto: null,
      fileName: '',
      ingresos: [],
      presIngrsoMasivo: [],
      anofiscal: this.$fiscalYearId,
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
        anioFiscalId: this.$fiscalYearId,
        ayuntamientoId: this.$ayuntamientoId,
        ctgClasificadorId: null,
        instOtorga: 0,
        ctaControl: 0,
        detalle: '',
        ctgFuenteId: 0,
        ctgFuenteEspecificaId: 0,
        ctgOrganismoFinanciadorId: 0,
        anioAnt: 0,
        alaFecha: 0,
        presForm: 0,
        variacion: 0,
        ingresos: 0,
        variacionResumen: 0,
      },
      validatedCustom01: null,
      showPartidaPresupuestodeIngresoDialog: false,
      footerItem: [
        {
          label: 'Total presupuesto',
          _props: {
            
            colspan: 6,
            style: 'font-weight:bold',
          },
        },
        {
          label: '0.00',
          _props: {
            
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
        {
          label: '0.00',
          _props: {
            
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
        {
          label: '0.00',
          _props: {
            
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
      ],
      columns: [
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '10%' },
        },
        {
          key: 'detalle',
          label: 'Descripción',
          sorter: false,
          _style: { width: '35%' },
        },
        {
          key: 'ctgFuenteId',
          label: 'F/Finan',
          _style: { width: '5%' },
        },
        {
          key: 'ctgFuenteEspecificaId',
          label: 'F/Espec',
          _style: { width: '5%' },
        },
        {
          key: 'ctgOrganismoFinanciadorId',
          label: 'Org/Finan',
          _style: { width: '5%' },
        },
        {
          key: 'instOtorga',
          label: 'Inst/Otorgante',
          filter: false,
          _style: { width: '5%' },
        },
        {
          key: 'anioAnt',
          label: 'Año Anterior',
          filter: false,
          _style: { width: '10%' },
        },
        {
          key: 'alaFecha',
          label: 'A la Fecha',
          filter: false,
          _style: { width: '10%' },
        },
        {
          key: 'presForm',
          label: 'Pre/Formulado',

          filter: false,
          _style: { width: '10%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '5%' },
          filter: false,
          sorter: false,
        },
      ],
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
      formatPrice
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


    selectClasificador(clasificador) {
      if (clasificador) {
        this.postIngreso.ctgClasificadorId = clasificador.clasifica;
        this.postIngreso.ctaControl = clasificador.cControl;
        this.postIngreso.detalle = clasificador.nombre;
        this.postIngreso.ctgFuenteId = clasificador.ctgFuenteId;
        this.postIngreso.ctgFuenteEspecificaId = clasificador.ctgFuenteEspecificaId;
        this.postIngreso.ctgOrganismoFinanciadorId = clasificador.ctgOrganismoFinanciadorId;
        this.validateInputctgFuente();
        this.validateInputctgFuenteEspecificaId();
        this.validateInputctgOrganismoFinanciadorId();
      }
      this.findClasificadorModal = false;
    },


    focusInput() {
      this.$refs.name.focus()
    },

    unaVez() {
      this.focusInput()
    },

    openModal() {
      this.showPartidaPresupuestodeIngresoDialog = true

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
          this.texto = wb;
          console.log(data);
          data.map((item) => {
            this.presIngrsoMasivo.push({
              anioFiscalId:  this.authInfo.currentFiscalYearId,
              ayuntamientoId: this.authInfo.user.ayuntamiento.id,
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
    getTotales() {
      
      console.log(this.AuthStore.user)

      Api.getTotalIngresos(
        this.authInfo.currentFiscalYearId,
        this.authInfo.user.ayuntamiento.id,
      ).then((response) => {
        this.footerItem[1].label = this.formatPrice(response.data.data.anioAnt)
        this.footerItem[2].label = this.formatPrice(response.data.data.alaFecha)
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
    clearModal() {
      this.postIngreso = {
        anioFiscalId: this.authInfo.user.ayuntamiento.id,
        ayuntamientoId: this.authInfo.currentFiscalYearId,
        ctgClasificadorId: null,
        instOtorga: 0,
        ctaControl: 0,
        detalle: '',
        anioAnt: 0,
        ctgFuenteId: 0,
        ctgFuenteEspecificaId: 0,
        ctgOrganismoFinanciadorId: 0,
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
        this.postIngreso.ctaControl = this.postIngreso.control;
        Api.editPresIngreso(this.id, this.postIngreso).then((response) => {
          this.show({
            content: 'Registro actualizado correctamente',
            closable: true,
          })

          this.postIngreso = {
            anioFiscalId:  this.authInfo.currentFiscalYearId,
            ayuntamientoId: this.authInfo.user.ayuntamiento.id,
            ctgClasificadorId: null,
            instOtorga: 0,
            ctaControl: 0,
            detalle: '',
            anioAnt: 0,
            ctgFuenteId: 0,
            ctgFuenteEspecificaId: 0,
            ctgOrganismoFinanciadorId: 0,
            alaFecha: 0,

            presForm: 0,
            variacion: 0,
            ingresos: 0,
            variacionResumen: 0,
          }

          setTimeout(() => {
            this.getAllIngreso()
            .then(() => this.getTotales());
          }, 3000);

          this.id = null
        })
        .catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          });
      } else {
        this.postIngreso.anioAnt = parseFloat(this.postIngreso.anioAnt);
        this.postIngreso.alaFecha = parseFloat(this.postIngreso.alaFecha);
        this.postIngreso.presForm = parseFloat(this.postIngreso.presForm);
        this.postIngreso.ctaControl = parseFloat(this.postIngreso.ctaControl);
        this.postIngreso.ctgFuenteEspecificaId = parseFloat(this.postIngreso.ctgFuenteEspecificaId);
        this.postIngreso.ctgFuenteId = parseFloat(this.postIngreso.ctgFuenteId);
        this.postIngreso.ctgOrganismoFinanciadorId = parseFloat(this.postIngreso.ctgOrganismoFinanciadorId);
        Api.postFormulacionIngreso(this.postIngreso)
          .then(() => {
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
            this.postIngreso = {
              anioFiscalId:  this.authInfo.currentFiscalYearId,
              ayuntamientoId: this.authInfo.user.ayuntamiento.id,
              ctgClasificadorId: null,
              instOtorga: 0,
              ctaControl: 0,
              detalle: '',
              anioAnt: 0,
              ctgFuenteId: 0,
              ctgFuenteEspecificaId: 0,
              ctgOrganismoFinanciadorId: 0,
              alaFecha: 0,

              presForm: 0,
              variacion: 0,
              ingresos: 0,
              variacionResumen: 0,
            };
            
            this.validatedCustom01 = false;
            setTimeout(() => {
              this.getAllIngreso()
              .then(() => this.getTotales());
            }, 3000);

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
    IngresoReport() {
      window
        .open(
          `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Ingresos_Formulacion&rs:Command=Render&CAPITULO_AYTO=${this.authInfo.user.ayuntamiento.codigo}&ANO=2022`,
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
      this.showPartidaPresupuestodeIngresoDialog = true

      Api.getPresIngresoById(item).then((response) => {
        this.id = item.id
        this.postIngreso = response.data.data;
        this.postIngreso.ctaControl = this.postIngreso.control;
      })
    },
    getAllIngreso() {
      return Api.getAllFormulacionIngreso(this.authInfo.currentFiscalYearId, this.authInfo.user.ayuntamiento.id).then((response) => {
        this.ingresos = response.data.data
      })
    },
    deleteItem(item) {
      this.$swal({
        title: 'Estás seguro que quieres eliminar este registro?',
        text: 'No podrás revertirlo',
        icon: 'Confirmación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          Api.deleteIngreso(item.id).then(() => {
            this.show({
              content: 'Eliminado correctamente',
              closable: true,
            })
            
            setTimeout(() => {
              this.getAllIngreso()
              .then(() => this.getTotales());
            }, 3000);
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

