<template>
      
  <h3 class="text-center">Notas de debito</h3>

  <div class="col-4 mb-3">
    <label
      for="dni"
      style="font-weight: bold; margin-left: 12px; margin-top: 7px"
      >Nombre De La Cuenta</label
    >

    <input
      type="text"
      name="dni"
      id="dni"
      v-model="nombreCuenta"
      class="form-control"
      disabled
    />
  </div>
  <div class="table-headers">
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
      <CButton
        color="info"
        @click="
          () => {
            lgDemo3 = true
          }
        "
        >Seleccionar Cuenta</CButton
      >
    </div>
  </div>
  <hr />
  <CSmartTable class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer
    columnFilter
    header
    :items="DepositoList"
    :columns="columns"
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
    <template #valor="{ item }">
      <td>
        {{ formatPrice(item.valor) }}
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
      <td class="py-1">
        <CButton
          class="mt-1"
          color="danger"
          variant="outline"
          square
          size="sm"
          @click="deleteItem(item)"
        >
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
    size="lg"
    :visible="lgDemo"
    @close="
      () => {
        lgDemo = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Formulario Cuentas de depósitos</CModalTitle>
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
            <CFormLabel for="validationCustom01">Deposito No:</CFormLabel>
            <CFormInput
              disabled
              v-model="postDepositos.secuencial"
              id="validationCustom01"
              required
            />

            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Fecha</CFormLabel>
            <CFormInput
              type="date"
              v-model="postDepositos.fecha"
              id="validationCustom05"
              required
            />
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="6">
            <CFormLabel for="validationCustom03">Valor</CFormLabel>
            <CFormInput
              v-model="postDepositos.valor"
              id="validationCustom03"
              required
            />
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom05">Estado</CFormLabel>
            <CFormSelect
              v-model="postDepositos.estatus"
              id="validationCustom05"
            >
              <option>CONFIRMADO</option>
              <option>TRANSITO</option>
              <option>CANCELADO</option>
            </CFormSelect>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Concepto</CFormLabel>
            <CFormInput
              v-model="postDepositos.auxiliar"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Nota</CFormLabel>
            <CFormInput v-model="postDepositos.detalle" id="validationCustom04">
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
            <CFormFeedback invalid> Favor agregar el campo </CFormFeedback>
          </CCol>
          <CCol :md="3">
            <CFormLabel for="validationCustom04">Documento</CFormLabel>
            <CFormInput
              v-model="postDepositos.documento"
              id="validationCustom04"
            >
            </CFormInput>
            <CFormFeedback valid> Exito! </CFormFeedback>
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
      <CModalTitle>Tipos De Cuentas</CModalTitle>
    </CModalHeader>
    <div class="row p-1">
      <div class="col-4">
        <label
          for="dni"
          style="font-weight: bold; margin-left: 12px; margin-top: 7px"
          >Nombre De La Cuenta</label
        >

        <input
          type="text"
          name="dni"
          id="dni"
          v-model="nombreCuenta"
          class="form-control"
          disabled
        />
      </div>
    </div>

    <CModalBody>
      <CCardBody>
        <hr />
        <CSmartTable class="sticky-top"
          clickableRows
          :tableProps="{
            striped: true,
            hover: true,
          }"
          :tableHeadProps="{}"
          :activePage="1"
          
          header
          :items="Bancos"
          :columns="columns3"
          columnFilter
          itemsPerPageSelect
          :itemsPerPage="5"
          columnSorter
          :sorterValue="{ column: 'status', state: 'asc' }"
          pagination
        >
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
import Api from '../services/ConciliacionServices'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import { mapActions } from 'pinia'
 
import { useToastStore } from '@/store/toast'

export default {
  components: {
    CSmartTable,
    CModal,
      
  },
  data: function () {
    return {
      lgDemo3: false,
      nombreCuenta: '',
      DepositoList: [],
      Bancos: [],
      postDepositos: {
        ayuntamientoId: this.$ayuntamientoId,
        bancoId: 1,
        ctgCuenta: null,
        secuencial: 1,
        documento: '',
        fecha: new Date(Date.now()),
        auxiliar: '',
        valor: 0,
        estatus: '',
      },
      columns: [
        { key: 'secuencial', label: '#Depós.', _style: { width: '8%' } },
        { key: 'fecha', label: 'Fecha', _style: { width: '8%' } },
        { key: 'documento', label: 'Documento', _style: { width: '8%' } },
        { key: 'valor', label: 'Valor', _style: { width: '8%' } },
        { key: 'detalle', label: 'Detalle', _style: { width: '40%' } },
        { key: 'estatus', label: 'Estatus', _style: { width: '8%' } },
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
      columns3: [
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

      validatedCustom01: null,
      lgDemo: false,
    }
  },

  computed: {},

  methods: {
    ...mapActions(useToastStore, ['show']),

    handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    },
    formatDate(fecha) {
      return new Date(fecha).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    },
    clearModal1() {
      this.postDepositos = {
        ayuntamientoId: this.$ayuntamientoId,
        bancoId: null,
        secuencial: 1,
        documento: '',
        fecha: new Date(Date.now()),
        auxiliar: '',
        valor: 0,
        estatus: '',
      }
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace('.', '.')
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    },
    getAllBancos() {
      Api.getAllCuentaBanco().then((response) => {
        this.Bancos = response.data.data
        //this.nombre = response.data.data.nombreCuenta
      })
    },
    Guardar() {
      Api.postNotaDebito(this.postDepositos)
        .then((response) => {
          this.show({
            content: response.data.message,
            closable: true,
            color: 'success',
          })
        })
        .catch((error) => {
          this.show({
            content: error.message,
            closable: true,
            color: 'danger',
          })
        })
      setTimeout(this.getAllBancos, 500)
      this.clearModal1()
    },
    getSelectCuenta(BancoId, nombre) {
      Api.getAllNotaDebitoById(BancoId).then((response) => {
        console.log(response.data)
        this.nombreCuenta = nombre
        console.log(nombre)
        this.postDepositos.bancoId = BancoId
        this.DepositoList = response.data.data
      })
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
