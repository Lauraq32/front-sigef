<template>
  <h3 class="text-center">Cuentas de banco</h3>
  <hr />
  <CuentasDebancoTable
    :columns="columns"
    :footerItems="footerItem"
    :items="Bancos"
    :showButtons="false"
  />
</template>
<script>
import CuentasDebancoTable from '../../ConciliacionBancaria/components/CuentasDebancoTable.vue'
import Api from '../../ConciliacionBancaria/services/ConciliacionServices'
import { mapActions } from 'pinia'
import { useToastStore } from '@/store/toast'
export default {
  components: {
    CuentasDebancoTable,
  },
  data: function () {
    return {
      Bancos: [],
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
      ],
      details: [],
    }
  },
  methods: {
    ...mapActions(useToastStore, ['show']),

    getAllBancos() {
      Api.getAllCuentaBanco().then((response) => {
        this.Bancos = response.data.data
      })
    },
  },
  mounted() {
    this.getAllBancos()
  },
}
</script>
