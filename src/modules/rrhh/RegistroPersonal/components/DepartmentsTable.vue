<style>
.swal2-actions {
  width: 50%;
  justify-content: space-evenly;
}

.swal2-actions > button {
  padding: 10px 35px;
}
</style>
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
    :footer="footerItem"
    header
    :items="deparments"
    :columns="columns"
    columnFilter
    itemsPerPageSelect
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ column: 'nombre', state: 'asc' }"
    pagination
  >
    <template #btns="{ item }">
      <td>
        <div class="d-flex gap-1">
          <CButton
            color="primary"
            variant="outline"
            size="sm"
            v-bind:disabled="!item.status"
            @click="this.$emit('OnUpdate', item)"
          >
            Modificar
          </CButton>
          <CButton
            color="danger"
            variant="outline"
            size="sm"
            v-bind:disabled="!item.status"
            @click="confirmDelete(item)"
          >
            Eliminar
          </CButton>
        </div>
      </td>
    </template>

    <template #programaDivision="{ item }">
      <td class="py-2">
        {{ item.programaDivision?.descripcion }}
      </td>
    </template>
    <template #grupoNomina="{ item }">
      <td class="py-2">
        {{ item.grupoNomina?.descripcion }}
      </td>
    </template>
    <template #clasificador="{ item }">
      <td class="py-2">
        {{ item.clasificador?.id }}
      </td>
    </template>
    <template #status="{ item }">
      <td class="py-2">
        <CBadge :color="getBadge(item.status)">
          {{ item.status ? 'Activo' : 'Inactivo' }}
        </CBadge>
      </td>
    </template>
  </CSmartTable>
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
import Swal from 'sweetalert2/dist/sweetalert2.js'

export default {
  emits: ['handleDelete', 'OnUpdate'],
  components: {
    CSmartTable,
  },
  props: {
    deparments: {
      type: Array,
      default: [],
    },
  },
  methods: {
    confirmDelete(item) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: `Estás usted seguro que quieres eliminar este departamento?`,
        showConfirmButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        customClass: 'btns',
      }).then((answer) => {
        if (answer.isConfirmed) {
          this.$emit('handleDelete', item)
        }
      })
    },
    getBadge(status) {
      return status ? 'success' : 'danger'
    },
  },
  data: () => {
    return {
      columns: [
        {
          key: 'nombre',
          label: 'Departamento',
          _style: { width: '25%' },
        },
        {
          key: 'programaDivision',
          label: 'Programa',
          _style: { width: '20%' },
        },
        {
          key: 'grupoNomina',
          label: 'Grupo Nómina',
          _style: { width: '12%' },
        },
        {
          key: 'estructura',
          label: 'Est Prog.',
          _style: { width: '12%' },
        },
        {
          key: 'clasificador',
          label: 'Clasificador',
          _style: { width: '10%' },
        },
        {
          key: 'status',
          label: 'Estado',
          _style: { width: '10%' },
        },
        { key: 'saspId', label: 'Cta. SASP', _style: { width: '10%' } },
        {
          key: 'btns',
          label: '',
          _style: { width: '1%' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 8,
            style: 'font-weight:bold;',
          },
        },
      ],
    }
  },
  beforeUpdate() {
    this.footerItem[0].label = `Total Items ${this.deparments.length}`
  },
}
</script>
