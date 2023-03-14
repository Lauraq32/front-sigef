<template>
  <h3 class="text-center">Clasificadores</h3>
  <div class="table-headers">
    <div class="p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReportClsIng">Imprimir Clasificadores de Ingresos
      </CButton>
    </div>
    <div class="p-2">
      <CButton style="font-weight: bold" color="info" @click="IngresoReportClsGas">Imprimir Clasificadores de Gastos
      </CButton>
    </div>
  </div>
  <CSmartTable clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" header :items="items"
    :columns="columns" columnFilter itemsPerPageSelect :itemsPerPage="5"
    :items-per-page-options="[5, 10, 20, 50, 100, 150]" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>
    <template #status="{ item }">
      <td>
        <CBadge :color="getBadge(item.status)">{{ item.status }}</CBadge>
      </td>
    </template>
    <template #cControl="{ item }">
      <td >
        {{item.cControl}}
      </td>
    </template>
    <template #cuentaContag="{ item }">
      <td class="text-center">
        {{item.cuentaContag.padEnd(14,0)}}
      </td>
    </template>
    <template #ctgFuenteId="{ item }">
      <td class="text-center">
        {{item.ctgFuenteId}}
      </td>
    </template>
    <template #clasifica="{ item }">
      <td >
        {{item.clasifica}}
      </td>
    </template>
  
    <template #ctgFuenteEspecificaId="{ item }">
      <td class="text-center">
        {{item.ctgFuenteEspecificaId}}
      </td>
    </template>
    <template #ctgOrganismoFinanciadorId="{ item }">
      <td class="text-center">
     {{item.ctgOrganismoFinanciadorId}}
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td class="py-2">
        <CButton color="primary" variant="outline" square size="sm" @click="toggleDetails(item, index)">
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
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import Api from '../services/FormulacionServices'
export default {
  components: {
    CSmartTable,
  },
  data: () => {
    return {
      columns: [
        { key: 'cControl', label: 'Cuenta' },
        { key: 'clasifica', label: 'Clasificador' },
        { key: 'cuentaContag', label: 'Cuenta contable' },
   

        { key: 'nombre', label: 'Detalle', _style: { width: '25%' } },
        { key: 'ctgFuenteId', label: 'Fuente',_style:{textAling:'center'}},
        { key: 'ctgFuenteEspecificaId', label: 'Fuente especifica' },
        // { key: 'nombre', label: 'Nombre' },
        // { key: 'identificadorornfin', label:'Nombre' },
        // { key: 'nombrefUENTE', label: 'Nombre Fuente' },
        // { key: 'nombrefuenteespecifica', label: 'Nombre Fuente especifica' },
        { key: 'ctgOrganismoFinanciadorId', label: 'Organismo Financiero' },
        {
          key: 'tipo',
          label: 'Tipo',
          filter: false,
          sorter: false,
          _style: { width: '5%' },
        },
        //{ key: 'ctA_GASTOS', _style: { width: '20%'} },
      
      ],
      details: [],
      items: [],
      filter: [{
        key: 'ccontrol', _style: { color: 'success' }
      }]
    }
  },
  methods: {
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
    IngresoReportClsIng() {
      window
        .open(
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fReporte_FP%2fRep_Clasificadores_Ingreso&rs:Command=Render`,
          '_blank',
        )
        .focus()
    },
    IngresoReportClsGas() {
      window
        .open(
          `http://server-iis/ReportServer/Pages/ReportViewer.aspx?%2fReporte_FP%2fRep_Clasificadores_Gasto&rs:Command=Render`,
          '_blank',
        )
        .focus()
    },
    toggleDetails(item) {
      if (this.details.includes(item._id)) {
        this.details = this.details.filter((_item) => _item !== item._id)
        return
      }
      this.details.push(item._id)
    },
  },
  computed: {},
  mounted() {
  Api.getListarClasificadores().then(response => {
    this.items = response.data.data
    console.log(this.items)
  })
    //this.$store.dispatch('Formulacion/getClasificadores');
  },
}
</script>
