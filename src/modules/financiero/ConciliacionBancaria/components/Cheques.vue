<template>


  <CSmartTable class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    footer
    header
    :items="ChequeList"
    :columns="columns"
    itemsPerPageSelect
    :itemsPerPage="5"
    columnFilter
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #fecha="{ item }">
      <td>
        {{ formatDate(item.fecha) }}
      </td>
    </template>
    <template #fechaEstatus="{ item }">
      <td>
        {{ formatDate(item.fechaEstatus) }}
      </td>
    </template>
    <template #fechaEntrega="{ item }">
      <td>
        {{ formatDate(item.fechaEntrega) }}
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
      detalle: '',
      Bancos: [],
      ChequeList: [],
      postCheque: {
        ayuntamientoId: this.$ayuntamientoId,
        bancoId: null,
        secuencial: 1,
        documento: '',
        fecha: new Date(Date.now()),
        auxiliar: '',
        valor: 0,
        estatus: '',
        noFisico: 0,
        detalle: '',
        impreso: false,
        comprobate: 0,
        estatus: '',
        fechaEstatus: new Date(Date.now()),
        usuarioEstatusId: 1,
        fechaEntrega: new Date(Date.now()),
        usuarioEntregaId: 1,
      },
      columns: [
        { key: 'secuencial', label: '#Cheque', _style: { width: '8%' } },
        { key: 'fecha', label: 'Fecha', _style: { width: '8%' } },
        { key: 'noFisico', label: 'No. Fisico', _style: { width: '8%' } },
        { key: 'auxiliar', label: 'Beneficiario', _style: { width: '8%' } },
        { key: 'valor', label: 'Valor', _style: { width: '40%' } },
        { key: 'comprobate', label: 'Comprobante', _style: { width: '8%' } },
        { key: 'estatus', label: 'Estatus', _style: { width: '8%' } },
        {
          key: 'fechaEstatus',
          label: 'Pagado/Anulado/Cancelado Fecha',
          _style: { width: '8%' },
        },
        { key: 'usuarioEstatusId', label: 'Usuario', _style: { width: '8%' } },
        {
          key: 'fechaEntrega',
          label: 'Entregado Fecha',
          _style: { width: '8%' },
        },
        {
          key: 'usuarioEntregaId',
          label: 'Usuario Fecha',
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
    clearModal1() {
      this.postCheque = {
        ayuntamientoId: this.$ayuntamientoId,
        bancoId: null,
        secuencial: 1,
        documento: '',
        fecha: new Date(Date.now()),
        auxiliar: '',
        valor: 0,
        estatus: '',
        noFisico: 0,
        detalle: '',
        impreso: false,
        comprobate: 0,
        estatus: '',
        fechaEstatus: new Date(Date.now()),
        usuarioEstatusId: 1,
        fechaEntrega: new Date(Date.now()),
        usuarioEntregaId: 1,
      }
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
    // getAllDeposito() {
    //   Api.getAllDepositos().then((response) => {
    //     this.DepositoList = response.data.data
    //   })
    // },
    Guardar() {
      Api.postCheque(this.postCheque)
        .then((response) => {
          console.log(response)
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
    getAllBancos() {
      Api.getAllCuentaBanco().then((response) => {
        this.Bancos = response.data.data
      })
    },
    getSelectCuenta(BancoId, nombre) {
      Api.getAllChequeById(BancoId).then((response) => {
        console.log(response.data)
        this.nombreCuenta = nombre
        console.log(nombre)
        this.postCheque.bancoId = BancoId
        this.ChequeList = response.data.data
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
    // this.getAllDeposito()
    this.getAllBancos()
  },
}
</script>
