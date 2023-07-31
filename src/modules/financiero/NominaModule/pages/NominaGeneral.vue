<template>
  <h3 class="text-center">N&oacute;mina General</h3>
  <NominaSelectFiscalYear @sendDataFilter="filterByDate">
    <CButton style="font-weight: bold" color="info" @click="">Imprimir Todos</CButton>
    <CButton style="font-weight: bold" class="ml-5" color="info" @click="() => showModal = true">Generar N&oacute;mina
    </CButton>
  </NominaSelectFiscalYear>
  <div>
    <CSmartTable class="sticky-top" clickableRows :tableProps="{
      striped: true,
      hover: true,

    }" :tableHeadProps="{}" :activePage="1" header :items="dataNominaGeneral" :columns="tableNominaGeneral"
      columnFilter itemsPerPageSelect :itemsPerPage="5" columnSorter :footer="footerItem"
      :sorterValue="{ column: 'status', state: 'asc' }" pagination>
      <template #estatus="{ item }">
        <td>
          <CBadge class="text-uppercase" :color="item.estatus === 'ABIERTA' ? 'success' : 'danger'">{{
            item.estatus
          }}</CBadge>
        </td>
      </template>
      <template #totalNeto="{ item }">
        <td class="text-center">
          {{ formatPrice(item.totalNeto) }}
        </td>
      </template>
      <template #totalBruto="{ item }">
        <td class="text-center">
          {{ formatPrice(item.totalBruto) }}
        </td>
      </template>
      <template #posicion="{ item }">
        <td>
          {{ item.posicion?.nombre }}
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
            <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem v-for="action in actionsTable" @click="action.clickHandler && action.clickHandler(item)">{{
                action.label }}</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </td>
      </template>
    </CSmartTable>
  </div>
  <ModalGenerarNomina :modalGenerarNomina="showModal" @changeValueModal="getCloseModalValue"
    @update="() => filterByDate({})" />
  <ModalconfirmNomina :showModal="showConfirmModal" :payload="dataNomina" @close-modal="closeModalConfirmNomina" />
</template>
<script>
import { useAuthStore } from '@/store/AuthStore';
import { CSmartTable } from '@coreui/vue-pro'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import { mapState } from 'pinia';
import NominaSelectFiscalYear from '../components/NominaSelectFiscalYear.vue';
import ModalGenerarNomina from '../components/modal/ModalGenerarNomina.vue';
import ApiNomina from '../services/NominaServices';
import { formatDate, formatPrice } from '@/utils/format';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import ModalconfirmNomina from '../components/dialogos/ModalConfirmNomina.vue'


export default {
  components: {
    CSmartTable,
    NominaSelectFiscalYear,
    ModalGenerarNomina,
    ModalconfirmNomina
  },
  mounted() {
    this.filterByDate({});
  },
  setup() {
  },
  computed: {
    ...mapState(useAuthStore, ['authInfo']),
  },
  methods: {
    ...mapActions(useToastStore, ['show']),
    filterByDate(value) {
      ApiNomina.getNominasGeneral(value).then((response) => {
        this.dataNominaGeneral = response.data.data;
        this.footerItem[0].label = `Total Items: ${response.data.data.length}`
        this.footerItem[1].label = formatPrice(response.data.data.reduce((total, item) => total + item.totalBruto, 0))
        this.footerItem[2].label = formatPrice(response.data.data.reduce((total, item) => total + item.totalNeto, 0))
      })
    },
    getCloseModalValue(value) {
      this.showModal = value;
    },

    closeModalConfirmNomina() {
      this.showConfirmModal = false
    }

  },
  data: function () {
    return {
      showModal: false,
      showConfirmModal: false,
      dataNomina: {},
      dataNominaGeneral: [],
      tableNominaGeneral: [
        {
          key: 'fecha',
          label: 'Fecha',
          _style: { width: '10%' }
        },
        {
          key: 'departamento',
          label: 'Departamento',
          _style: { width: '15%' },
        },
        {
          key: 'programaDivision',
          label: 'Programa División',
          _style: { width: '15%' },
        },

        {
          key: 'estProgram',
          label: 'Est/Program',
          _style: { width: '10%' },
        },
        {
          key: 'clasificador',
          label: 'Clasificador',
          _style: { width: '4%' },
        },

        {
          key: 'cantidadEmpleados',
          label: 'Cantidad Empleados',
          _style: { width: '5%' },
        },
        {
          key: 'totalBruto',
          label: 'T/Bruto',
          _style: { width: '10%' },
        },
        {
          key: 'totalNeto',
          label: 'T/Pagar',
          _style: { width: '10%' },
        },

        {
          key: 'formaPago',
          label: 'F/Pago',
          _style: { width: '5%' },
        },
        {
          key: 'comprobante',
          label: 'Comprobante',
          _style: { width: '5%' }
        },
        {
          key: 'estatus',
          label: 'Estado',
          _style: { width: '10%' }
        },

        {
          key: 'show_details',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
      formatDate,
      formatPrice,
      actionsTable:
        [
          {
            label: 'Eliminar',
            clickHandler: (value) => {
            },
          },
          {
            label: 'Confirmar',
            clickHandler: (item) => {
              this.dataNomina = item
              this.showConfirmModal = true
            },
          },
          {
            label: 'Detalle e imprimir',
            clickHandler: (value) => {
            },
          },
        ],

      footerItem: [
        {
          label: 'Total items',
          _props: {
            colspan: 3,
            style: 'font-weight:bold;',
          },
        },
        {
          label: '',
          _props: {
            colspan: 4,
            style: 'font-weight:bold; text-align:right',
          },
        },
        {
          label: '',
          _props: {
            colspan: 1,
            style: 'font-weight:bold; text-align:right',
          },
        },
        {
          label: '',
          _props: {
            colspan: 3,
            style: 'font-weight:bold; text-align:right',
          },
        },
      ],
    }
  }
}
</script>
