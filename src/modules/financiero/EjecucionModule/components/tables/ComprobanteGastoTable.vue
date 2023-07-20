<template>
    <CSmartTable class="sticky-top" clickableRows :tableProps="{
      striped: true,
      hover: true,
    }" :tableHeadProps="{}" :activePage="1" header :items="tableData" :columns="tableColumns" columnFilter
      :footer="footer" itemsPerPageSelect :itemsPerPage="5" columnSorter :sorterValue="{ column: 'nombres', state: 'asc' }"
      pagination>
      <template #show_details="{ item, index }">
        <td>
          <CDropdown>
            <CDropdownToggle color="primary" variant="outline">Acciones</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem v-for="action in actions" @click="action.clickHandler && action.clickHandler(item)">{{ action.label }}</CDropdownItem>
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
    name: 'ComprobanteGastoTable',
    components: {
      CSmartTable,
  
    },
    data: () => {
      return {
        formatDate
      }
    },
  
    props: {
      tableData: [],
      tableColumns: [],
      footer: [],
      actions: [],
    }
  
  }
  </script>
  
    