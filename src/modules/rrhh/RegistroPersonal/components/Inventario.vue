<template>
  <h3 class="text-center mb-3">Inventario</h3>

  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            showInventario = true
          }
        "
        >Agregar</CButton
      >
    </div>
  </div>

  <CSmartTable
    class="sticky-top"
    clickableRows
    :tableProps="{
      striped: true,
      hover: true,
    }"
    :tableHeadProps="{}"
    :activePage="1"
    :footer="footerItem"
    header
    :items="inventario"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'descripcion', state: 'asc' }"
    pagination
  >
    <template #cantidad="{ item }">
      <td class="text-end">
        {{ formatNumber(item.cantidad) }}
      </td>
    </template>

    <template #show_details="{ item }">
      <CDropdown>
        <CDropdownToggle color="primary" variant="outline"
          >Acciones</CDropdownToggle
        >
        <CDropdownMenu>
          <CDropdownItem
            @click="
              () => {
                showModalUtilsLaboral(item)
                inventarioById = item
              }
            "
            >Agregar Útiles</CDropdownItem
          >
          <CDropdownItem
            @click="
              () => {
                showModalEvento(item)
                getUtilInventario(item)
              }
            "
            >Agregar Movimientos</CDropdownItem
          >
        </CDropdownMenu>
      </CDropdown>
    </template>
  </CSmartTable>

  <InventarioDialog
    :showModal="showInventario"
    @closeModal="closeModal"
    @saveInventario="saveInventario"
  />

  <UtilesLaboralesDialog
    :showModal="showAgregarCantidad"
    :inventario="inventarioById"
    @closeModal="closeModal"
    @saveUtilesLaborales="saveUtilesLaborales"
  />

  <EventoInventarioDialog
    :showModal="showEvento"
    :empleados="empleados"
    :utils="utils"
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
import InventarioDialog from './Dialogos/InventarioDialogs.vue'
import { useToastStore } from '@/store/toast'
import { mapActions } from 'pinia'
import { formatNumber } from '@/utils/format'

export default {
  components: {
    CSmartTable,
    CModal,
    UtilesLaboralesDialog,
    EventoInventarioDialog,
    InventarioDialog,
  },
  data: () => {
    return {
      formatNumber,
      empleados: [],
      inventario: [],
      utils: [],
      inventarioById: {},
      validatedCustom01: null,
      showInventario: false,
      showAgregarCantidad: false,
      showInventario: false,
      showEvento: false,

      columns: [
        { key: 'descripcion', label: 'Descripción', _style: { width: '70%' } },
        { key: 'tipo', label: 'Tipo', _style: { width: '20%' } },
        { key: 'cantidad', label: 'Existencia', _style: { width: '5%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '5%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },
      ],
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),
    getInventario() {
      Api.getAllInventario().then((response) => {
        this.inventario = response.data.data
      })
    },

    closeModal(close) {
      this.showAgregarCantidad = close
      this.showEvento = close
      this.showInventario = close
    },

    showModalEvento(item) {
      this.showEvento = true
      this.id = item.id
    },

    showModalUtilsLaboral(item) {
      this.showAgregarCantidad = true
      this.id = item.id
    },

    saveUtilesLaborales(payload) {
      Api.postInventarioById(this.id, payload)
        .then((response) => {
          setTimeout(this.getInventario, 500)
          this.show({
            content: response.data,
            closable: true,
          })
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

    saveEventos(payload) {
      Api.postEventos(this.id, payload)
        .then(() => {
          this.show({
            content: 'Registro añadido correctamente',
            closable: true,
          })
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

    

    saveInventario(payload) {
      Api.postInventario(payload)
        .then(() => {
          setTimeout(this.getInventario, 500)
          this.show({
            content: 'Registro Agregado',
            closable: true,
            time: 30000,
          })
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
          label: `(${elem.codigo})  ${elem.nombres}`,
        }))
        this.empleados.unshift({
          code: 0,
          label: 'Seleccionar',
        })
      })
    },

    getUtilInventario(item) {
      Api.getInventarioById(item.id).then(({ data: { data } }) => {
        this.utils = data.map((elem) => ({
          code: elem.id,
          label: `(${elem.id})  ${elem.descripcion}`,
        }))
        this.utils.unshift({
          code: 0,
          label: 'Seleccionar',
        })
      })
    },
  },
  mounted() {
    this.getInventario()
    this.getEmpleados()
  },
}
</script>
