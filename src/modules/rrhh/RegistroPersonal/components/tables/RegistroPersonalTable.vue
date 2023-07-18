<template>
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
    :items="tableData"
    :columns="tableColumns"
    columnFilter
    :footer="footer"
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'nombres', state: 'asc' }"
    pagination
  >
    <template #sexo="{ item }">
      <td>
        {{ item.sexo == 'M' ? 'Masculino' : 'Femenino' }}
      </td>
    </template>
    <template #posicion="{ item }">
      <td>
        {{ item.posicion.nombre }}
      </td>
    </template>
    <template #departamenteName="{ item }">
      <td>
        {{ item.departamento.nombre }}
      </td>
    </template>

    <template #fechaIngreso="{ item }">
      <td>
        {{ formatDate(item.fechaIngreso) }}
      </td>
    </template>
    <template #fechaNacimiento="{ item }">
      <td>
        {{ formatDate(item.fechaNacimiento) }}
      </td>
    </template>
    <template #estado="{ item }">
      <td :colspan="item.estatus ? 1 : 2">
        <CBadge class="text-uppercase" :color="determineColor(item.estado)">{{
          item.estado
        }}</CBadge>
      </td>
    </template>

    <template #formaPago="{ item }">
      <td>
        {{ item.formaPago }}
      </td>
    </template>

    <template #show_details="{ item }">
      <td v-if="item.estatus">
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline"
            >Acciones</CDropdownToggle
          >
          <CDropdownMenu>
            <CDropdownItem
              v-for="action in actions"
              @click="action.clickHandler && action.clickHandler(item)"
              >{{ action.label }}</CDropdownItem
            >
          </CDropdownMenu>
        </CDropdown>
      </td>
      <td v-else>
        <CButton
          class="btn btn-outline-success"
          v-for="action in inactivoActions"
          @click="action.clickHandler && action.clickHandler(item)"
          >{{ action.label }}
        </CButton>
      </td>
    </template>
  </CSmartTable>
</template>
<script>
import { CSmartTable } from '@coreui/vue-pro'
import { formatDate } from '@/utils/format'

export default {
  name: 'RegistroPersonalTable',
  components: {
    CSmartTable,
  },
  data: () => {
    return {
      formatDate,
    }
  },

  methods: {
    determineColor(badgeText) {
      if (/inactivo/i.test(badgeText)) {
        return 'danger'
      }
      if (/activo/i.test(badgeText)) {
        return 'success'
      }

      return 'warning'
    },
  },

  props: {
    tableData: Array,
    tableColumns: Array,
    footer: Array,
    actions: Array,
    inactivoActions: Array,
  },
}
</script>
