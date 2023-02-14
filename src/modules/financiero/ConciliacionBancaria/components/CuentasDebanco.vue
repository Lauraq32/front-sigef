<template>
  <h3 class="text-center">Cuentas de banco</h3>
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
    :items="Bancos"
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
    <template #fechaFinConciliacion="{ item }">
      <td>
        {{ formatDate(item.fechaFinConciliacion) }}
      </td>
    </template>
    <template #balanceLibro="{ item }">
      <td>
        {{ formatPrice(item.balanceLibro) }}
      </td>
    </template>
    <template #balanceBanco="{ item }">
      <td>
        {{ formatPrice(item.balanceBanco) }}
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="setBancoId(item.bancoId, item.nombreCuenta)"
        >
          {{ Boolean(item._toggled) ? 'Hide' : 'Conciliacion' }}
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
      <CModalTitle>Formulario Cuentas de banco</CModalTitle>
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
            <CFormLabel for="validationCustom01">Código</CFormLabel>
            <CFormInput id="validationCustom01" required />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="4">
            <CFormLabel for="validationCustom02">Nombre de Cuenta</CFormLabel>
            <CFormInput id="validationCustom02" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="validationCustom03">Numero Cta:</CFormLabel>
            <CFormInput id="validationCustom03" required />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Catalgo</CFormLabel>
            <CFormInput id="validationCustom04"> </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Nombre</CFormLabel>
            <CFormInput id="validationCustom05" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Imprime Modelo</CFormLabel>
            <CFormSelect id="validationCustom05">
              <option>1er. Modelo</option>
              <option>2do. Modelo</option>
              <option>3er. Modelo</option>
              <option>4to. Modelo</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05"
              >Ultimo Numero Fisico</CFormLabel
            >
            <CFormInput id="validationCustom05" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Fecha Ultimo Corte</CFormLabel>
            <CFormInput type="date" id="validationCustom05" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05"
              >Balance según el banco</CFormLabel
            >
            <CFormInput id="validationCustom05" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05"
              >Balance según el libro</CFormLabel
            >
            <CFormInput id="validationCustom05" required />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
              Guardar
            </button>
          </div>
        </CForm>
      </CCardBody>
    </CModalBody>
  </CModal>
  <CModal
    backdrop="static"
    size="xl"
    :visible="lgDemo3"
    @close="
      () => {
        lgDemo3 = false
      }
    "
  >
    <CModalHeader class="text-center">
      <CModalTitle style="width: 19%">Conciliacion Bancaria</CModalTitle>
      <CFormInput
        style="width: 26%"
        type="date"
        v-model="fechaFiltro"
        @change="getHistoricoConciliacion"
        id="validationCustom05"
        required
      />
    </CModalHeader>
    <div class="row p-1">
      <div class="col-4">
        <label for="dni">Cuenta de Banco</label>

        <input
          type="text"
          name="dni"
          id="dni"
          v-model="nombreCuenta"
          class="form-control"
          disabled
        />
      </div>
      <div class="col-12"></div>
      <div class="col-4">
        <label for="dni">No. de Cuenta</label>

        <input
          type="text"
          name="dni"
          id="dni"
          v-model="BancoId"
          class="form-control"
          disabled
        />
      </div>
    </div>

    <CModalBody>
      <CCardBody>
        <hr />
        <template #show_details="{ item, index }">
          <!-- <hr/> -->
          <td class="py-2">
            <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="getSelectCuenta(item.bancoId, item.nombreCuenta)"
            >
              {{ Boolean(item._toggled) ? 'Hide' : 'Seleccionar' }}
            </CButton>
          </td>
        </template>
        <template #fechaFinConciliacion="{ item }">
          <td>
            {{ formatDate(item.fechaFinConciliacion) }}
          </td>
        </template>
        <template #balanceLibro="{ item }">
          <td>
            {{ formatPrice(item.balanceLibro) }}
          </td>
        </template>
        <template #balanceBanco="{ item }">
          <td>
            {{ formatPrice(item.balanceBanco) }}
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

        <div class="row mb-3">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Balance segun el Libro
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">
            {{ this.Conciliacion.balanceLibroMes }}
          </div>
        </div>
        <hr />
        <h5 class="mb-n4">Mas:</h5>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Depositos/Transferencias del Mes
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.depositosMes }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Notas de Credito
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.creditosMes }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Otros
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.otrosCreditosMes }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Sub-Total
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.subTotalCreditosLibro }}</div>
        </div>
        <h5 class="mb-n4">Menos:</h5>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Cheques emitidos del Mes
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.chequesEmitidosMes }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Notas de Debito
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.debitosMes }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Otros
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.otrosDebitos }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Sub-Total
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.subTotalDebitosLibro }}</div>
        </div>
        <div
          class="row"
          style="
            font-weight: bold;
            width: 100%;
            background-color: #80808070;
            padding: 10px;
          "
        >
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Balance segun Libro al:
          </div>
          <div class="col-4"></div>
          <div class="col-4">{{ this.Conciliacion.balanceLibroMes }}</div>
        </div>
        <hr />
        <div class="row mb-3">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Balance segun el Banco al:
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.balanceBanco }}</div>
        </div>
        <hr />
        <h5 class="mb-n4">Mas:</h5>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Depositos en Transito
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.depositosMesTransito
 }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Otros
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.otrosDebitosTransito
 }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Sub-Total
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.subTotalCreditosBanco
 }}</div>
        </div>
        <h5 class="mb-n4">Menos:</h5>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Cheques en Transito
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.chequesEmitidosTransito
 }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Otros
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.otrosDebitosTransito
 }}</div>
        </div>
        <div class="row p-4">
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Sub-Total
          </div>
          <div class="col-4"></div>
          <div class="col-4" style="font-weight: bold">{{ this.Conciliacion.subTotalDebitosBanco
 }}</div>
        </div>
        <div
          class="row"
          style="
            font-weight: bold;
            width: 100%;
            background-color: #80808070;
            padding: 10px;
          "
        >
          <div class="col-4 font-weight-bold" style="font-weight: bold">
            Balance segun el Banco al:
          </div>
          <div class="col-4"></div>
          <div class="col-4">{{ this.Conciliacion.balanceBanco
 }}</div>
        </div>
        <hr />
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
            Guardar
          </button>
          <button class="btn btn-info btn-block mt-1" v-on:click="Guardar">
            Imprimir
          </button>
        </div>
      </CCardBody>
    </CModalBody>
  </CModal>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/ConciliacionServices'
import Swal from 'sweetalert2/dist/sweetalert2.js'
export default {
  components: {
    CSmartTable,
    CModal,
  },
  data: () => {
    return {
      validatedCustom01: null,
      lgDemo: false,
      lgDemo3: false,
      Bancos: [],
      BancoId: null,
      fechaFiltro: null,
      Conciliacion: {
        ayuntamientoId: localStorage.getItem('id_Ayuntamiento'),
        bancoId: 1,
        fecha: new Date(Date.now()),
        balanceAnteriorLibro: 0,
        depositosMes: 0,
        creditosMes: 0,
        otrosCreditosMes: 0,
        subTotalCreditosLibro: 0,
        chequesEmitidosMes: 0,
        debitosMes: 0,
        otrosDebitos: 0,
        subTotalDebitosLibro: 0,
        balanceLibroMes: 0,
        balanceBanco: 0,
        depositosMesTransito: 0,
        creditosMesTransito: 0,
        otrosCreditosMesTransito: 0,
        subTotalCreditosBanco: 0,
        chequesEmitidosTransito: 0,
        debitosTransito: 0,
        otrosDebitosTransito: 0,
        subTotalDebitosBanco: 0,
        balanceBancoMes: 0,
      },
      columns: [
        {
          key: 'bancoId',
          label: 'Codigo',
          _style: { width: '10%' },
        },
        {
          key: 'numeroCuenta',
          label: 'Numero De La Cuenta',
          _style: { width: '10%' },
        },
        {
          key: 'nombreCuenta',
          label: 'Nombre De la Cuenta',
          _style: { width: '20%' },
        },
        {
          key: 'balanceLibro',
          label: 'Balance Segun Libro',
          _style: { width: '20%' },
        },
        {
          key: 'balanceBanco',
          label: 'Balance Banco',
          _style: { width: '20%' },
        },
        {
          key: 'fechaFinConciliacion',
          label: 'Fecha Ult. Corte',
          _style: { width: '20%' },
        },
        {
          key: 'ultimoNumeroFisico',
          label: 'Ult. No. Fisico',
          _style: { width: '20%' },
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
    setBancoId(banco, nombreBanco) {
      this.lgDemo3 = true
      this.BancoId = banco
      this.nombreCuenta = nombreBanco
    },
    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
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
    getAllBancos() {
      Api.getAllCuentaBanco().then((response) => {
        this.Bancos = response.data.data
        console.log(response);
      })
    },
    getHistoricoConciliacion(bancoId) {
      Api.getAllHistorico(this.BancoId, this.fechaFiltro).then((response) => {
        this.Conciliacion = response.data.data
        console.log(response)
      })
    },
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
    this.getAllBancos()
  },
}
</script>
