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
    :items="grupoNominas"
    :columns="columns"
    itemsPerPageSelect
    columnFilter
    :itemsPerPage="5"
    columnSorter
    :sorterValue="{ state: 'asc' }"
    pagination
  >
    <template #estructuraProgramatica="{ item }">
      <td>
        {{ item.estructuraProgramatica?.id }}
      </td>
    </template>

    <template #show_details="{ item }">
      <td class="py-1 d-flex gap-1">
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
  

        <CButton
          class="mt-1"
          color="danger"
          variant="outline"
          square
          size="sm"
          @click="cancelarGrupoNomina(item)"
        >
          Eliminar
        </CButton>
      </td>
    </template>
  </CSmartTable>

  <ModalGrupoNomina
    :showModal="showGrupoNomina"
    :grupoNomina="grupoNomina"
    @close-modal="closeGrupoNomina"
    @postGrupoNomina="guardarGrupoNomina"
    @editarGrupoNomina="editarGrupoNomina"
  />
</template>

<script>
import { CSmartTable } from '@coreui/vue-pro'
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
      grupoNominas: [],
      grupoNomina: {},
      columns: [
        { key: 'id', label: 'Código', _style: { width: '20%' } },
        {
          key: 'descripcion',
          label: 'Grupo Nómina',
          _style: { width: '45%' },
        },
        {
          key: 'estructuraProgramatica',
          label: 'Estructura Programática',
          _style: { width: '25%' },
        },
        {
          key: 'show_details',
          label: '',
          _style: { width: '10' },
          filter: false,
          sorter: false,
        },
      ],
      footerItem: [
        {
          label: 'Total Items',
          _props: {
            colspan: 5,
            style: 'font-weight:bold;',
          },
        },
      ],
      showGrupoNomina: false,
    }
  },

  methods: {
    ...mapActions(useToastStore, ['show']),

    closeGrupoNomina() {
      this.showGrupoNomina = false
    },

    guardarGrupoNomina(payload) {
      if (payload.id) {
        Api.putGrupoNomina(payload.id, payload)
          .then((response) => {
            this.showGrupoNomina = false
            setTimeout(this.getGrupoNomina, 500)
            this.showGrupoNomina = false
            this.show({
              content: response.data.message,
              closable: true,
            })
          })
          .catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      } else {
        Api.postGrupoNomina({
          ...payload,
          estructuraProgramaticaId: payload.estructuraProgramatica?.id,
        })
          .then(() => {
            setTimeout(this.getGrupoNomina, 500)
            this.showGrupoNomina = false
            this.show({
              content: 'Registro añadido correctamente',
              closable: true,
            })
          })
          .catch((error) => {
            this.show({
              content: error.response.data,
              closable: true,
              color: 'danger',
              class: 'text-white',
            })
          })
      }
    },

    close() {
      this.showGrupoNomina = false
    },

    editarGrupoNomina(item) {
      this.showGrupoNomina = true
      this.grupoNomina = item
    },

    getGrupoNomina() {
      Api.getGrupoNomina().then((response) => {
        this.grupoNominas = response.data.data
        this.footerItem[0].label = `Total Items: ${response.data.data.length}`
      })
    },

    cancelarGrupoNomina(item) {
      this.$swal({
        title: 'Estás seguro de realizar esta acción? ',
        text: 'No podrás revertirlo',
        icon: 'Confirmación',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Aceptar',
      }).then((result) => {
        if (result.isConfirmed) {
          Api.deleteGrupoNomina(item.id).then(() => {
            setTimeout(this.getGrupoNomina, 500)
            this.show({
              content: 'Registro cancelado correctamente',
              closable: true,
              time: 7_000,
            })
          })
        }
      })
    },
  },

  mounted() {
    this.getGrupoNomina()
  },
}
</script>
