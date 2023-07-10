<template>
  <h3 class="text-center">Catalogo de Funciones</h3>

  <CSmartTable
    class="sticky-top mt-5"
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
</template>

<script>
import Api from '../services/EjecucionServices'
import { CSmartTable } from '@coreui/vue-pro'
export default {
  name: 'catalogoDeFunciones',
  components: {
    CSmartTable,
  },
  data: () => {
    return {
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
  },

  mounted() {
    this.getCatalogoFunciones()
  },
}
</script>
