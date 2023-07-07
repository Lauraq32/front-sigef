<template>
  <h3 class="text-center">Catalogo de Funciones</h3>
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            showModalCatalogoFuncion = true
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
    footer="footerItem"
    header
    :items="catalogoFunciones"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'status', state: 'asc' }"
    pagination
  >
    <template #grupo="{ item }">
      <td class="text-center">
        {{ item.grupo }}
      </td>
    </template>
    <template #funcion="{ item }">
      <td class="text-center">
        {{ item.funcion }}
      </td>
    </template>
    <template #sGrupo="{ item }">
      <td class="text-center">
        {{ item.sGrupo }}
      </td>
    </template>
    <template #show_details="{ item }">
      <td>
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline"
            >Acciones</CDropdownToggle
          >
          <CDropdownMenu>
            <CDropdownItem @click="() => handlerAccion(item)"
              >Eliminar</CDropdownItem
            >
            <CDropdownItem @click="() => handlerAccion(item)"
              >Editar</CDropdownItem
            >
          </CDropdownMenu>
        </CDropdown>
      </td>
    </template>
  </CSmartTable>

  <ModalCatalogoFunciones
    :showModal="showModalCatalogoFuncion"
    @close-modal="closeCatalogoFuncion"
  />
</template>

<script>
import Api from '../services/EjecucionServices'
import { CSmartTable } from '@coreui/vue-pro'
import ModalCatalogoFunciones from './Dialogos/CatalogoDeFuncionesModal.vue'
export default {
  name: 'catalogoDeFunciones',
  components: {
    CSmartTable,
    ModalCatalogoFunciones,
  },
  data: () => {
    return {
      showModalCatalogoFuncion: false,
      catalogoFunciones: [],
      columns: [
        {
          label: 'Finalidad',
          key: 'grupo',
          _style: { width: '19%' },
        },
        {
          label: 'Función',
          key: 'funcion',
          _style: { width: '20%' },
        },
        {
          label: 'Sub-Función',
          key: 'sGrupo',
          _style: { width: '20%' },
        },
        {
          label: 'Denominación',
          key: 'detalle',
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
    }
  },

  methods: {
    getCatalogoFunciones() {
      Api.getCatalogoFunciones().then((response) => {
        this.catalogoFunciones = response.data.data
      })
    },

    closeCatalogoFuncion() {
      this.showModalCatalogoFuncion = false
    },
  },

  mounted() {
    this.getCatalogoFunciones()
  },
}
</script>
