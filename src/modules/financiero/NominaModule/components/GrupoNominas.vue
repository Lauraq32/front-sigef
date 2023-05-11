<template>
  <h3 class="text-center">Grupo nómina</h3>
  <div class="table-headers">
    <div class="d-inline p-2">
      <CButton
        color="info"
        @click="
          () => {
            showGrupoNomina = true
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
    :items="grupoNomina"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ state: 'asc' }"
    pagination
  >
    <template #show_details="{ item }">
      <td class="py-1">
        <CButton
          class="mt-1"
          color="primary"
          variant="outline"
          square
          size="sm"
          @click="editarGrupoNomina(item)"
        >
          Editar
        </CButton>
      </td>
    </template>
  </CSmartTable>

  <ModalGrupoNomina
    :showModal="showGrupoNomina"
    :grupoNominaId="grupoNominaId"
    @close-modal="closeGrupoNomina"
    @postGrupoNomina="guardarGrupoNomina"
    @editarGrupoNomina="editarGrupoNomina"
  />
</template>

<script>
import { useRegistroStore } from '../store/Nomina/grupoNomina'
import { CSmartTable } from '@coreui/vue-pro'
import { mapStores } from 'pinia'
import { mapState } from 'pinia'
import { mapActions } from 'pinia'
import ModalGrupoNomina from './dialogos/ModalGrupoNomina.vue'

import { useToastStore } from '@/store/toast'
import Api from '../services/NominaServices'

export default {
  components: {
    CSmartTable,
    ModalGrupoNomina,
  },

  data: function () {
    return {
      grupoNominaId: 0,
      grupoNomina: [],
      columns: [
        { key: 'id', label: 'Código', _style: { width: '20%' } },
        {
          key: 'nombre',
          label: 'Grupo Nómina',
          _style: { width: '75%' },
        },

        {
          key: 'show_details',
          label: '',
          _style: { width: '5' },
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
      showGrupoNomina: false,
    }
  },

  computed: {
    ...mapStores(useRegistroStore),
    ...mapState(useRegistroStore, ['grupoNomina']),
  },

  methods: {
    ...mapActions(useRegistroStore, ['getGNomina', 'addGrupoNomina']),
    ...mapActions(useToastStore, ['show']),

    closeGrupoNomina() {
      this.showGrupoNomina = false
    },

    guardarGrupoNomina(payload) {
      if (this.id !== null) {
        Api.putGrupoNomina(payload.id, payload).then((response) => {
          this.showGrupoNomina = false
          setTimeout(this.getGNomina, 500)
          this.show({
            content: response.data.message,
            closable: true,
            color: 'success',
          })
        })
      } else {
        Api.postGrupoNomina(payload)
          .then(() => {
            setTimeout(this.getGNomina, 500)
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
          .catch(() => {
            this.show({
              content: 'Error al enviar el formulario',
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
        setTimeout(this.getGNomina, 500)
      }
    },

    close() {
      this.showGrupoNomina = false
    },

    editarGrupoNomina(item) {
      this.showGrupoNomina = true
      this.grupoNominaId = item.id
    },
  },

  mounted() {
    Api.getGrupoNomina().then((response) => {
      this.grupoNomina = response.data.data
    })
  },
}
</script>
