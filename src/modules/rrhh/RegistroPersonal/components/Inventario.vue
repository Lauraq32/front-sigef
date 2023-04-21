<template>
  <h3 class="text-center">Inventario</h3>
  <hr />
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
  <hr />
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
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
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
import UtilesLaboralesDialog from '@/modules/rrhh/RegistroPersonal/components/Dialogos/UtilesLaboralesDialogs.vue'
import EventoInventarioDialog from '@/modules/rrhh/RegistroPersonal/components/Dialogos/EventosInventarioDialogs.vue'
import InventarioDialog from '@/modules/rrhh/RegistroPersonal/components/Dialogos/InventarioDialogs.vue'

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
        { key: 'descripcion', label: 'Descripción', _style: { width: '20%' } },
        { key: 'tipo', label: 'Tipo', _style: { width: '10%' } },
        { key: 'cantidad', label: 'Existencia', _style: { width: '5%' } },
        {
          key: 'show_details',
          label: '',
          _style: { width: '2%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            color: '',
            colspan: 1,
            style: 'font-weight:bold;',
          },
        },
      ],
    }
  },

  methods: {
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
        .then(() => {
          setTimeout(this.getInventario, 500)
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

    getEmpleados() {
      Api.getAllEmpleado().then((response) => {
        this.empleados = response.data.data
      })
    },

    getUtilInventario(item) {
      Api.getInventarioById(item.id).then((response) => {
        this.utils = response.data.data
        console.log(this.utils)
      })
    },
  },
  mounted() {
    this.getInventario()
    this.getEmpleados()
  },
}
</script>
