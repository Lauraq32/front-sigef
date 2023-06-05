<template>
  <h3 class="text-center mb-3">Inventario de &uacute;tiles</h3>

  <div class="table-headers">
    <CButton
        color="info"
        @click="() => { showModalUtilsLaboral() }"
    >
      Agregar
    </CButton>
  </div>

  <CSmartTable
    class="sticky-tops"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    :footer="footerItem"
    header
    :items="utilLaboralList"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'descripcion', state: 'asc' }"
    pagination
  >
    <template #fecha="{ item }">
      <td>
        {{ formatDate(item.fecha) }}
      </td>
    </template>

    <template #cantidad="{ item }">
      <td class="text-end">
        {{ formatNumber(item.cantidad) }}
      </td>
    </template>

    <template #controllers="{ item }">
      <td>
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline">
            Acciones
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              @click="() => { showModalUtilsLaboral(item) }"
            >
              Modificar
            </CDropdownItem>
            <CDropdownItem
              @click="() => { showModalEvento(item) }"
            >
              Agregar Movimientos
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </td>
    </template>
  </CSmartTable>

  <UtilesLaboralesDialog
    :showModal="showUtilLaboralModal"
    :utilLaboralSelected="utilSeleccionado"
    @closeModal="closeModal"
    @saveUtilesLaborales="saveUtilesLaborales"
  />

  <EventoInventarioDialog
    :utilLaboralSelected="utilSeleccionado"
    :utils="utilLaboralMappedList"
    :showModal="showEventDialog"
    :empleados="empleados"
    @closeModal="closeModal"
    @saveEvents="saveEventos"
  />
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { CModal } from '@coreui/vue'
import Api from '../services/RegistroPersonalServices'
import UtilesLaboralesDialog from './Dialogos/UtilesLaboralesDialogs.vue'
import EventoInventarioDialog from './Dialogos/EventosInventarioDialogs.vue'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import { formatNumber, formatDate } from '@/utils/format'

export default {
  components: {
    CSmartTable,
    CModal,
    UtilesLaboralesDialog,
    EventoInventarioDialog,
  },
  data: () => {
    return {
      formatDate,
      formatNumber,
      empleados: [],
      utils: [],
      utilSeleccionado: {},
      utilLaboralList: [],
      validatedCustom01: null,
      showAddUtilLaboralDialog: false,
      showUtilLaboralModal: false,
      showAddUtilLaboralDialog: false,
      showEventDialog: false,
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 5,
            style: 'font-weight:bold;',
          },
        },
      ],
      columns: [
        { key: 'id', label: 'Código', _style: { width: '10%' } },
        { key: 'descripcion', label: 'Descripción', _style: { width: '35%' } },
        { key: 'tipo', label: 'Tipo', _style: { width: '20%' } },
        { key: 'cantidad', label: 'Cantidad', _style: { width: '15%' } },
        {
          key: 'controllers',
          label: '',
          _style: { width: '10%' },
          filter: false,
          sorter: false,
        }
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    getUtilesLaborales() {
      Api.getUtilesLaborales().then((response) => {
        this.utilLaboralList = response.data.data;
        this.footerItem[0].label = `Total items: ${this.utilLaboralList.length}`;
      })
    },

    closeModal() {
      this.showUtilLaboralModal = false;
      this.showEventDialog = false;
    },

    showModalEvento(item) {
      this.showEventDialog = true;
      this.utilSeleccionado = item;
    },

    showModalUtilsLaboral(item) {
      this.utilSeleccionado = (item && item) || ({
        fecha: new Date(),
        observacion: null,
        autorizadoPor: null,
        tipo: 'deducible',
        cantidad: 1,
        descripción: null,
      });
      this.showUtilLaboralModal = true;
    },

    saveUtilesLaborales(payload) {
      if (payload.id) {
        Api.putUtilLaboral(payload.id, payload)
        .then((response) => {
          this.show({
            content: response.data,
            closable: true,
          });
          this.showUtilLaboralModal = false;
          setTimeout(this.getUtilesLaborales, 200);
        })
        .catch((error) => {
          this.show({
            content: error.response.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          });
        });
        return;
      }

      Api.postUtilLaboral(payload)
        .then((response) => {
          this.show({
            content: response.data,
            closable: true,
          });
          this.showUtilLaboralModal = false;
          setTimeout(this.getUtilesLaborales, 200);
        })
        .catch((error) => {
          this.show({
            content: error.response.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        });
    },

    saveEventos(payload) {
      Api.postEventos(payload.utilId, payload)
        .then(() => {
          setTimeout(this.getInventario, 500)
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
          this.showEventDialog = false
        })
        .catch((error) => {
          this.show({
            content: error.data,
            closable: true,
            color: 'danger',
            class: 'text-white',
          })
        })
    },


    getEmpleados() {
      Api.getAllEmpleado().then(({ data: { data } }) => {
        this.empleados = data.map((elem) => ({
          code: elem.id,
          label: `(${elem.codigo})  ${elem.nombres}  `,
        }))
        this.empleados.unshift({
          code: '',
          label: 'Seleccionar',
        })
      })
    },

    getUtilInventario(item) {
      Api.getInventarioById(item.id).then(({ data: { data } }) => {
        this.utilLaboralList = data
        this.utils = data.map((elem) => ({
          code: elem.id,
          label: `(${elem.id})  ${elem.descripcion}  `,
          cantidad: elem.cantidad,
        }))
      })
    },

    getUtilesInventario(item) {
      Api.getInventarioById(item).then(({ data: { data } }) => {
        this.utilLaboralList = data
      })
    },
  },
  computed: {
    utilLaboralMappedList() {
      return this.utilLaboralList.map(u => ({
        code: u.id.toString(),
        label: u.descripcion,
        cantidad: u.cantidad
      }))
    }
  },
  mounted() {
    this.getUtilesLaborales()
    this.getEmpleados()
  },
}
</script>
