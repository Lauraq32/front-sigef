<template>
  <h3 class="text-center">Comprobante de gastos</h3>
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
    </div>
    <div class="d-inline p-2">
      <CButton color="info" @click="IngresoReport">Imprimir Comprobante</CButton>
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
    :items="cabeceraGasto"
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
    <template #show_details="{item}">
      <td class="py-1">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="toggleDetails1(item)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Editar' }}
        </CButton>
      </td>
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="
            showDetalle(item)
          "
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Detalle' }}
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
    <CModalHeader class="text-center">
      <CModalTitle>Comprobante de gastos</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit="handleSubmitCustom01"
        >
          <div class="row">
            <div class="col-6">
              <div class="col-12">
                <div class="row">
                  <CCol :md="12">
                    <CFormLabel for="validationCustom01">Comp No:</CFormLabel>
                    <CFormInput
                      v-model="postGasto.numeroComprobante"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom04">Fecha</CFormLabel>
                    <CFormInput
                      v-model="postGasto.fecha"
                      type="date"
                      id="validationCustom04"
                    >
                    </CFormInput>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom02">Estatus</CFormLabel>
                    <CFormInput
                      v-model="postGasto.estatus"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>

                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">Etapa</CFormLabel>
                    <CFormSelect
                      v-model="postGasto.etapa"
                      id="validationCustom05"
                    >
                      <option>DEVENGADO</option>
                      <option>PAGADO</option>
                      <option>COMPROMISO</option>
                      <option>VARIACION</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01"
                      >Resolución No.</CFormLabel
                    >
                    <CFormInput
                      v-model="postGasto.nResolucion"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>

                  <CCol :md="12">
                    <CFormLabel for="validationCustom04"
                      >Fecha Resol.</CFormLabel
                    >
                    <CFormInput
                      v-model="postGasto.fechaResolucion"
                      type="date"
                      id="validationCustom04"
                    >
                    </CFormInput>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>

                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">
                      Forma/pago</CFormLabel
                    >
                    <CFormSelect
                      v-model="postGasto.nCheque"
                      id="validationCustom05"
                    >
                      <option>Cheque</option>
                      <option>Caego Beneficiario</option>
                      <option>Transferencia</option>
                      <option>Revesar</option>
                    </CFormSelect>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01"
                      >Comp. Modifica</CFormLabel
                    >
                    <CFormInput
                      v-model="postGasto.nResolucion"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="col-12">
                <div class="row">
                  <CCol :md="8">
                    <CFormLabel for="validationCustom01"
                      >Beneficiario</CFormLabel
                    >
                    <CFormInput
                      v-model="postGasto.codBenefi"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="4">
                    <button
                      type="button"
                      class="btn btn-primary mt-4"
                      data-bs-dismiss="modal"
                      @click="gotToBeneficiario"
                    >
                      Agregar
                    </button>
                  </CCol>

                  <CCol :md="8">
                    <CFormLabel for="validationCustom01"
                      >Concepto/auxiliar</CFormLabel
                    >
                    <CFormInput
                      v-model="postGasto.codBenefi"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="4">
                    <button
                      type="button"
                      class="btn btn-primary mt-4"
                      data-bs-dismiss="modal"
                    >
                      Agregar
                    </button>
                  </CCol>

                  <CCol :md="12">
                    <CFormLabel for="validationCustom01"
                      >Cuenta de banco</CFormLabel
                    >
                    <CFormInput
                      v-model="postGasto.bancoId"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="validationCustom01"
                      >Total Retencion</CFormLabel
                    >
                    <CFormInput
                      v-model="postGasto.totalRetenciones"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="validationCustom01">Valor Neto</CFormLabel>
                    <CFormInput
                      v-model="postGasto.valorNeto"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="12">
                    <CFormLabel for="validationCustom01">Detalle</CFormLabel>
                    <CFormTextarea
                      v-model="postGasto.detalle"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></CFormTextarea>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              class="btn btn-info btn-block mt-1"
              v-on:click="postCabecera"
            >
              Guardar
            </button>
          </div>
        </CForm>
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
          :items="[]"
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
        <CCol :md="2.3" class="left">
          <CFormLabel for="validationCustom01">Valor Total</CFormLabel>
          <CFormInput id="validationCustom01" required />

          <CFormFeedback valid> Exito! </CFormFeedback>
          <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
        </CCol>
      </CCardBody>
    </CModalBody>
  </CModal>
  <CModal
    size="xl"
    :visible="lgDemo1"
    @close="
      () => {
        lgDemo1 = false
      }
    "
  >
    <CModalHeader class="text-center">
      <CModalTitle>Detalles de Comprobante de Gasto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <CCardBody>
        <CForm
          class="row g-3 needs-validation"
          novalidate
          :validated="validatedCustom01"
          @submit=""
        >
          <div class="row">
            <div class="col-12">
              <div class="col-12">
                <div class="row">
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01"
                      >Programa o Proyecto</CFormLabel
                    >
                    <CFormInput
                      v-model="postGastoDetalle.estProg"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="4">
                    <CFormLabel for="validationCustom02"
                      >Clasificador</CFormLabel
                    >
                    <CFormInput
                      v-model="postGastoDetalle.ctgClasificadorId"
                      id="validationCustom02"
                      required
                    />
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="2">
                    <button
                      class="btn btn-primary"
                      style="margin-top: 32px"
                      v-on:click="getClasificador"
                    >
                      Buscar
                    </button>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom04">Denominacion</CFormLabel>
                    <CFormInput v-model="postGastoDetalle.nombre" id="validationCustom04"> </CFormInput>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01">Fuente</CFormLabel>
                    <CFormInput
                      v-model="postGastoDetalle.ctgFuenteId"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>

                  <CCol :md="6">
                    <CFormLabel for="validationCustom04"
                      >Fte. Especifica</CFormLabel
                    >
                    <CFormInput
                      v-model="postGastoDetalle.ctgFuenteEspecificaId"
                      id="validationCustom04"
                    >
                    </CFormInput>
                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>

                  <CCol :md="6">
                    <CFormLabel for="validationCustom05">
                      Org. Financiador</CFormLabel
                    >
                    <CFormInput
                      v-model="postGastoDetalle.ctgOrganismoFinanciadorId"
                      id="validationCustom04"
                    >
                    </CFormInput>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01"
                      >Base Imposible</CFormLabel
                    >
                    <CFormInput
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01"
                      >Monto Bruto.</CFormLabel
                    >
                    <CFormInput
                      v-model="postGastoDetalle.valorBruto"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01"
                      >Retenciones</CFormLabel
                    >
                    <CFormInput
                      v-model="postGastoDetalle.retenciones"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                  <CCol :md="6">
                    <CFormLabel for="validationCustom01"
                      >Banco</CFormLabel
                    >
                    <CFormInput
                    v-model="postGastoDetalle.bancoId"
                      id="validationCustom01"
                      required
                    />

                    <CFormFeedback valid> Exito! </CFormFeedback>
                    <CFormFeedback invalid>
                      Favor agregar el campo
                    </CFormFeedback>
                  </CCol>
                </div>
              </div>
            </div>
           
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              class="btn btn-info btn-block mt-1"
              v-on:click="postDetalle"
            >
              Guardar
            </button>
          </div>
        </CForm>
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
          :items="detalleGasto"
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
          <template #show_details="{ item, index }">
            <td class="py-2">
              <CButton
                color="primary"
                variant="outline"
                square
                size="sm"
                @click="toggleDetails(item, index)"
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
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/EjecucionServices'
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
  components: {
    CSmartTable,
    CModal,
  },

  data: () => {
    return {
      cabeceraGasto: [],
      detalleGasto:[],
      validatedCustom01: null,
      lgDemo: false,
      lgDemo1: false,
      id:null,
      cabeceraId: null,
      postGasto: {
        id: 0,
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        anioFiscal: null,
        secuencialId: '',
        numeroComprobante: 0,
        detalle: '',
        fecha: '',
        etapa: '',
        codBenefi: 0,
        destGasto: 0,
        bancoId: 0,
        nCheque: '',
        totalBruto: 0,
        valorNeto: 0,
        fechaResolucion: '',
        nResolucion: '',
        cantFactCXP: 0,
        totalCXP: 0,
        cantPGrupo: 0,
        totalPGrupo: 0,
        cantRetenci: 0,
        totalRetenciones: 0,
        dtoInicial: 0,
        dtoFinal: 0,
        cantDocto: 0,
        estatus: 'A',
      },
      postGastoDetalle: {
        id: 0,
        anioFiscalId: parseInt(localStorage.getItem('ano')),
        ayuntamientoId: parseInt(localStorage.getItem('id_Ayuntamiento')),
        secuenciaComprobante: null,
        fecha: 0,
        bancoId: 0,
        estProg: '',
        ctgClasificadorId: '',
        ctgFuenteId: '',
        ctgFuenteEspecificaId: '',
        ctgOrganismoFinanciadorId: '',
        ctgFuncionId: '1',
        valorBruto: 0,
        retenciones: 0,
        neto: 0,
      },
      columns: [
        {
          key: 'numeroComprobante',
          label: 'Comp No',
          _style: { width: '10%' },
        },
        { key: 'fecha', label: 'Fecha', _style: { width: '10%' } },
        { key: 'etapa', label: 'Etapa', _style: { width: '10%' } },
        { key: 'nCheque', label: 'Forma/Pago', _style: { width: '10%' } },
        {
          key: 'codBenefi',
          label: 'Beneficiario',
          _style: { width: '20%' },
        },
        { key: 'bancoId', label: 'Cuenta de banco', _style: { width: '20%' } },
        { key: 'totalBruto', label: 'Total Bruto', _style: { width: '20%' } },
        {
          key: 'totalRetenciones',
          label: 'Total Retencion',
          _style: { width: '20%' },
        },
        { key: 'valorNeto', label: 'Valor Neto', _style: { width: '40%' } },
        { key: 'ck', label: 'No. CK/CR', _style: { width: '40%' } },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
          // _props: { color: 'primary', class: 'fw-semibold'}
        },
      ],

      columns2: [
        {
          key: 'estProg',
          label: 'Estructura',
          _style: { width: '40%' },
        },
        {
          key: 'ctgClasificadorId',
          label: 'Clasificador',
          _style: { width: '40%' },
        },
        { key: 'nombre', label: 'Descripcion', _style: { width: '40%' } },
        {
          key: 'ctgFuenteId',
          label: 'Fuente de financiamiento',
          _style: { width: '40%' },
        },
        {
          key: 'ctgFuenteEspecificaId',
          label: 'Fuente especifica',
          _style: { width: '40%' },
        },
        {
          key: 'ctgOrganismoFinanciadorId',
          label: 'Organismo de financiamiento',
          _style: { width: '40%' },
        },
        { key: 'Sub_total', label: 'Sub-total', _style: { width: '40%' } },
        { key: 'retenciones', label: 'Retencion', _style: { width: '40%' } },
        { key: 'valorBruto', label: 'Valor neto', _style: { width: '40%' } },

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
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    toggleDetails1(item) {
      // if (this.details.includes(item._id)) {
      //   this.details = this.details.filter((_item) => _item !== item._id)
      //   return
      // }
      // this.details.push(item._id)
      this.lgDemo = true
      this.cabeceraId = item.id
      Api.getRegistroGastobyid(this.cabeceraId).then((response) => {
        console.log(response.data)
        this.postGasto.fecha = this.formatDate(response.data.data.fecha)
        console.log(this.postGasto.fecha)
        this.postGasto = response.data.data
      })
    },
    showDetalle(item){
      this.lgDemo1 = true
      this.id = item.id
      this.postGastoDetalle.secuenciaComprobante = item.id
      Api.getRegistroGastoDetalle(item.id).then(response => {
        console.log(response.data)
        this.detalleGasto = response.data.data
      })

    },
    gotToBeneficiario() {
      this.$router.push({ path: '/Ejecucion/beneficiarios' })
    },
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }

      this.validatedCustom01 = true
    },
    postCabecera(data) {
      if (this.cabeceraId == null) {
        Api.postRegistroGasto(this.postGasto).then((response) => {
        console.log(response.data.data)
      })
      setTimeout(this.getCabecera, 500)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Datos agregados con exito',
        title: 'Agregado',
        showConfirmButton: false,
        timer: 1500,
      })

      } else {
        Api.putRegistroGasto(this.postGasto, this.cabeceraId).then((response) => {
          console.log(response.data)
        })
        setTimeout(this.getCabecera, 500)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Datos Actualizado con exito',
        title: 'Actualizado',
        showConfirmButton: false,
        timer: 1500,
      })
      }
      event.preventDefault()
        event.stopPropagation()
      
    },
    postDetalle(){
      Api.postGastoDetalle(this.postGastoDetalle).then((response) => {
        console.log(response)
      })
      setTimeout(this.getCabecera, 500)
      setTimeout(showDetalle(this.id))
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        text: 'Datos agregados con exito',
        title: 'Agregado',
        showConfirmButton: false,
        timer: 1500,
      })
    },
    getCabecera() {
      Api.getRegistroGasto().then((response) => {
        console.log(response.data.data)
        this.cabeceraGasto = response.data.data
      })
    },

    getClasificador() {
      Api.getClasificador(this.postGastoDetalle.ctgClasificadorId).then((response) => {
        console.log(response.data.data)
        this.postGastoDetalle.nombre = response.data.data.nombre
        //this.postGastoDetalle. = response.data.data.nombre

      })
    },
    // IngresoReport() {
    //   window
    //     .open(
    //       `http://lmd-server-01/ReportServer/Pages/ReportViewer.aspx?%2fReportes%2fRep_Gastos_Formulacion_FP08&rs:Command=Render&CAPITULO_AYTO=${localStorage.getItem('id_Ayuntamiento')}&FONDO=1&ANO=2022`,
    //       '_blank',
    //     )
    //     .focus()
    // },

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
    toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },
  },
  mounted() {
    this.getCabecera()
  },
}
</script>

<style>
/* .flex-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.spacing {
  display: flex;
  flex-direction: column;
  margin-left: 450px;
} */

.top {
  margin-top: 27px;
}

.left {
  margin-left: 910px;
  margin-top: 15px;
}
</style>
