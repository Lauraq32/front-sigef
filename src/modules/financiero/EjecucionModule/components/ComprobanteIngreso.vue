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
        <CButton
          color="info"
          @click="
            () => {
              reportes = true
            }
          "
          >Imprimir Ejecucion</CButton
        >
      </div>
      <div class="d-inline p-2">
        <CButton
          color="info"
          @click="
            () => {
              reportesExportarModal = true
            }
          "
          >Exportar modificacion</CButton
        >
      </div>
      <div class="d-inline p-2">
        <CButton
          color="info"
          @click="
            () => {
              reportesExportarModalEjecucion = true
            }
          "
          >Exportar Ejecucion</CButton
        >
      </div>
    </div>
  </div>
  <hr />
 
  <CModal :backdrop="false" :keyboard="false" :visible="reportes">
    <CModalHeader>
      <CModalTitle>Exportar Variacion</CModalTitle>
    </CModalHeader>
    <CModalBody
      ><CFormSelect v-model="mesReporte" id="validationCustom05">
        <option>1-Enero</option>
        <option>2-Febrero</option>
        <option>3-Marzo</option>
        <option>4-Abril</option>
        <option>5-Mayo</option>
        <option>6-Junio</option>
        <option>7-Julio</option>
        <option>8-Agosto</option>
        <option>9-Septiembre</option>
        <option>10-Octubre</option>
        <option>11-Noviembre</option>
        <option>12-Diciembre</option>
      </CFormSelect></CModalBody
    >
    <CModalFooter>
      <CButton color="secondary">Close</CButton>
      <CButton color="primary" @click="imprimirReporte">Imprimir</CButton>
    </CModalFooter>
  </CModal>
  <CModal :backdrop="false" :keyboard="false" :visible="reportesExportarModalEjecucion">
    <CModalHeader>
      <CModalTitle>Exportar Ejecucion</CModalTitle>
    </CModalHeader>
    <CModalBody
      ><CFormSelect v-model="mesReporte" id="validationCustom05">
        <option>1-Enero</option>
        <option>2-Febrero</option>
        <option>3-Marzo</option>
        <option>4-Abril</option>
        <option>5-Mayo</option>
        <option>6-Junio</option>
        <option>7-Julio</option>
        <option>8-Agosto</option>
        <option>9-Septiembre</option>
        <option>10-Octubre</option>
        <option>11-Noviembre</option>
        <option>12-Diciembre</option>
      </CFormSelect></CModalBody
    >
    <CModalFooter>
      <CButton color="secondary">Close</CButton>
      <CButton color="primary" @click="exportarReporteEjecucion">Imprimir</CButton>
    </CModalFooter>
  </CModal>
  <CModal :backdrop="false" :keyboard="false" :visible="reportesExportarModal">
    <CModalHeader>
      <CModalTitle>Exportar Modificacion</CModalTitle>
    </CModalHeader>
    <CModalBody
      ><CFormSelect v-model="mesReporte" id="validationCustom05">
        <option>1-Enero</option>
        <option>2-Febrero</option>
        <option>3-Marzo</option>
        <option>4-Abril</option>
        <option>5-Mayo</option>
        <option>6-Junio</option>
        <option>7-Julio</option>
        <option>8-Agosto</option>
        <option>9-Septiembre</option>
        <option>10-Octubre</option>
        <option>11-Noviembre</option>
        <option>12-Diciembre</option>
      </CFormSelect></CModalBody
    >
    <CModalFooter>
      <CButton color="secondary">Close</CButton>
      <CButton color="primary" @click="exportarReporte">Imprimir</CButton>
    </CModalFooter>
  </CModal>
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
    <template #fecha="{ item }">
      <td>
        {{ formatDate(item.fecha) }}
      </td>
    </template>
    <template #totalValor="{ item }">
      <td>
        {{ formatPrice(item.totalValor) }}
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-1" >
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="toggleDetails1(item.transaccionId)">
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
        </CButton>
      </td>
      <td class="py-1" >
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="toggleDetails2(item.transaccionId)">
          {{ Boolean(item._toggled) ? 'Hide' : 'Detalle' }}
        </CButton>
      </td>
      <td class="py-1" >
        <CButton class="mt-1" color="primary" variant="outline" square size="sm" @click="imprimirReporte1(item)">
          {{ Boolean(item._toggled) ? 'Hide' : 'Imprimir' }}
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
          <CCol :md="2">
            <CFormLabel for="validationCustom04">Contribuyente</CFormLabel>
            <vue3-simple-typeahead
              class="form-control"
              v-model="ingresoPost.contribuyenteId"
              id="validationCustom04"
              placeholder="Escriba Aqui..."
              :items="contribuyentesName"
              :minInputLength="1"
              :itemProjection="itemProjectionFunction"
              @selectItem="selectItemEventHandler"
              @onInput="onInputEventHandler"
              @onFocus="onFocusEventHandler"
              @onBlur="onBlurEventHandler"
            >
            </vue3-simple-typeahead>
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
          
          <div class="modal-footer"></div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
  <CModal
    size="xl"
    :visible="lgDemo1"
    @close="
      () => {
        lgDemo1 = false
        reload()
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
              type="number"
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
          <template #valor="{ item }">
            <td>
              {{ formatPrice(item.valor) }}
            </td>
          </template>
          <template #nombre="{ item }">
            <td>
              {{ item.ctgClasificador.nombre }}
            </td>
          </template>
          Borre el index de aquí
          <template #show_details="{ item }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails1()"
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
        <h5>Total del Comprobante: {{ formatPrice(totales) }}</h5>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>

<script>
import { useRegistroStore } from '../store/Ejecucion/registroIngreso'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { useEjecucionIngresoStore } from '../store/Ejecucion/ejecucionIngresos'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import axios from 'axios'
import Api from '../services/EjecucionServices'
import { mapStores, mapActions, mapState } from 'pinia'
import { ref } from 'vue'
import SimpleTypeahead from 'vue3-simple-typeahead'
import 'vue3-simple-typeahead/dist/vue3-simple-typeahead.css'

export default {
  components: {
    CSmartTable,
    CModal,
    SimpleTypeahead,
  },

  data: () => {
    return {
      mesReporte: 1,
      parametroReporte: '',
      reportes: false,
      reportesExportarModal:false,
      reportesExportarModalEjecucion:false,
  
      contribuyentesList: [],
      contribuyentesName: [],
      totales: null,
      id: null,
      validatedCustom01: null,
      lgDemo: false,
      lgDemo1: false,
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
        etapa: 'INGRESOS',
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
          _style: { width: '5%' },
        },

        { key: 'fecha', label: 'Fecha', _style: { width: '5%' } },
        { key: 'etapa', label: 'Etapa', _style: { width: '8%' } },
        { key: 'compIngresosId', label: 'Recibo', _style: { width: '5%' } },
        {
          key: 'contribuyenteId',
          label: 'Contribuyente',
          _style: { width: '10%' },
        },
        { key: 'detalle', label: 'Detalle', _style: { width: '40%' } },
        { key: 'totalValor', label: 'Valor', _style: { width: '20%' } },
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
          key: 'nombre',
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
    imprimirReporte() {
      window
        .open(
          `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Ingresos_Ejecucion&rs:Command=Render&CAPITULO_AYTO=${localStorage.getItem(
            'id_Ayuntamiento',
          )}&ANO=2022&PERIODO=${this.mesReporte.split('-')[0]}`,
          '_blank',
        )
        .focus()
    },
    exportarReporte() {
      this.downloadFile()
     console.log(this.mesReporte.split('-')[0])
    },
    exportarReporteEjecucion() {
      this.downloadFileEjecucion()
     console.log(this.mesReporte.split('-')[0])
    },
    downloadFile() {
      Api.downloadGastoModificacion(this.mesReporte.split('-')[0]).then((response) => {
                     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                     var fURL = document.createElement('a');
    
                     fURL.href = fileURL;
                     fURL.setAttribute('download', `ME-${localStorage.getItem('usuario').substring(4,8)}${localStorage.getItem('fecha')}.csv`);
                     document.body.appendChild(fURL);
    
                     fURL.click();
                });
                this.mesReporte = 1
    },
    downloadFileEjecucion() {
      Api.downloadGastoEjecucion(this.mesReporte.split('-')[0]).then((response) => {
                     var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                     var fURL = document.createElement('a');
    
                     fURL.href = fileURL;
                     fURL.setAttribute('download', `EI-${localStorage.getItem('usuario').substring(4,8)}${localStorage.getItem('fecha')}.csv`);
                     document.body.appendChild(fURL);
    
                     fURL.click();
                });
                this.mesReporte = 1
    },
    imprimirReporte1(item) {
      console.log(item)
      window
        .open(
          `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Recibo_Ingresos_A1&rs:Command=Render&CAPITULO_AYTO=${localStorage.getItem(
            'id_Ayuntamiento')}&ID_COMP_INGRESOS=${item.transaccionId}`,
          '_blank',
        )
        .focus()
    },
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    ...mapActions(useEjecucionIngresoStore, [
      'addIngresos',
      'getIngresos',
      'addIngresoDetalle',
    ]),
    getContribuyentes() {
      Api.getContribuyente().then((response) => {
        this.contribuyentesList = response.data.data
     
        this.contribuyentesList.map((contribuyente) => {
          this.contribuyentesName.push(
            `${contribuyente.id}-${contribuyente.nombre}`,
          )
          console.log(this.contribuyentesName)
        })

        console.log(this.contribuyentesList)
      })
    },
    selectItemEventHandler(id) {
      this.ingresoPost.contribuyenteId = id.split('-')[0]
    },
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
    getTotalIngreso(id) {
      Api.getComprobanteIngresoTotal(id).then((response) => {
        this.totales = response.data.data.totalValor
      })
    },
    Guardar() {
      if (this.id != null) {
        Api.putIngresoCabecera(this.id, this.ingresoPost)
          .then((response) => {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              text: 'Datos Actualizado con exito',
              title: 'Actualizado',
              showConfirmButton: false,
              timer: 1500,
            })
            this.clearModal2()
            setTimeout(this.getIngresos, 500)
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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          text: 'Datos agregados con exito',
          title: 'Agregado',
          showConfirmButton: false,
          timer: 1500,
        })
        this.clearModal2()
        setTimeout(this.getIngresos, 500)
      }
      event.preventDefault()
      event.stopPropagation()
    },
    GuardarDetalle() {
      this.addIngresoDetalle(this.detalleRegistroPost)
      //this.toggleDetails1(this.id)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Datos agregados con exito',
        title: 'Agregado',
        showConfirmButton: false,
        timer: 1500,
      })
      setTimeout(this.getDetalle(this.id), 500)
      setTimeout(this.getTotalIngreso(this.id), 500)
      this.getIngresos()
      this.clearModal1()
      event.preventDefault()
      event.stopPropagation()
    
    },
    reload(){
      window.location.reload();
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
    getDetalle(id) {
      Api.getRegistroIngresoDetalle(id).then((response) => {
        this.detalleRegistroIngresos = response.data.data
        console.log(response.data)
      })
    },
    clearModal1() {
      this.detalleRegistroPost.detalleRegistroPostctgClasificadorId= '',
      this.detalleRegistroPost.ctgFuenteId = '',
      this.detalleRegistroPost.ctgClasificadorId = ''
      this.detalleRegistroPost.ctgFuenteEspecificaId = '',
      this.detalleRegistroPost.ctgOrganismoFinanciadorId = '',
      this.detalleRegistroPost.fecha = new Date(Date.now()),
      this.detalleRegistroPost.etapa = 'INGRESOS',
      this.detalleRegistroPost.institucionOrtongate = '',
      this.detalleRegistroPost.valor = 0,
      this.detalleRegistroPost.estatus = 'A'
      this.detalle = ''
      // this.detalleRegistroPost = {
      //   ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
      //   anioFiscalId: localStorage.getItem('ano'),
   
      //   ctgClasificadorId: '',
      //   ctgFuenteId: '',
      //   ctgFuenteEspecificaId: '',
      //   ctgOrganismoFinanciadorId: '',
      //   fecha: new Date(Date.now()),
      //   etapa: 'INGRESOS',
      //   institucionOrtongate: '',
      //   valor: 0,
      //   estatus: 'A',
      // }
    },
    clearModal2() {
      this.ingresoPost = {
        transaccionId: 0,
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        anioFiscalId: localStorage.getItem('ano'),
        numeroComprobante: 0,
        compIngresosId: '',
        etapa: 'INGRESOS',
        contribuyenteId: 0,
        detalle: '',
        fecha: new Date(Date.now()),
        totalValor: 0,
        estatus: 'A',
      }
    },
    toggleDetails1(id) {
      this.getDetalle(id)
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      console.log(id)
      this.id = id
      this.getTotalIngreso(this.id)
      this.getDetalle(id)
      Api.getIngresoById(
        id,
        localStorage.getItem('ano'),
        localStorage.getItem('id_Ayuntamiento'),
      ).then((response) => {
        Api.getContribuyenteById(response.data.data.contribuyenteId).then((response) => {
          this.ingresoPost.contribuyenteId = response.data.data.id
          // this.selectItemEventHandler(response.data.data.id)
          // console.log(response.data.data.id)
         
        })
        this.ingresoPost = response.data.data
        this.detalleRegistroPost.transaccionId =
          response.data.data.transaccionId
        console.log(response.data)
      }),
        (this.lgDemo = true)
    },
    toggleDetails2(id) {
      this.getDetalle(id)
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      console.log(id)
      this.id = id
      this.getTotalIngreso(this.id)
      this.getDetalle(id)
      Api.getIngresoById(
        id,
        localStorage.getItem('ano'),
        localStorage.getItem('id_Ayuntamiento'),
      ).then((response) => {
        this.ingresoPost = response.data.data
        this.detalleRegistroPost.transaccionId =
          response.data.data.transaccionId
        console.log(response.data)
      }),
        (this.lgDemo1 = true)
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
    this.getContribuyentes()
  },
}
</script>
-->
