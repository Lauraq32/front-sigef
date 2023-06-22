<template>
  <h3 class="text-center">N&oacute;mina General</h3>
  <NominaSelectFiscalYear @sendDataFilter="filterByDate">
    <CButton style="font-weight: bold" color="info" @click=""
      >Imprimir Todos</CButton
    >
    <CButton
      style="font-weight: bold"
      class="ml-5"
      color="info"
      @click="() => (showModal = true)"
      >Generar N&oacute;mina</CButton
    >
  </NominaSelectFiscalYear>
  <div>
    <CSmartTable
      class="sticky-top"
      clickableRows
      :tableProps="{
        striped: true,
        hover: true,
      }"
      :tableHeadProps="{}"
      :activePage="1"
      header
      :items="dataNominaGeneral"
      :columns="tableNominaGeneral"
      columnFilter
      itemsPerPageSelect
      :itemsPerPage="5"
      columnSorter
      :sorterValue="{ column: 'status', state: 'asc' }"
      pagination
    >
      <template #posicion="{ item }">
        <td>
          {{ item.posicion?.descripcion }}
        </td>
      </template>

      <template #estatus="{ item }">
        <td>
          <CBadge :color="item.estatus ? 'success' : 'danger'">{{
            item.estatus ? 'ABIERTO' : 'CERRADO'
          }}</CBadge>
        </td>
      </template>
      <template #departamento="{ item }">
        <td>
          {{ item.departamento?.descripcion }}
        </td>
      </template>
      <template #programaDivision="{ item }">
        <td>
          {{ item.programaDivision?.descripcion }}
        </td>
      </template>
      <template #fecha="{ item }">
        <td>
          {{ formatDate(item.fecha) }}
        </td>
      </template>
      <template #show_details="{ item }">
        <td>
          <CDropdown>
            <CDropdownToggle color="primary" variant="outline"
              >Acciones</CDropdownToggle
            >
            <CDropdownMenu>
              <CDropdownItem
                v-for="action in buttonActions"
                @click="action.clickHandler && action.clickHandler(item)"
                >{{ action.label }}</CDropdownItem
              >
            </CDropdownMenu>
          </CDropdown>
        </td>
      </template>
    </CSmartTable>
  </div>
  <ModalGenerarNomina
    :modalGenerarNomina="showModal"
    @changeValueModal="getCloseModalValue"
  ></ModalGenerarNomina>
</template>
<script>
import { useAuthStore } from '@/store/AuthStore'
import { CSmartTable } from '@coreui/vue-pro'
import { mapState } from 'pinia'
import NominaSelectFiscalYear from '../components/NominaSelectFiscalYear.vue'
import ModalGenerarNomina from '../components/dialogos/ModalGenerarNomina.vue'
import ApiNomina from '../services/NominaServices'
import { formatDate } from '@/utils/format'

export default {
  components: {
    CSmartTable,
    NominaSelectFiscalYear,
    ModalGenerarNomina,
  },
  mounted() {
    this.filterByDate({})
  },
  setup() {},
  computed: {
    ...mapState(useAuthStore, ['authInfo']),
  },
  methods: {
    filterByDate(value) {
      ApiNomina.getNominasGeneral(value).then((response) => {
        this.dataNominaGeneral = response.data.data
      })
    },
    getCloseModalValue(value) {
      this.showModal = value
    },
  },
  data: function () {
    return {
      formatDate,
      showModal: false,
      dataNominaGeneral: [],
      tableNominaGeneral: [
        {
          key: 'fecha',
          label: 'Fecha',
          _style: { width: '8%' },
        },

        {
          key: 'departamento',
          label: 'Departamento',
          _style: { width: '10%' },
        },

        {
          key: 'programaDivision',
          label: 'Programa División',
          _style: { width: '12%' },
        },

        {
          key: 'estProgram',
          label: 'Est/Program',
          _style: { width: '10%' },
        },
        {
          key: 'clasificador',
          label: 'Clasificador',
          _style: { width: '10%' },
        },

        {
          key: 'cantidadEmpleados',
          label: 'Cantidad Empleados',
          _style: { width: '13%' },
        },
        {
          key: 'totalAPagar',
          label: 'T/Pagar',
          _style: { width: '7%' },
        },

        {
          key: 'formaPago',
          label: 'F/Pago',
          _style: { width: '10%' },
        },
        {
          key: 'comprobante',
          label: 'Comprobante',
          _style: { width: '10%' },
        },
        {
          key: 'estatus',
          label: 'Estatus',
          _style: { width: '9%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          sorter: false,
          filter: false,
        },
      ],

      buttonActions: [
        {
          label: 'Eliminar',
          clickHandler: (value) => {
            this.toggleDetails(value)
          },
        },

        {
          label: 'Confirmar',
          clickHandler: (value) => {
            this.toggleDetails(value)
          },
        },

        {
          label: 'Detalle',
          clickHandler: (value) => {
            this.toggleDetails(value)
          },
        },

        {
          label: 'Imprimir',
          clickHandler: (value) => {
            this.toggleDetails(value)
          },
        },
      ],
    }
  },
}
</script>
