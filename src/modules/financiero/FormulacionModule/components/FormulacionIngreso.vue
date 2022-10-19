<template>
  <h3 class="text-center">Formulación ingreso</h3>
  <hr />
  <div class="">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            lgDemo = true
          }
        "
        >Agregar</CButton
      >
    </div>

    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport"
        >Imprimir</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable
    clickableRows
    :tableProps="{
      striped: false,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer
    header
    key="ingreso.id"
    :items="ingresos"
    :columns="columns"
    columnFilter
    tableFilter
    cleaner
    itemsPerPageSelect
    :itemsPerPage="5"
    :items-per-page-options=" [5, 10, 20, 50,100,150]"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails(item, index)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Show' }}
        </CButton>
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
    <CModalHeader>
      <CModalTitle>Formulación Ingreso</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="4">
            <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
            <CFormInput
              v-model="postIngreso.CLASIFICA"
              id="validationCustom01"
              required
              on:keyup.native.enter="getClasificador"
            />
            <button
              class="btn btn-primary btn-block mt-1"
              v-on:click="getClasificador"
              
            >
              Buscar
            </button>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom02">Cta. Control</CFormLabel>
            <CFormInput
              disabled
              v-model="postIngreso.CONTROL"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustomUsername">Detalle</CFormLabel>
            <CInputGroup class="has-validation">
              <CFormInput
                disabled
                v-model="postIngreso.DETALLE"
                id="validationCustomUsername"
                value=""
                aria-describedby="inputGroupPrepend"
                required
              />
              <CFormFeedback valid> Exito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CInputGroup>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="validationCustom03"
              >Fuente Financiamiento</CFormLabel
            >
            <CFormInput
              disabled
              v-model="postIngreso.FUENTE"
              id="validationCustom03"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Fuente Especifica</CFormLabel>
            <CFormInput
              disabled
              v-model="postIngreso.F_ESPECIFIC"
              id="validationCustom04"
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
              v-model="postIngreso.ORGA_FIN"
              id="validationCustom05"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <hr />
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Año Anterior</CFormLabel>
            <CFormInput
              v-model="postIngreso.ANO_ANT"
              id="validationCustom04"
              type="number"
              ref="anoAnteriorRef"
        
             
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">A la Fecha</CFormLabel>
            <CFormInput
              v-model="postIngreso.ALAFECHA"
              id="validationCustom04"
              type="number"
            ></CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04"
              >Presupuesto Formulado</CFormLabel
            >
            <CFormInput
              v-model="postIngreso.PRES_FORM"
              id="validationCustom04"
              type="number"
            ></CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <!-- <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button> -->
            <button v-on:click="submitForm" type="button" class="btn btn-primary">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { ref } from 'vue'
import { mapActions, mapGetters, mapState } from 'vuex'
import Api from '../services/FormulacionServices'
import { PostIngreso } from '../store/Formulacion/actions'

export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      postIngreso: {
        Ano: parseInt(localStorage.getItem('ano')),
        id_ayuntamiento: parseInt(localStorage.getItem('id_Ayuntamiento')),
        CLASIFICA: null,
        INST_OTORGA: 0,
        CONTROL: '',
        DETALLE: null,
        FUENTE: null,
        F_ESPECIFIC: null,
        ORGA_FIN: null,
        ANO_ANT: null,
        ALAFECHA: null,
        EST_ACTUAL: 0,
        PRES_FORM: null,
        VARIACION: 0,
        INGRESOS: 0,
        VARIACION_RESUMEN: 0,
      },
      validatedCustom01: null,
      lgDemo: false,
      columns: [
        { key: 'clasifica', label: 'Clasificador', _style: { width: '15%' } },
        {
          key: 'detalle',
          label: 'Descripción',
          filter: false,
          sorter: false,
          _style: { width: '50%' },
        },
        {
          key: 'fuente',
          label: 'Fuentes de financiamiento',
          _style: { width: '8%' },
        },
        {
          key: 'f_ESPECIFIC',
          label: 'Fuente especifica',
          _style: { width: '8%' },
        },
        {
          key: 'orgA_FIN',
          label: 'Organismo de financiamiento',
          _style: { width: '8%' },
        },
        {
          key: 'insT_OTORGA',
          label: 'Institución otorgante',
          _style: { width: '8%' },
        },
        { key: 'anO_ANT', label: 'Año anterior', _style: { width: '8%' } },
        { key: 'alafecha', label: 'A la Fecha', _style: { width: '8%' } },
        {
          key: 'esT_ACTUAL',
          label: 'Estimado Actual',
          _style: { width: '8%' },
        },
        {
          key: 'preS_FORM',
          label: 'Presupuesto Formulado',
          _style: { width: '8%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
      details: [],
    }
  },
  methods: {
    submitForm() {
      this.postIngreso.ANO_ANT = parseInt(this.postIngreso.ANO_ANT)
      this.postIngreso.ALAFECHA = parseInt(this.postIngreso.ALAFECHA)
      this.postIngreso.PRES_FORM = parseInt(this.postIngreso.PRES_FORM)
      this.$store.dispatch('Formulacion/PostIngreso', this.postIngreso);
      this.lgDemo=true
      this.$store.dispatch('Formulacion/getListarIngresos');
      this.postIngreso = {
        Ano: parseInt(localStorage.getItem('ano')),
        id_ayuntamiento: parseInt(localStorage.getItem('id_Ayuntamiento')),
        CLASIFICA: null,
        INST_OTORGA: 0,
        CONTROL: '',
        DETALLE: null,
        FUENTE: null,
        F_ESPECIFIC: null,
        ORGA_FIN: null,
        ANO_ANT: null,
        ALAFECHA: null,
        EST_ACTUAL: 0,
        PRES_FORM: null,
        VARIACION: 0,
        INGRESOS: 0,
        VARIACION_RESUMEN: 0,
      }
      this.validatedCustom01 = false
    },
    getClasificador() {
      
      this.$store.dispatch('Formulacion/getClasificador',this.postIngreso.CLASIFICA)


      Api.getClasificador(this.postIngreso.CLASIFICA).then(response => {
        console.log(response.data)
        this.postIngreso.CONTROL = response.data.ccontrol
      this.postIngreso.DETALLE = response.data.nombre
      this.postIngreso.FUENTE = response.data.iDENTIFICADORdUENTE
      this.postIngreso.F_ESPECIFIC = response.data.iDENTIFICADORfUENTEeSPECIFICA
      this.postIngreso.ORGA_FIN = response.data.identificadorornfin
    })


     
      //this.focusAno();
      

    },
    focusAno(){
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
      window.open(`http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fseguridad%2fReport1&rs:Command=Render&id=${localStorage.getItem('id_Ayuntamiento')}&ano=${localStorage.getItem('ano')}`, '_blank').focus();
    },
    toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },

    ...mapActions('Formulacion', ['getListarIngresos'])
  },
  computed:{
    ...mapState( 'Formulacion', ['ingresos']),
   
  },
  // mounted(){
  //     this.$store.dispatch('Formulacion/getListarIngresos');
  //   },
    created(){
      this.getListarIngresos(localStorage.getItem('id_Ayuntamiento'),localStorage.getItem('ano')),
      console.log(this.ingresos);
    }
}
</script>
