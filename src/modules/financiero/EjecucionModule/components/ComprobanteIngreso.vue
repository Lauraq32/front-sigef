<template>
  <h3 class="text-center">Comprobantes de ingresos</h3>
  <hr />
  <div>
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
      <div class="d-inline p-2">
        <CButton color="info">Imprimir Comprobante</CButton>
      </div>
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
    :items="ingresosList"
    :columns="columns"
    columnFilter
    tableFilter
    cleaner
    itemsPerPageSelect
    :itemsPerPage="5"
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
          @click="toggleDetails1(item.transaccionId)"
        >
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
  <CModal
    size="xl"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Comprobantes de ingresos</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <CCol :md="2">
            <CFormLabel for="validationCustom01">#Comp.</CFormLabel>
            <CFormInput id="validationCustom01" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom02">Fecha</CFormLabel>
            <CFormInput
              v-model="ingresoPost.fecha"
              type="date"
              id="validationCustom02"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Etapa</CFormLabel>
            <CFormSelect v-model="ingresoPost.etapa" id="validationCustom05">
              <option>INGRESOS</option>
              <option>VARIACION</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom04">Recibo</CFormLabel>
            <CFormInput
              v-model="ingresoPost.compIngresosId"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom04">Contribuyente</CFormLabel>
            <CFormInput
              v-model="ingresoPost.contribuyenteId"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <hr />
          <CCol :md="11">
            <CFormLabel for="validationCustom04">Detalle</CFormLabel>
            <CFormTextarea
              v-model="ingresoPost.detalle"
              id="validationCustom04"
            ></CFormTextarea>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div style="padding: 6px">
            <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
              Guardar
            </button>
          </div>
          <hr />
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Anunc. y Carteles</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Certific. vida y cost.</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Arrend. Terrenos</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Certific. animales</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Transferencia 60%</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
              >Transferencia 40%</CButton
            >
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <CCol :md="2">
            <CButton
              style="font-weight: bold"
              color="Light"
              @click="IngresoReport"
            ></CButton>
          </CCol>
          <hr />
          <CCol :md="2">
            <CFormLabel for="validationCustom01">Clasificador</CFormLabel>
            <CFormInput
              v-model="detalleRegistroPost.ctgClasificadorId"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="1">
            <button
              class="btn btn-primary"
              style="margin-top: 32px"
              v-on:click="getClasificador"
            >
              Buscar
            </button>
          </CCol>
          <CCol :md="5">
            <CFormLabel for="validationCustom02">Denominación</CFormLabel>
            <CFormInput v-model="detalle" id="validationCustom02" disabled />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2">
            <CFormLabel for="validationCustom04">Valor</CFormLabel>
            <CFormInput
              v-model="detalleRegistroPost.valor"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="2" class="mt-5">
            <CButton
              style="font-weight: bold"
              color="outline-primary"
              v-on:click="GuardarDetalle"
              >+Adicionar</CButton
            >
          </CCol>
          <div class="modal-footer"></div>
        </CForm>
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
          :items="detalleRegistroIngresos"
          :columns="columns2"
          columnFilter
          tableFilter
          cleaner
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >
          <template #status="{ item }">
            <td>
              <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
            </td>
          </template>
          <!-- Borre el index de aquí -->
          <template #show_details="{ item }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails1(item.transaccionId)"
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
        <h5>Total del Comprobante: {{formatPrice(totales)}}</h5>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { useEjecucionIngresoStore } from '../store/Ejecucion/ejecucionIngresos'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios'
import Api from '../services/EjecucionServices'
import { mapStores, mapActions, mapState } from 'pinia'
export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      totales: null,
      id: null,
      validatedCustom01: null,
      lgDemo: false,
      detalle: '',
      detalleRegistroIngresos: [],
      detalleRegistroPost: {
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        anioFiscalId: localStorage.getItem('ano'),
        transaccionId: 0,
        ctgClasificadorId: '',
        ctgFuenteId: '',
        ctgFuenteEspecificaId: '',
        ctgOrganismoFinanciadorId: '',
        fecha: new Date(Date.now()),
        etapa: 'INGRESOS',
        institucionOrtongate: '',
        valor: 0,
        estatus: 'A',
      },
      ingresoPost: {
        transaccionId: 0,
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        anioFiscalId: localStorage.getItem('ano'),
        numeroComprobante: 0,
        compIngresosId: '',
        etapa: '',
        contribuyenteId: 0,
        detalle: '',
        fecha: new Date(Date.now()),
        totalValor: 0,
        estatus: 'A',
      },
      columns: [
        {
          key: 'numeroComprobante',
          label: '#Comp',
          _style: { width: '10%' },
        },

        { key: 'fecha', label: 'Fecha', _style: { width: '20%' } },
        { key: 'etapa', label: 'Etapa', _style: { width: '10%' } },
        { key: 'compIngresosId', label: 'Recibo', _style: { width: '10%' } },
        {
          key: 'contribuyenteId',
          label: 'Contribuyente',
          _style: { width: '10%' },
        },
        { key: 'detalle', label: 'Detalle', _style: { width: '25%' } },
        { key: 'totalValor', label: 'Valor', _style: { width: '10%' } },
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
      columns2: [
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        {
          key: 'detalle',
          label: 'Descripción',
          _style: { width: '40%' },
        },
        {
          key: 'ctgFuenteId',
          label: 'Fuentes de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'ctgFuenteEspecificaId',
          label: 'Fuente específica',
          _style: { width: '40%' },
        },
        {
          key: 'ctgOrganismoFinanciadorId',
          label: 'Organismo de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'valor',
          label: 'valor',
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
    }
  },
  computed: {
    ...mapStores(useEjecucionIngresoStore),
    ...mapState(useEjecucionIngresoStore, ['ingresosList']),
  },
  methods: {
    ...mapActions(useEjecucionIngresoStore, [
      'addIngresos',
      'getIngresos',
      'addIngresoDetalle',
    ]),
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
    getTotalIngreso(){
      Api.getComprobanteIngresoTotal().then(response => {
        this.totales = response.data.data.totalValor
      })
    },
    Guardar() {
      if (this.id != null) {
        Api.updateFormulacion(this.id, this.post)
          .then((response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'Datos Actualizado con exito',
              title: 'Actualizado',
              showConfirmButton: false,
              timer: 1500,
            })
          })
          .catch((error) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: `${error.data.message}`,
              title: 'Actualizado',
              showConfirmButton: false,
              timer: 1500,
            })
          })
      } else {
        this.addIngresos(this.ingresoPost)
        setTimeout(this.getIngresos,500)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
      }
      event.preventDefault()
      event.stopPropagation()
    },
    GuardarDetalle() {
      this.addIngresoDetalle(this.detalleRegistroPost)
      //this.toggleDetails1(this.id)
      setTimeout(this.toggleDetails1(this.id),500)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Datos agregados con exito',
        title: 'Agregado',
        showConfirmButton: false,
        timer: 1500,
      })
      event.preventDefault()
      event.stopPropagation()
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
    toggleDetails1(id) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      console.log(id)
      this.id = id
      Api.getIngresoById(
        id,
        localStorage.getItem('ano'),
        localStorage.getItem('id_Ayuntamiento'),
      ).then((response) => {
        this.ingresoPost = response.data.data
        this.detalleRegistroPost.transaccionId =
          response.data.data.transaccionId
        this.detalleRegistroIngresos =
          response.data.data.detalleRegistroIngresos
        console.log(response.data)
      }),
      

      this.lgDemo = true
    },
    getClasificador() {
      Api.getIngresoClasificadorById(
        this.detalleRegistroPost.ctgClasificadorId,
      ).then((response) => {
        console.log(response.data.data)
        this.detalle = response.data.data.detalle
        this.detalleRegistroPost.ctgFuenteId = response.data.data.ctgFuenteId
        this.detalleRegistroPost.ctgFuenteEspecificaId =
          response.data.data.ctgFuenteEspecificaId
        this.detalleRegistroPost.ctgOrganismoFinanciadorId =
          response.data.data.ctgOrganismoFinanciadorId
        this.detalleRegistroPost.institucionOrtongate =
          response.data.data.instOtorga
        // this.detallePost.cControl = response.data.data.cControl
        // this.detallePost.nombre = response.data.data.nombre
        // this.postIngreso.control = response.data.data.cControl
        // this.postIngreso.detalle = response.data.data.nombre
      })
    },
  },

  mounted() {
    this.getIngresos()
    this.getTotalIngreso()
  },
}
</script>
