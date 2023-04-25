<template>
  <CSmartTable class="sticky-top" clickableRows :tableProps="{
    striped: true,
    hover: true,
  }" :tableHeadProps="{}" :activePage="1" header :items="tableData" :columns="tablecolumns" columnFilter
    :footer="footer" itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'status', state: 'asc' }"
    pagination>
    <template #sexo="{ item, index }">
      <td>
        {{ item.sexo == 'M' ? 'Masculino' : 'Femenino' }}
      </td>
    </template>
    <template #posicion="{ item, index }">
      <td>
        {{ item.posicion.nombre }}
      </td>
    </template>
    <template #programaDivision="{ item, index }">
      <td>
        {{ item.programaDivision.nombre }}
      </td>
    </template>

    <template #fechaIngreso="{ item, index }">
      <td>
        {{ formatDate(item.fechaIngreso) }}
      </td>
    </template>
    <template #fechaNacimiento="{ item, index }">
      <td>
        {{ formatDate(item.fechaNacimiento) }}
      </td>
    </template>

    <template #formaPago="{ item, index }">
      <td>
        {{ item.formaPago }}
      </td>
    </template>
    <template #show_details="{ item, index }">
      <td>
        <CDropdown>
          <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem v-for="action in actions" @click="action.IsFunction(item)">{{ action.label }}</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
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
      formatDate
    }

  },
  watch: {

  },
  methods: {

  },
  props: {
    tableData: [],
    tablecolumns: [],
    footer: [],
    actions: [],
  }

}
</script>

  