<template>
  <h3 class="text-center">Formulación gasto</h3>
  <hr />
  <div>
    <div class="d-inline p-2">
      <CButton color="info" @click="
        () => {
          lgDemo = true
        }
      ">Agregar</CButton>
    </div>
    <div class="d-inline p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReport">Imprimir</CButton>
    </div>
  </div>
  <hr />
  <CSmartTable clickableRows :tableProps="{
    striped: false,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" footer header :items="registroPersonal"
    :columns="columns" columnFilter tableFilter cleaner itemsPerPageSelect :itemsPerPage="5" columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }" pagination>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <!-- Borre el , index  dentro del template de abajo -->
    <template #show_details="{ item }">
      <td class="py-2">
        <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails()">
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
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
  <div class="font-weight-normal" style="font-weight: 100 !important; margin-top: -3%; float: left">
    <span style="font-weight: bold"><u>TOTAL PRESUPUESTADO:</u></span> Año
    anterior
    <span style="font-weight: 500 !important">{{
        formatPrice(formulado.anO_ANT)
    }}</span>
    A la fecha:
    <span style="font-weight: 500 !important">{{
        formatPrice(formulado.alafecha)
    }}</span>
    Presupuesto formulado:
    <span style="font-weight: 500 !important">{{
        formatPrice(formulado.preS_FORM)
    }}</span>
  </div>
  <CModal size="xl" :visible="lgDemo" @close="
    () => {
      lgDemo = false
    }
  ">
    <CModalHeader>
      <CModalTitle class="text-center" style="margin-left: 35%">Formulación Gastos</CModalTitle>
    </CModalHeader>
    <h5 class="p-3">Captura Estructuras Presupuesto de Gastos</h5>
    <hr />
    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
          @submit="handleSubmitCustom01">
          <CCol :md="2">
            <CFormLabel for="validationCustom01">PNAP</CFormLabel>
            <CFormInput id="validationCustom01" />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom02">Programa</CFormLabel>
            <CFormInput id="validationCustom02" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustomUsername">Proyecto</CFormLabel>
            <CInputGroup class="has-validation">
              <CFormInput id="validationCustomUsername" value="" aria-describedby="inputGroupPrepend" required />
              <CFormFeedback valid> Éxito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CInputGroup>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom03">Actividad/Obra</CFormLabel>
            <CFormInput id="validationCustom03" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Est. Programática control</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Denominación</CFormLabel>
            <CFormInput id="validationCustom05" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Unidad responsable</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Tipo</CFormLabel>
            <CFormSelect id="validationCustom04">
              <option>DETALLE</option>
              <option>CABECERA</option>
            </CFormSelect>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">No. fondo transferido</CFormLabel>
            <CFormInput id="validationCustom04"></CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
              Guardar
            </button>
          </div>
        </CForm>
        <CSmartTable clickableRows :tableProps="{
          striped: false,
          hover: true,
        }" :tableHeadProps="{}" :activePage="1" footer header
          :items="this.$store.state.Formulacion.formulacionGasto2" :columns="columns2" columnFilter tableFilter cleaner
          itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
          pagination>
          <template #status="{ item }">
            <td>
              <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
            </td>
          </template>
          <!-- Borre el index de aquí -->
          <template #show_details="{ item }">
            <td class="py-2">
              <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails1()">
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
                <CButton size="sm" color="info" class="">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" class="ml-1">
                  Delete
                </CButton>
              </CCardBody>
            </CCollapse>
          </template>
        </CSmartTable>
        <div class="font-weight-normal" style="font-weight: 100 !important; margin-top: -3%; float: left">
          <span style="font-weight: bold"><u>TOTAL PRESUPUESTADO:</u></span> Año
          anterior
          <span style="font-weight: 500 !important">{{
              formatPrice(formulado.anO_ANT)
          }}</span>
          A la fecha:
          <span style="font-weight: 500 !important">{{
              formatPrice(formulado.alafecha)
          }}</span>
          Presupuesto formulado:
          <span style="font-weight: 500 !important">{{
              formatPrice(formulado.preS_FORM)
          }}</span>
        </div>
      </CCardBody>
    </CModalBody>
  </CModal>
  <CModal size="xl" :visible="lgDemo1" @close="
    () => {
      lgDemo1 = false
    }
  ">
    <div class="row">
      <div class="col-12">
        <CModalHeader>
          <CModalTitle>Formulario de Clasificadores</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
              @submit="handleSubmitCustom01">
              <CCol :md="2">
                <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
                <CFormInput id="validationCustom01" />

                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="2">
                <CFormLabel for="validationCustom02">Cta. Control</CFormLabel>
                <CFormInput disabled id="validationCustom02" required />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="6">
                <CFormLabel for="validationCustom02">Detalle</CFormLabel>
                <CFormInput disabled id="validationCustom02" required />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="2">
                <button class="btn btn-primary">Buscar</button>
              </CCol>

              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">30/9995/102</CButton>
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">30/9996/102</CButton>
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">30/9998/102</CButton>
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">30/9999/102</CButton>
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">10/0100/104</CButton>
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">40/9992/102</CButton>
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">40/9992/103</CButton>
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">40/9996/120</CButton>
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">40/9992/299</CButton>
              </CCol>
              <CCol :md="2">
                <CButton style="font-weight: bold" color="info">50/2006/001</CButton>
              </CCol>
              <CCol :md="2"> </CCol>
              <CCol :md="2"> </CCol>

              <CCol :md="3">
                <CFormLabel for="validationCustom03">Fuente Financiamiento</CFormLabel>
                <CFormInput disabled id="validationCustom03" required />
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="3">
                <CFormLabel for="validationCustom04">Fuente Especifica</CFormLabel>
                <CFormInput disabled id="validationCustom04"> </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="3">
                <CFormLabel for="validationCustom05">Organismo Financiador</CFormLabel>
                <CFormInput disabled id="validationCustom05" required />
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <CCol :md="3">
                <CFormLabel for="validationCustom04">Funcion:</CFormLabel>
                <CFormInput disabled id="validationCustom04"> </CFormInput>
                <CFormFeedback valid> Exito! </CFormFeedback>
                <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
              </CCol>
              <hr />
              <h2>Presupuesto</h2>

              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <CFormLabel for="validationCustom04">Cta. de Personal</CFormLabel>
                      <CFormInput id="validationCustom04"> </CFormInput>
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-2">
                      <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                      <CFormInput id="validationCustom04"> </CFormInput>
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <CFormLabel for="validationCustom04">Cta. de Servicios</CFormLabel>
                      <CFormInput id="validationCustom04"> </CFormInput>
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-2">
                      <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                      <CFormInput id="validationCustom04"> </CFormInput>
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <CFormLabel for="validationCustom04">Cta. de Inversion</CFormLabel>
                      <CFormInput id="validationCustom04"> </CFormInput>
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-2">
                      <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                      <CFormInput id="validationCustom04"> </CFormInput>
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </div>
                  </div>
                </div>

                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <CFormLabel for="validationCustom04">Cta. de E/G y Salud</CFormLabel>
                      <CFormInput id="validationCustom04"> </CFormInput>
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </div>
                    <div class="col-1"></div>
                    <div class="col-2">
                      <CFormLabel for="validationCustom04">Tipo</CFormLabel>
                      <CFormInput id="validationCustom04"> </CFormInput>
                      <CFormFeedback valid> Exito! </CFormFeedback>
                      <CFormFeedback invalid>
                        Favor agregar el campo
                      </CFormFeedback>
                    </div>
                  </div>
                </div>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
                  Guardar
                </button>
              </div>
            </CForm>
          </CCardBody>
        </CModalBody>
        <div class="font-weight-normal" style="font-weight: 100 !important; margin-top: -3%; float: left">
          <span style="font-weight: bold"><u>TOTAL PRESUPUESTO:</u></span> Año
          anterior
          <span style="font-weight: 500 !important">{{
              formatPrice(formulado.anO_ANT)
          }}</span>
          A la fecha:
          <span style="font-weight: 500 !important">{{
              formatPrice(formulado.alafecha)
          }}</span>
          Presupuesto formulado:
          <span style="font-weight: 500 !important">{{
              formatPrice(formulado.preS_FORM)
          }}</span>
        </div>
      </div>
    </div>
  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/FormulacionServices'
import axios from 'axios'
import { mapActions, mapState } from 'pinia'
import {usePrepGastoStore} from '../store/Formulacion/prepGasto'
import { mount } from '@vue/test-utils'
import { mapStores } from 'pinia'
import { mapGetters } from 'vuex'

export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {

      formulado: {
        alafecha: 0,
        anO_ANT: 0,
        preS_FORM: 0,
      },
      validatedCustom01: null,
      lgDemo: false,
      lgDemo1: false,
      lgDemo2: false,
      columns: [
        { key: 'pnap', label: 'Pnap', _style: { width: '40%' } },
        { key: 'programa', label: 'Programa', _style: { width: '40%' } },
        { key: 'proyecto', label: 'Proyecto', _style: { width: '40%' } },
        { key: 'nombre', label: 'Obra', _style: { width: '40%' } },
        // {
        //   key: 'denominacion',
        //   label: 'Denominacion',
        //   _style: { width: '40%' },
        // },
        { key: 'actControl', label: 'Control', _style: { width: '40%' } },
        { key: 'tipo', label: 'tipo', _style: { width: '40%' } },
        {
          key: 'unidadResp',
          label: 'Unidad responsable',
          _style: { width: '40%' },
        },
        { key: 'totalPresupuesto', label: 'presupuesto', _style: { width: '40%' } },
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
      items: [
        {
          name: 'John Doe',
          registered: '2018/01/01',
          role: 'Guest',
          status: 'Pending',
        },
      ],
      columns2: [
        {
          key: 'Clasificador',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        {
          key: 'Denominacion',
          label: 'Denominacion',
          _style: { width: '40%' },
        },
        { key: 'Original', label: 'Original', _style: { width: '40%' } },
        {
          key: 'Gastos Personal',
          label: 'Gastos Personal',
          _style: { width: '40%' },
        },
        { key: 'Servicios', label: 'Servicios', _style: { width: '40%' } },
        { key: 'Inversion', label: 'Inversion', _style: { width: '40%' } },
        {
          key: 'Educ/Genero/Salud',
          label: 'Educ/Genero/Salud',
          _style: { width: '40%' },
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
      items2: [
        {
          name: 'John Doe',
          registered: '2018/01/01',
          role: 'Guest',
          status: 'Pending',
        },
      ],
    }
  },
  methods: {
    ...mapActions(usePrepGastoStore, ['getListarGastos']),
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },
    getTotal() {
      axios
      Api.getTotalIngresos(
        localStorage.getItem('id_Ayuntamiento'),
        localStorage.getItem('ano'),
      ).then((response) => {
        this.formulado.alafecha = response.data.alafecha
        this.formulado.anO_ANT = response.data.anO_ANT
        this.formulado.preS_FORM = response.data.preS_FORM
      })
    },
    IngresoReport() {
      window
        .open(
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fseguridad%2fReport1&rs:Command=Render&id=${localStorage.getItem(
            'id_ayuntamiento',
          )}&ano=${localStorage.getItem('ano')}`,
          '_blank',
        )
        .focus()
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
    toggleDetails() {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      this.lgDemo = true
    },
    toggleDetails1() {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      this.lgDemo1 = true
    },
  },

  computed: {
    ...mapStores(usePrepGastoStore),
  //  ...mapGetters(usePrepGastoStore,['getAllGasto']),
   ...mapState(usePrepGastoStore, ['registroPersonal']),
  },

  mounted(){
  this.getListarGastos()
    
    }, 
}

</script>
<!-- <script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue-pro'
import Api from '../services/FormulacionServices'
import axios from 'axios'
import { usePrepGastoStore } from '../store/Formulacion/prepGasto'
import { onMounted } from 'vue'



export default {
  components:{
    CSmartTable,
    CModal
  },

  setup() {
    const store = usePrepGastoStore()
    const { getListarGastos} = store

    //Variables
    const formulado=  {
        alafecha: 0,
        anO_ANT: 0,
        preS_FORM: 0,
      }
      const validatedCustom01= null
      const lgDemo= false
      const lgDemo1= false
      const lgDemo2= false
      const columns= [
        { key: 'pnap', label: 'Pnap', _style: { width: '40%' } },
        { key: 'programa', label: 'Programa', _style: { width: '40%' } },
        { key: 'proyecto', label: 'Proyecto', _style: { width: '40%' } },
        { key: 'obra', label: 'Obra', _style: { width: '40%' } },
        {
          key: 'denominacion',
          label: 'Denominacion',
          _style: { width: '40%' },
        },
        { key: 'control', label: 'Control', _style: { width: '40%' } },
        { key: 'tipo', label: 'tipo', _style: { width: '40%' } },
        {
          key: 'unidadResponsable',
          label: 'Unidad responsable',
          _style: { width: '40%' },
        },
        { key: 'presupuesto', label: 'presupuesto', _style: { width: '40%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ]
      const details = []





     const  formatPrice = (value) => {
      let val = (value / 1).toFixed(2).replace('.', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const handleSubmitCustom01 = (event) => {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    }
    const getTotal = () => {
      axios
      Api.getTotalIngresos(
        localStorage.getItem('id_Ayuntamiento'),
        localStorage.getItem('ano'),
      ).then((response) => {
        this.formulado.alafecha = response.data.alafecha
        this.formulado.anO_ANT = response.data.anO_ANT
        this.formulado.preS_FORM = response.data.preS_FORM
      })
    }
    const consIngresoReport = () => {
      window
        .open(
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fseguridad%2fReport1&rs:Command=Render&id=${localStorage.getItem(
            'id_ayuntamiento',
          )}&ano=${localStorage.getItem('ano')}`,
          '_blank',
        )
        .focus()
    }
    const getBadge = (status) => {
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
    }
   const toggleDetails = () => {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      this.lgDemo = true
    }
    const toggleDetails1 = () => {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      this.lgDemo1 = true
    }

    onMounted(() => {
      console.log('holla')
    })



    return {
      CSmartTable,
      formulado,
      validatedCustom01,
      lgDemo,
      lgDemo1,
      lgDemo2,
      columns,
      details,
      toggleDetails1,
      toggleDetails,
      getBadge,
      consIngresoReport,
      getTotal,
      handleSubmitCustom01,
      formatPrice,
      getListarGastos
    }
  }



}


</script> -->