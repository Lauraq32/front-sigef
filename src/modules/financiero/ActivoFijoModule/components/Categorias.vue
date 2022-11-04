<template>
  <h3 class="text-center">Categorias</h3>
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
    :items="categoria"
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
          <CButton size="sm" color="info" class=""> User Settings </CButton>
          <CButton size="sm" color="danger" class="ml-1"> Delete </CButton>
        </CCardBody>
      </CCollapse>
    </template>
  </CSmartTable>
</template>

<script>
import { useRegistroStore } from '../store/ActivoFijo/Categorias'
import { computed, onMounted } from '@vue/runtime-core'
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'

export default {
  components: {
    CSmartTable,
    CModal,
  },

  setup() {
    onMounted(() => {
      console.log('klk')
      getCategoria()
    }),
      function toggleDetails(item) {
        if (this.details.includes(item._id)) {
          this.details = this.details.filter((_item) => _item !== item._id)
          return
        }
        this.details.push(item._id)
      }
    const columns = [
      { key: 'Codigo', label: 'Codigo' },
      { key: 'Descripcion', label: 'Descripcion' },
      { key: 'Cuenta Gasto', label: 'Cuenta Gasto' },
      { key: 'Monto', label: 'Monto' },
      { key: 'Acumulado', label: 'Acumulado' },
      { key: 'Corto', label: 'Corto', _style: { width: '20%' } },
      { key: 'Despreciable', label: 'Despreciable' },
      {
        key: 'show_details',
        label: '',
        _style: { width: '1%' },
        filter: false,
        sorter: false,
        // _props: { color: 'primary', class: 'fw-semibold'}
      },
    ]

    function handleSubmitCustom01(event) {
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
      }
      this.validatedCustom01 = true
    }

    function getBadge(status) {
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

    const validatedCustom01 = null
    const lgDemo = false

    const store = useRegistroStore()

    const { getCategoria, categorias } = store

    return {
      store,
      getCategoria,
      categorias,
      validatedCustom01,
      handleSubmitCustom01,
      lgDemo,
      getBadge,
      columns,
      categoria: computed(() => store.categorias),
    }
  },
}
</script>

<!-- <script>
import { CSmartTable } from '@coreui/vue-pro'
export default {
  components: {
    CSmartTable,
  },
  data: () => {
    return {
      columns: [
        { key: 'Codigo', label: 'Codigo' },
        { key: 'Descripcion', label: 'Descripcion' },
        { key: 'Cuenta Gasto', label: 'Cuenta Gasto' },
        { key: 'Monto', label: 'Monto' },
        { key: 'Acumulado', label: 'Acumulado' },
        { key: 'Corto', label: 'Corto', _style: { width: '20%' } },
        { key: 'Despreciable', label: 'Despreciable' },
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
      items: [],
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
    //this.$store.dispatch('Formulacion/getClasificadores');
  },
}
</script> -->
