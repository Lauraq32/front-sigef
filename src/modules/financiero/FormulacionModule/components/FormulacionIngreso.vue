<template>
  <h3 class="text-center">Formulación ingreso</h3>
  <hr />
  <div class="">
    <div class="d-inline p-2">
      <CButton color="info" @click="
        () => {
          lgDemo = true
          clearModal()
          edit = false
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
  }" :tableHeadProps="{}" :activePage="1" footer header key="ingreso.id" :items="ingresos" :columns="columns"
    columnFilter tableFilter cleaner itemsPerPageSelect :itemsPerPage="5"
    :items-per-page-options="[5, 10, 20, 50, 100, 150]" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #show_details="{ item }">
      <td class="py-1">
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="toggleDetails(item)">
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
        </CButton>
      </td>
      <td class="py-1">
        <CButton class="mt-1" color="danger" variant="outline" square size="sm" @click="deleteItem(item)">
          {{ Boolean(item._toggled) ? 'Hide' : 'Eliminar' }}
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
  <CModal size="lg" :visible="lgDemo" @close="
    () => {
      lgDemo = false
    }
  ">
    <CModalHeader>
      <CModalTitle>Formulación Ingreso</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm class="row g-3 needs-validation" novalidate :validated="validatedCustom01"
          @submit="handleSubmitCustom01">
          <CCol :md="4">
            <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
            <CFormInput :disabled="edit" v-model="postIngreso.clasificadorId" type="number" id="validationCustom01"
              required on:keyup.native.enter="getClasificador" />
            <button :hidden="edit" class="btn btn-primary btn-block mt-1" v-on:click="getClasificador">
              Buscar
            </button>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom02">Cta. Control</CFormLabel>
            <CFormInput disabled v-model="postIngreso.control" id="validationCustom02" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustomUsername">Detalle</CFormLabel>
            <CInputGroup class="has-validation">
              <CFormInput disabled v-model="postIngreso.detalle" id="validationCustomUsername" value=""
                aria-describedby="inputGroupPrepend" required />
              <CFormFeedback valid> Exito! </CFormFeedback>
              <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
            </CInputGroup>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="validationCustom03">Fuente Financiamiento</CFormLabel>
            <CFormInput :disabled="ctgFuenteId" v-model="postIngreso.ctgFuenteId" id="validationCustom03" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Fuente Especifica</CFormLabel>
            <CFormInput :disabled="ctgFuenteEspecificaId" v-model="postIngreso.ctgFuenteEspecificaId"
              id="validationCustom04" required>
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Organismo Financiador</CFormLabel>
            <CFormInput :disabled="ctgOrganismoFinanciadorId" v-model="postIngreso.ctgOrganismoFinanciadorId"
              id="validationCustom05" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <hr />
          <CCol :md="4">
            <CFormLabel>Año Anterior</CFormLabel>
            <CFormInput v-model="postIngreso.anioAnt" type="number" step="any" ref="anoAnteriorRef">
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel>A la Fecha</CFormLabel>
            <CFormInput v-model="postIngreso.alaFecha" type="number" step="any"></CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel>Presupuesto Formulado</CFormLabel>
            <CFormInput v-model="postIngreso.presForm" type="number" step="any"></CFormInput>
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
            <button :disabled="formuladoValue" v-on:click="submitForm" type="button" class="btn btn-primary">
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
import Api from '../services/FormulacionServices'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
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
        clasificadorId: null,
        instOtorga: 0,
        control: '',
        detalle: null,
        ctgFuenteId: null,
        ctgFuenteEspecificaId: null,
        ctgOrganismoFinanciadorId: null,
        anioAnt: null,
        alaFecha: null,
        //EST_ACTUAL: 0,
        presForm: null,
        variacion: 0,
        ingresos: 0,
        variacionResumen: 0,
      },
      validatedCustom01: null,
      lgDemo: false,
      columns: [
        {
          key: 'clasificadorId',
          label: 'Clasificador',
          _style: { width: '15%' },
        },
        {
          key: 'detalle',
          label: 'Descripción',
          filter: false,
          sorter: false,
          _style: { width: '55%' },
        },
        {
          key: 'ctgFuenteId',
          label: 'Fuentes de financiamiento',
          _style: { width: '8%' },
        },
        {
          key: 'ctgFuenteEspecificaId',
          label: 'Fuente especifica',
          _style: { width: '8%' },
        },
        {
          key: 'ctgOrganismoFinanciadorId',
          label: 'Organismo de financiamiento',
          _style: { width: '8%' },
        },
        {
          key: 'instOtorga',
          label: 'Institución otorgante',
          _style: { width: '8%' },
        },
        { key: 'anioAnt', label: 'Año anterior', _style: { width: '8%' } },
        { key: 'alaFecha', label: 'A la Fecha', _style: { width: '8%' } },
        // {
        //   key: 'esT_ACTUAL',
        //   label: 'Estimado Actual',
        //   _style: { width: '8%' },
        // },
        {
          key: 'presForm',
          label: 'Presupuesto Formulado',
          _style: { width: '8%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],
      details: [],
    }
  },
  methods: {
    getTotales() {
      Api.getTotalIngresos(localStorage.getItem('id_Ayuntamiento'),
        localStorage.getItem('ano')).then((response) => {
          this.formulado.alafecha = response.data.data.alaFecha
          this.formulado.anO_ANT = response.data.data.anioAnt
          this.formulado.preS_FORM = response.data.data.presForm
        }
        )


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
        clasificadorId: null,
        instOtorga: 0,
        control: '',
        detalle: null,
        anioAnt: null,
        ctgFuenteId: null,
        ctgFuenteEspecificaId: null,
        ctgOrganismoFinanciadorId: null,
        alaFecha: null,
        //EST_ACTUAL: 0,
        presForm: null,
        variacion: 0,
        ingresos: 0,
        variacionResumen: 0,
      }
    },

    submitForm() {
      if (this.id) {
        Api.editPresIngreso(this.id, this.postIngreso).then((response) => {
          console.log(response.data)
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
            clasificadorId: null,
            instOtorga: 0,
            control: '',
            detalle: null,
            anioAnt: null,
            ctgFuenteId: null,
            ctgFuenteEspecificaId: null,
            ctgOrganismoFinanciadorId: null,
            alaFecha: null,
            //EST_ACTUAL: 0,
            presForm: null,
            variacion: 0,
            ingresos: 0,
            variacionResumen: 0,

          }
          // this.getListarIngresos(
          //   localStorage.getItem('id_Ayuntamiento'),
          //   localStorage.getItem('ano'),
          // ),

          setTimeout( this.getListarIngresos, 3000);
            console.log(this.ingresos)
          //this.getTotal();
          this.getTotales()
          this.id = null;
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
          clasificadorId: null,
          instOtorga: 0,
          control: '',
          detalle: null,
          anioAnt: null,
          ctgFuenteId: null,
          ctgFuenteEspecificaId: null,
          ctgOrganismoFinanciadorId: null,
          alaFecha: null,
          //EST_ACTUAL: 0,
          presForm: null,
          variacion: 0,
          ingresos: 0,
          variacionResumen: 0,
        }
        this.validatedCustom01 = false
        setTimeout( this.getListarIngresos, 500);
          console.log(this.ingresos)
        //this.getTotal();
        this.getTotales()
      }
    },
    getClasificador() {
      this.$store.dispatch(
        'Formulacion/getClasificador',
        this.postIngreso.CLASIFICA,
      )

      this.$store.dispatch(
        'Formulacion/getClasificador',
        this.postIngreso.CLASIFICA,
      )

      Api.getClasificador(this.postIngreso.clasificadorId).then((response) => {
        console.log(response.data.data)
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

      //this.focusAno();
    },
    // getTotal() {
    //   axios
    //   Api.getTotalIngresos(localStorage.getItem('id_Ayuntamiento'), localStorage.getItem('ano'))
    //     .then(response => {
    //       this.formulado.alafecha = response.data.alafecha
    //       this.formulado.anO_ANT = response.data.anO_ANT
    //       this.formulado.preS_FORM = response.data.preS_FORM
    //     })
    // },
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
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fseguridad%2fRep_Ingresos_Formulacion&rs:Command=Render&ANO=1&CAPITULO_AYTO=${localStorage.getItem(
            'id_Ayuntamiento',
          )}&ano=${localStorage.getItem('ano')}`,
          '_blank',
        )
        .focus()
    },
    toggleDetails(item) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      console.log(item)
      if (item.ingresos !== 0 || item.variacion !== 0) {
        this.formuladoValue = true
      } else {
        this.formuladoValue = false
      }
      this.edit = true
      this.lgDemo = true
      console.log(item.id)
      Api.getPresIngresoById(item).then((response) => {
        console.log(response)
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
        this.getListarIngresos(),
          console.log(this.ingresos)
        //this.getTotal();
        this.getTotales()
      })
    },

    ...mapActions('Formulacion', ['getListarIngresos']),
  },
  computed: {
    ...mapState('Formulacion', ['ingresos']),
  },
  // mounted(){
  //     this.$store.dispatch('Formulacion/getListarIngresos');
  //   },
  created() {
    this.getListarIngresos(),
      console.log(this.ingresos)
    //this.getTotal();
    this.getTotales()
  },
}
</script>
